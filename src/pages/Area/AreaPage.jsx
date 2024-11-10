import SaveIcon from '@mui/icons-material/Save';
import {
  Backdrop,
  Box, Button, CircularProgress, Divider, keyframes, Paper, Typography
} from '@mui/material';
import {
  APIProvider
} from '@vis.gl/react-google-maps';
import {
  AreaDrawingMap
} from '../../components/AreaDrawingMap';
import {
  BreadcrumbsComponent
} from '../../components/BreadcrumbsComponent';
import {
  useEffect,
  useReducer,
  useState
} from 'react';
import {
  InputForm
} from '../../components/InputForm/InputForm';
import {
  useForm
} from 'react-hook-form';
import reducer, {
  DrawingActionKind
} from '../../components/UndoRedoControl/reducer';
import {
  DrawingActionType,
  drawReducer
} from '../../reducers/drawReducer';
import {
  useAreaActionStatesProvider
} from '../../hooks/useAreaActionProvider';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  DeleteAreaForm
} from '../../forms/DeleteArea/DeleteAreaForm';
import {
  HEIGHT_HEADER
} from '../../config';
import {
  useAreas
} from '../../api/hooks/useAreas/useAreas';
import {
  FeedbackSnackbar
} from '../../components/FeedbackSnackbar';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export function polylineToCoordinates(polyline) {
  const path = polyline.getPath(); // Obtiene el array de puntos de la polilínea
  const coordinates = [];

  path.forEach((latLng) => {
    coordinates.push({
      lat: latLng.lat(),
      lng: latLng.lng(),
    });
  });

  return coordinates;
}

const mapper = (areas) => {

  return areas.map(
    a => {
      return {
        ...a,
        title: a.name,
        path: a.coordinates
      }
    }
  )
}

const areCoordinatesEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortCoordinates = (arr) => {
    return arr.map(({
      lat, lng
    }) => ({
      lat,
      lng
    }))
      .sort((a, b) => a.lat - b.lat || a.lng - b.lng);
  };

  const sortedArr1 = sortCoordinates(arr1);
  const sortedArr2 = sortCoordinates(arr2);

  // Comparar si cada objeto en el array ordenado es igual
  for (let i = 0; i < sortedArr1.length; i++) {
    if (
      sortedArr1[i].lat !== sortedArr2[i].lat ||
      sortedArr1[i].lng !== sortedArr2[i].lng
    ) {
      return false;
    }
  }

  return true;
};

