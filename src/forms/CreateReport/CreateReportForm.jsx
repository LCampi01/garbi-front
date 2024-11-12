import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import {
  Controller, useForm
} from 'react-hook-form';
import {
  InputForm
} from '../../components/InputForm';
import {
  MapWithContainers
} from '../../components/MapWithContainers';
import addImage from '/src/assets/mdi_image-plus-outline.svg';
import {
  yupResolver
} from '@hookform/resolvers/yup';
import {
  mixed, object, string
} from 'yup';
import {
  useEffect, useState
} from 'react';
import {
  useReports
} from '../../api/hooks/useReports/useReports';
import {
  useContainers
} from '../../api/hooks/useContainers/useContainers';
import {
  AdvancedMarker
} from '@vis.gl/react-google-maps';
import {
  formatContainers
} from '../../api/hooks/useReports/mappers';
import {
  FeedbackSnackbar
} from '../../components/FeedbackSnackbar'


const tipos = [
  {
    value: 'CONTENEDOR_ROTO',
    label: 'Contenedor en mal estado'
  },
  {
    value: 'CONTENEDOR_SUCIO',
    label: 'Contenedor sucio'
  },
  {
    value: 'BASURA_EN_LA_CALLE',
    label: 'Basura en la calle'
  },
  {
    value: 'CONTENEDOR_FALTANTE',
    label: 'Contenedor faltante'
  },
  {
    value: 'OTROS',
    label: 'Otro'
  },
];

const HtmlTooltip = styled(({
  className, ...props
}) => (
  <Tooltip
    {...props}
    classes={{
      popper: className,
    }}
  />
))(({
  theme
}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    padding: 0,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: 'transparent',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#fff',
  },
}));

