import {
  Box,
  Button,
  Divider,
  FormControl, TextField,
  Typography
} from '@mui/material';
import {
  Controller, useForm
} from 'react-hook-form';
import {
  AreaDrawingMap 
} from '../../components/AreaDrawingMap';
import './CreateAreaPage.css';
import {
  APIProvider 
} from '@vis.gl/react-google-maps';
import {
  BreadcrumbsComponent 
} from '../../components/BreadcrumbsComponent';



const CreateAreaPage = () => {

  const apiKeyGoogleMaps = 'AIzaSyChdsbPNc69MyOgPRQf8o2_5kMUFDx2zMM';
  
  const {
    control,
    formState: {
      errors
    },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '16px 32px',
        }}
      >
        <BreadcrumbsComponent
          prefix={'Gestión'}
          title={'Áreas'}
          subtitle={'Nueva área'}
          titleLink={'/areas'}
        />
      </Box>
      <Divider />
      <Box
        sx={{
          flexGrow: 1,
          padding: '24px 64px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
          }}
        >
          <Typography
            sx={{
              color: '#000',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '166%',
              letterSpacing: '0.4px',
            }}
          >
            Complete los siguientes campos y luego indique el área en el mapa
          </Typography>
          <Button
            sx={{
              backgroundColor: '#12422C',
              color: 'white',
              height: '2.5rem',
              '&:hover': {
                backgroundColor: '#0a2e1f', // Color verde oscuro al hacer hover
              },
            }}
            type='submit'
          >
            GUARDAR
          </Button>
        </Box>
        <Box>
          <Controller
            name='name'
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field
            }) => (
              <FormControl>
                <TextField
                  size='medium'
                  label='Nombre del área'
                  {...field}
                />
                {errors.name && (
                  <Typography
                    fontSize={'0.85rem'}
                    paddingLeft={1.5}
                    color={'red'}
                  >
                    {errors.name.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Box>
        <Box
          sx={{
            height: '24px',
          }}
        />
        <Controller
          name='description'
          control={control}
          rules={{
            required: true,
          }}
          render={({
            field
          }) => (
            <FormControl
              fullWidth
            >
              <TextField
                fullWidth
                multiline
                label='Descripción del área'
                {...field}
                minRows={4}
                rows={4}
              />
              {errors.description && (
                <Typography
                  fontSize={'0.85rem'}
                  paddingLeft={1.5}
                  color={'red'}
                >
                  {errors.description.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
        <Box
          sx={{
            height: '32px',
          }}
        />
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%'
            }}
          >
            <APIProvider
              apiKey={apiKeyGoogleMaps}
            >
              <AreaDrawingMap />
            </APIProvider>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAreaPage;