const AreaPage = () => {
  const [areas, setAreas] = useState([]);
  const [textFeedback, setTextFeedback] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const {
    areaActionStates
  } = useAreaActionStatesProvider();
  const {
    enableAddArea,
    enableEditArea,
    isAddingArea,
    resetStates,
    disableEditArea
  } = areaActionStates
  const [isAddingNewArea, setIsAddingNewArea] = useState(false);
  const [areaSelected, setAreaSelected] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [openDeleteAreaForm, setOpenDeleteAreaForm] = useState(false);
  const [hasAreaSelectedAnyChange, setHasAreaSelectedAnyChange] = useState(false);
  const [candAddNewArea, setCanAddNewArea] = useState(false);
  // TODO RENOMBRAR ESTOS ESTADOS
  const [state, dispatch] = useReducer(reducer, []);
  const [stateDraw, dispatchDraw] = useReducer(drawReducer, {
    polyline: null,
    polygon: null
  });

  const apiKeyGoogleMaps = import.meta.env.VITE_REACT_APP_API_KEY_GOOGLE_MAPS;

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      name: '',
      description: ''
    },
  });

  const {
    getAreas: {
      getAreas,
      isLoadingGetAreas
    },
    postAreas: {
      postAreas,
      isLoadingPostAreas
    },
    putAreas: {
      putAreas,
      isLoadingPutAreas
    },
    deleteArea: {
      deleteArea,
      isLoadingDeleteArea
    }
  } = useAreas()

  const name = watch('name');
  const description = watch('description');

  const searchArea = (id) => state.find(area => area.id === id);

  useEffect(() => {
    if (!areaSelected) return;

    const area = searchArea(areaSelected.id)

    const coordinates = polylineToCoordinates(area.polyline)

    setHasAreaSelectedAnyChange(name !== areaSelected.title ||
      description !== areaSelected.description ||
      !areCoordinatesEqual(areaSelected.coordinates, coordinates)
    )

  }, [name, description, areaSelected, state]);

  useEffect(() => {

    setCanAddNewArea(name !== '' &&
      description !== '' &&
      stateDraw.polyline != null
    )

  }, [name, description, stateDraw]);


  useEffect(() => {
    const fetchAreas = async () => {
      const areasRetrieved = await getAreas()
      setAreas(mapper(areasRetrieved.result))
    }

    fetchAreas()
  }, [])

  useEffect(() => {
    console.log(areas)
  }, [areas])

  useEffect(() => {
    if (areaSelected) {
      enableEditArea()
      setValue('name', areaSelected.title);
      setValue('description', areaSelected.description);
      setAnimationKey(prevKey => prevKey + 1);
    } else {
      disableEditArea()
    }
    return () => {
      setValue('name', '')
      setValue('description', '')
    }
  }, [areaSelected, setValue]);

  const getColor = () => {
    if (selectedColor) {

      return selectedColor
    } else if (areaSelected?.color) {

      return areaSelected.color;
    } else {

      return 'fff'
    }
  }

  const saveArea = async (data) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const companyId = user.companyId;

    const color = getColor();

    if (isAddingArea) {
      // TODO: VALIDAR QUE NO SE PUEDA GUARDAR SIN HABER DIBUJADO
      const newPolyline = stateDraw.polyline
      const newPolygon = stateDraw.polygon

      const body = {
        name: data.name,
        description: data.description,
        companyId,
        color,
        coordinates: polylineToCoordinates(newPolyline)
      }

      const response = await postAreas(body);

      setTextFeedback('Área creada con éxito.')
      setOpenSnackbar(true);

      reset();

      dispatchDraw({
        type: DrawingActionType.CLEAR_DRAW
      })

      dispatch({
        type: DrawingActionKind.ADD_OVERLAY,
        payload: {
          id: response.area.id,
          title: data.name,
          description: data.description,
          polyline: newPolyline,
          color: selectedColor,
          polygon: newPolygon
        }
      })
      setCount(prev => prev + 1)

    } else {
      const areaEdited = searchArea(areaSelected.id)

      const body = {
        name: data.name,
        description: data.description,
        companyId,
        color,
        coordinates: polylineToCoordinates(areaEdited.polyline)
      }

      await putAreas(areaSelected.id, body);

      setTextFeedback('Área actualizada con éxito.')
      setOpenSnackbar(true);

      dispatch({
        type: DrawingActionKind.UPDATE_OVERLAY,
        payload: {
          id: areaSelected.id,
          title: data.name,
          description: data.description
        }
      })
      setAreaSelected(null)
    }
    resetStates()
  }

  const handleDeleteArea = async (e) => {
    e.preventDefault();
    setAreaSelected(null)
    setOpenDeleteAreaForm(false)

    await deleteArea(areaSelected.id)

    setTextFeedback('Área borrada con éxito.')
    setOpenSnackbar(true);

    dispatch({
      type: DrawingActionKind.DELETE_OVERLAY,
      payload: {
        id: areaSelected.id
      }
    })
  }

  if (isLoadingGetAreas) {
    return <Box>
      <Backdrop
        sx={(theme) => ({
          color: '#fff',
        })}
        open={isLoadingGetAreas}
      >
        <CircularProgress
          color='inherit'
        />
      </Backdrop>
    </Box>
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: `calc(100vh - ${HEIGHT_HEADER})`,
        flexDirection: 'column',
      }}
    >
      <FeedbackSnackbar
        severity={'success'}
        text={textFeedback}
        openSnackbar={openSnackbar}
        handleClose={() => setOpenSnackbar(false)}
      />
      <ModalCreateResource
        title={'Eliminar área'}
        open={openDeleteAreaForm}
        handleClose={() => setOpenDeleteAreaForm(false)}
        form={<DeleteAreaForm
          areaName={areaSelected?.title}
          handleClose={() => setOpenDeleteAreaForm(false)}
          onSubmit={handleDeleteArea}
        />}
      />

      <Box
        sx={{
          width: '100%',
          padding: '16px 32px',
        }}
      >
        <BreadcrumbsComponent
          prefix={'Gestión'}
          title={'Áreas'}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          padding: '30px 64px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            height: '3.75rem',
          }}
        >
          {(isAddingArea || areaSelected) && (
            <Box
              key={animationKey}
              component={'form'}
              onSubmit={handleSubmit(saveArea)}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                animation: (areaSelected || enableAddArea) ? `${slideIn} 0.5s forwards` : 'none',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  gap: 2,
                  pr: 2,
                }}
              >
                <Box
                  width={0.3}
                >
                  <InputForm
                    control={control}
                    label={'Nombre'}
                    name='name'
                  />
                </Box>
                <Box
                  flex={1}
                >
                  <InputForm
                    control={control}
                    label={'Breve descripción'}
                    name='description'
                  />
                </Box>
              </Box>
              <Button
                size='medium'
                type='submit'
                disabled={!(hasAreaSelectedAnyChange || candAddNewArea)}
                sx={{
                  backgroundColor: '#12422C',
                  color: 'white',
                  height: '40px',
                  padding: '16px',
                  borderRadius: '4px',
                  '&:hover': {
                    backgroundColor: '#12422C',
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#e0e0e0', // Fondo gris
                    color: '#000000',           // Texto negro
                  },
                }}
              >
                Guardar Área
                <SaveIcon
                  sx={{
                    marginLeft: '8px',
                    fontSize: '20px',
                  }}
                />
              </Button>
            </Box>)}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            position: 'relative'
          }}
        >
          <Box
            sx={{
              height: 1,
              width: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              backgroundColor: 'gray',
              zIndex: (isLoadingDeleteArea || isLoadingPostAreas || isLoadingPutAreas || isLoadingGetAreas) ? '1000' : '0',
              opacity: (isLoadingDeleteArea || isLoadingPostAreas || isLoadingPutAreas || isLoadingGetAreas) ? '0.75' : '0'
            }}
          >
            <CircularProgress />
          </Box>
          <APIProvider
            apiKey={apiKeyGoogleMaps}
          >
            <AreaDrawingMap
              areas={areas}
              setAreas={setAreas}
              areaActionStates={areaActionStates}
              areaSelected={areaSelected}
              setAreaSelected={setAreaSelected}
              setIsAddingNewArea={setIsAddingNewArea}
              setSelectedColor={setSelectedColor}
              setOpenDeleteAreaForm={setOpenDeleteAreaForm}
              selectedColor={selectedColor}
              state={state}
              dispatch={dispatch}
              stateDraw={stateDraw}
              dispatchDraw={dispatchDraw}
            />
          </APIProvider>
        </Box>
        <Box
          sx={{
            marginTop: '12px',
            width: '100%',
            height: '42px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Paper
            sx={{
              elevation: 8,
              padding: '9px 16px',
              width: 'fit-content',
              display: 'flex',
              gap: '32px',
            }}
          >
            {areas.map((area, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '8px', // Opcional para dar espacio entre elementos
                }}
              >
                <Box
                  sx={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: area.color,
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '24px' /* 150% */,
                  }}
                >
                  {area.name}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AreaPage;
