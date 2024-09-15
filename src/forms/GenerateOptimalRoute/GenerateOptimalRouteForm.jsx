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
  object, string, number
} from 'yup';

export const GenerateOptimalRouteForm = ({
  handleClose,
  handleOpenRightSideOptimalRouteInfo,
  onGenerateOptimalRoute,
  areas
}) => {

  const createOptimalRouteSchema = object({
    areaId: string().required('Debe seleccionar una opción'),
    percentage: number()
      .min(0, 'El valor debe ser al menos 0')
      .max(100, 'El valor debe ser como máximo 100')
      .transform((value) => (isNaN(value) || value === '' ? undefined : value))
      .required('El valor debe ser un número entre 0 y 100'),
  }).required();

  const {
    control, handleSubmit, formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      areaId: '',
      percentage: '50',
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
                variant='filled'
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
                  variant='filled'
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
                {errors.area && (
                  <Typography
                    fontSize='0.85rem'
                    paddingLeft={1.5}
                    color='red'
                  >
                    {errors.area.message}
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
              variant='filled'
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