export const CreateReportForm = ({
  onSuccess
}) => {
  const apiKeyGoogleMaps = 'AIzaSyChdsbPNc69MyOgPRQf8o2_5kMUFDx2zMM';
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState(null)
  const [snackbarText, setSnackbarText] = useState(null)

  const position = {
    lat: -34.5893,
    lng: -58.3974,
  };

  const [containers, setContainers] = useState([]);
  const [containerSelected, setContainerSeleted] = useState(null);
  const [containerError, setContainerError] = useState(false);

  const {
    createReport: {
      createReport, isCreateReportLoading
    }
  } = useReports();
  const {
    getAllContainers: {
      getAllContainers
    }
  } = useContainers();

  useEffect(() => {
    const retrieveContainers = async () => {
      const containersUnformated = await getAllContainers();
      const containersFormated = formatContainers(containersUnformated.result);

      setContainers(containersFormated);
    };

    try {
      retrieveContainers();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleContainerClick = (container) => {
    setValue('address', container.address.street + ' ' + container.address.number || '');
    setValue('neighborhood', container.address.neighborhood || '');
    setValue('containerId', container.id);
    setContainerSeleted(container);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    setSelectedImage(base64);
  };

  const createReportSchema = object({
    title: string().required('El título es un campo obligatorio'),
    type: string().required('Debe seleccionar una opción'),
    email: string().email('Debe ser un email válido')
      .required('El email es un campo obligatorio'),
    image: mixed(),
  }).required();

  const {
    control, handleSubmit, setValue, formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      containerId: '',
      title: '',
      description: '',
      address: '',
      email: '',
      type: '',
      image: '',
    },
    resolver: yupResolver(createReportSchema),
  });

  const onSubmit = async (data) => {
    if (!containerSelected) {
      setContainerError(true);
      return;
    }
    setContainerError(false);

    const report = {
      containerId: data.containerId,
      title: data.title,
      address: data.address + ', ' + data.neighborhood,
      email: data.email,
      type: data.type,
      phone: '',
    }
  
    if (data.description) {
      report.description = data.description
    }

    if(selectedImage) {
      report.image = selectedImage
    }

    try {
      await createReport(report)
      setSnackbarSeverity('success')
      setSnackbarText('Reporte creado. En breve recibirá novedades.')
      setOpenSnackbar(true)
    } catch (error) {
      setSnackbarSeverity('error')
      setSnackbarText('Ocurrió un problema al crear el reporte. Intentelo más tarde.')
      setOpenSnackbar(true)
      console.error('Error creating report:', error)
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false)


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FeedbackSnackbar
        severity={snackbarSeverity}
        text={snackbarText}
        openSnackbar={openSnackbar}
        handleClose={handleCloseSnackbar}
      />
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '26.56px',
          mt: '16px',
          mb: '24px',
          color: 'black',
        }}
      >
        Ingrese los siguientes datos para realizar el reporte
      </Typography>


      <Grid
        container
        spacing={2.5}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <InputForm
            name='title'
            control={control}
            errors={errors}
            label={'Título del reporte *'}
            variant='filled'
            size='medium'
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Controller
            name='type'
            control={control}
            rules={{
              required: true
            }}
            render={({
              field
            }) => (
              <FormControl
                variant={'filled'}
                size={'medium'}
                fullWidth
              >
                <InputLabel
                  id={'type' + '-label'}
                >Tipo de problema *</InputLabel>
                <Select
                  size={'medium'}
                  fullWidth
                  variant={'filled'}
                  label={'Tipo de problema *'}
                  {...field}
                >
                  {tipos.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors['type'] && (
                  <Typography
                    fontSize={'0.85rem'}
                    paddingLeft={1.5}
                    color={'red'}
                  >
                    {errors['type'].message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <InputForm
            name='description'
            control={control}
            errors={errors}
            label={'Descripción'}
            variant='filled'
            size='medium'
          />
        </Grid>
        <Grid
          item
          margin={'auto'}
          xs={8}
          md = {12}
        >
          <Controller
            name='image'
            control={control}
            defaultValue=''
            render={({
              field
            }) => (
              <FormControl
                fullWidth
              >
                <Input
                  id='image-input'
                  type='file'
                  disableUnderline
                  onChange={(e) => {
                    handleFileRead(e);
                    field.onChange(e);
                    const file = e.target.files[0];
                    setSelectedFile(file);
                  }}
                  sx={{
                    display: 'none'
                  }}
                  inputProps={{
                    accept: 'image/*',
                    hidden: true,
                  }}
                />
                <label
                  htmlFor='image-input'
                >
                  <Box
                    sx={{
                      height: '150px',
                      width: '100%',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '16px',
                      flexDirection: 'column',
                      border: '1px solid black',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={selectedImage ? selectedImage : addImage}
                      alt='Selected'
                      style={{
                        height: '100px',
                        width: 'auto'
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#00000099',
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px',
                      }}
                    >
                      Añada una foto del problema
                    </Typography>
                  </Box>
                </label>
              </FormControl>
            )}
          />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              mt: '24px',
              mb: '8px',
              color: 'black',
            }}
          >
            Seleccione el contenedor afectado en el mapa
          </Typography>
          <Box
            sx = {{
              width: 1,
              height: {
                xs: '300px',
                md: '400px' 
              },
            }}
          >
            <MapWithContainers
              apiKey={apiKeyGoogleMaps}
              zoom={16}
              centerPosition={position}
              containers={containers.map((p) => (
                <Marker
                  setContainerSeleted={handleContainerClick}
                  key={p._id}
                  point={p}
                />
              ))}
            />
          </Box>
          {containerError && (
            <Typography
              sx={{
                fontSize: '0.85rem',
                color: 'red',
                mt: 1,
              }}
            >
              Debe seleccionar un contenedor en el mapa.
            </Typography>
          )}
        </Grid>

        <Grid
          item
          md={6}
          xs={12}
        >
          <InputForm
            name='address'
            control={control}
            errors={errors}
            label={'Dirección aproximada del contenedor'}
            variant='filled'
            size='medium'
            disabled='true'
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <InputForm
            name='neighborhood'
            control={control}
            errors={errors}
            label={'Barrio'}
            variant='filled'
            size='medium'
            disabled='true'
          />
        </Grid>
        <Grid
          item
          xs={12}
          mb='16px'
        >
          <InputForm
            name='containerId'
            control={control}
            errors={errors}
            label={'Identificador del contenedor (6 dígitos)'}
            variant='filled'
            size='medium'
            disabled='true'
          />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <InputForm
            name='email'
            control={control}
            errors={errors}
            label={'Email *'}
            variant='filled'
            helperText={'Ingrese su correo electrónico para recibir novedades del reporte'}
            size='medium'
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Box
            sx={{
              width: 1,
              display: 'flex',
              justifyContent: 'center',
              mb: '24px'
            }}
          >
            <Button
              disabled={isCreateReportLoading}
              sx={{
                backgroundColor: '#12422C',
                color: 'white',
                paddingLeft: '85px',
                paddingRight: '85px',
                '&:hover': {
                  backgroundColor: '#0a2e1f', // Color verde oscuro al hacer hover
                },
              }}
              type='submit'
            >
              {isCreateReportLoading ? (
                <CircularProgress
                  size={24}
                  sx={{ 
                    color: 'white' 
                  }}
                />
              ) : (
                'ENVIAR'
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

function Marker({
  point, setContainerSeleted
}) {
  return (
    <AdvancedMarker
      position={point}
      onClick={() => setContainerSeleted(point)}
    >
      <HtmlTooltip
        placement='top'
        arrow
        title={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: '4px',
              padding: '8px'
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                color: 'black',
              }}
            >
              {point.address.street + ' ' + point.address.number}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 400,
                color: '#9e9e9e',
              }}
            >
              Contenedor #{point.id}
            </Typography>
          </Box>
        }
      >
        <div>
          <CircleIcon
            sx={{
              color: '#12422c'
            }}
          />
        </div>
      </HtmlTooltip>
    </AdvancedMarker>
  );
}

