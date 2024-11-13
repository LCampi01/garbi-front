import {
  Box, Typography, CircularProgress, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import {
  Controller, useForm
} from 'react-hook-form';
import {
  CancelAndSubmitButton
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';
import {
  yupResolver
} from '@hookform/resolvers/yup';
import {
  object, string, array
} from 'yup';
import {
  useState
} from 'react';


export const GenerateOptimalRouteForm = ({
  handleClose,
  handleOpenRightSideOptimalRouteInfo,
  onGenerateOptimalRoute,
  areas,
  collectors
}) => {
  const [selectedCollectors, setSelectedCollectors] = useState([]);

  const handleChange = (event) => {
    setSelectedCollectors(event.target.value)
  }

  const createOptimalRouteSchema = object({
    areaId: string().required('Debe seleccionar una opción'),
    collectors: array()
      .min(2, 'Debe seleccionar al menos dos recolectores')
      .required('Debe seleccionar dos recolectores'),
  }).required();

  const {
    control, handleSubmit, formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      areaId: '',
      collectors: [],
    },
    resolver: yupResolver(createOptimalRouteSchema),
  });
  const isLoading = false

  return (
    <form
      onSubmit={handleSubmit(onGenerateOptimalRoute)}
    >
      <Box
        sx={{
          width: 1,
          padding: '1rem 1.5rem 1.3125rem'
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.66rem',
            letterSpacing: '0.025rem'
          }}
        >
          Seleccione área:
        </Typography>
        <Box
          sx={{
            width: 1,
            mt: '8px'
          }}
        >
          <Controller
            name='areaId'
            control={control}
            render={({
              field
            }) => (
              <FormControl
                variant='outlined'
                size='medium'
                fullWidth
              >
                <InputLabel
                  id='area'
                >
                  Área
                </InputLabel>
                <Select
                  size='medium'
                  fullWidth
                  variant='outlined'
                  label='Área'
                  {...field}
                >
                  {areas.map((area) => (
                    <MenuItem
                      key={area.id}
                      value={area.id}
                    >
                      {area.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.areaId && (
                  <Typography
                    fontSize='0.85rem'
                    paddingLeft={1.5}
                    color='red'
                  >
                    {errors.areaId.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: 1,
          padding: '1rem 1.5rem 1.3125rem'
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.66rem',
            letterSpacing: '0.025rem'
          }}
        >
          Seleccione recolectores:
        </Typography>
        <Box
          sx={{
            width: 1,
            mt: '8px'
          }}
        >
          <Controller
            name='collectors'
            control={control}
            render={({
              field
            }) => (
              <FormControl
                variant='outlined'
                size='medium'
                fullWidth
              >
                <InputLabel
                  id='collectors'
                >
                  Recolectores
                </InputLabel>
                <Select
                  size='medium'
                  fullWidth
                  variant='outlined'
                  label='Recolectores'
                  multiple
                  value={selectedCollectors}
                  onChange={handleChange}
                  {...field}
                >
                  {collectors.map((c) => (
                    <MenuItem
                      key={c.id}
                      value={c.id}
                    >
                      {c.name} {c.surname}
                    </MenuItem>
                  ))}
                </Select>
                {errors.collectors && (
                  <Typography
                    fontSize='0.85rem'
                    paddingLeft={1.5}
                    color='red'
                  >
                    {errors.collectors.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Box>
      </Box>
      {/* <Box
        sx={{
          width: '100%',
          padding: '1rem 1.5rem 0rem'
        }}
      >
        <Typography
          component='div'
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.66rem',
            letterSpacing: '0.025rem'
          }}
        >
          Generar ruta que solo pase por contenedores que igualen o superen el
          <Box
            sx={{
              width: '75px',
              display: 'inline-block',
              verticalAlign: 'middle',
              m: '0 12px'
            }}
          >
            <OutlinedInputForm
              name='percentage'
              control={control}
              errors={errors}
              label={''}
              variant='outlined'
              size='medium'
              endMessage={'%'}
            />
          </Box>
          de su capacidad
        </Typography>
      </Box> */}
      <CancelAndSubmitButton
        handleClose={handleClose}
        typeButton='submit'
        buttonSubmitMessage={'GENERAR'}
        loadingBehaviour={isLoading ? (
          <CircularProgress
            size={24}
            color='inherit'
          />
        ) : (
          'GENERAR'
        )}
      />
    </form>
  );
}
