import {
  yupResolver
} from '@hookform/resolvers/yup';
import {
  Visibility, VisibilityOff
} from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  useEffect,
  useState
} from 'react';
import {
  Controller, useForm
} from 'react-hook-form';
import {
  object, string
} from 'yup';

import logo from '/src/assets/garbi-login.png';
import {
  useNavigate
} from 'react-router-dom';
import {
  jwtDecode
} from 'jwt-decode';
import {
  useAuth
} from '../../api/hooks/useAuth/useAuth';
import {
  messaging
} from '../../firebase/firebaseConfig';
import {
  getToken
} from 'firebase/messaging';

const userLoginSchema = object({
  personalEmail: string().email()
    .required(),
  password: string().max(16)
    .required(),
}).required();

const VITE_APP_VAPID_KEY = 'BNQxGHhRSxiYWTWhDMJrhuHzVioqhgJP666pjfa_q-GPiH8iKM3XKf7QDZ6rdp1VLQVXJq2DW_GfDymV6R8aM10'

export const LoginBox = ({
  setIsFlipped
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginScreenLoading, setIsLoginScreenLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const {
    login: {
      login: login,
      isLoginLoading
    },
  } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm({
    defaultValues: {
      personalEmail: 'lucas.ezequiel001@gmail.com',
      password: '1234',
    },
    resolver: yupResolver(userLoginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitLoading(true);
  
    try {
      // Solicitar permiso para enviar notificaciones
      const permission = await Notification.requestPermission();
  
      if (permission !== 'granted') {
        // Si el permiso no es concedido, maneja este caso y detén el proceso
        console.warn('Permisos de notificación no concedidos');
        setIsSubmitLoading(false);
        return;
      }
  
      // Registrar el Service Worker para Firebase
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  
      // Asegurarse de que el Service Worker esté listo
      await navigator.serviceWorker.ready;
  
      // Obtener el token de Firebase usando el Service Worker registrado
      const token = await getToken(messaging, {
        serviceWorkerRegistration: registration,
        vapidKey: VITE_APP_VAPID_KEY,
      });
  
      if (!token) {
        // Manejar el caso en que no se pueda obtener el token
        console.error('No se pudo obtener el token de Firebase');
        setIsSubmitLoading(false);
        return;
      }
  
      // Realizar el login con el email, password y el token de Firebase
      const response = await login({
        personalEmail: data.personalEmail,
        password: data.password,
        token,
      });
  
      // Guardar el token y la información del usuario en localStorage
      localStorage.setItem('token', response.token);
      const user = jwtDecode(response.token);
      localStorage.setItem('user', JSON.stringify(user));
  
      setIsSubmitLoading(false);
  
      // Verificar condiciones después del login
      if (!response.termsAndConditions) {
        setIsFlipped(true);
      } else {
        navigate('/inicio');
      }
    } catch (error) {
      // Manejo de errores generales
      console.error('Error en onSubmit:', error);
      setIsSubmitLoading(false);
    }
  };
  


  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        navigate('/inicio');
      }
    }

    setIsLoginScreenLoading(false);
  }, [])

  if (isLoginScreenLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper
      sx={{
        backgroundColor: 'red',
        height: '32rem',
        width: '64rem',
        display: 'flex',
        borderRadius: '1rem',
      }}
      elevation={8}
    >
      <Box
        sx={{
          backgroundColor: 'green',
          height: '100%',
          flex: 1,
          width: '50%',
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
        }}
      >
        <img
          src={logo}
          style={{
            borderTopLeftRadius: '1rem',
            borderBottomLeftRadius: '1rem',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '50%',
          background: 'white',
          height: '100%',
          flex: 1,
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '1.5rem',
                fontWeight: 400,
                textAlign: 'center',
                lineHeight: '4rem',
              }}
            >
              Inicia sesión
            </Typography>
            <Box
              padding={1}
            >
              <Controller
                name='personalEmail'
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field
                }) => (
                  <FormControl
                    fullWidth
                    sx={{
                      minHeight: '80px',
                    }}
                  >
                    <TextField
                      fullWidth
                      label='Email'
                      {...field}
                    />
                    {errors.personalEmail && (
                      <Typography
                        fontSize={'0.85rem'}
                        paddingLeft={1.5}
                        color={'red'}
                      >
                        {errors.personalEmail.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                name='password'
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field
                }) => (
                  <FormControl
                    sx={{
                      minHeight: '80px',
                    }}
                    fullWidth
                  >
                    <InputLabel
                      htmlFor='outlined-adornment-password'
                    >Contraseña</InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      endAdornment={
                        <InputAdornment
                          position='end'
                        >
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Contraseña'
                    />
                    {errors.password && (
                      <Typography
                        fontSize={'0.85rem'}
                        paddingLeft={1.5}
                        color={'red'}
                      >
                        {errors.password.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
              <Button
                sx={{
                  backgroundColor: '#12422C',
                  color: 'white',
                  marginTop: 0.1,
                  '&:hover': {
                    backgroundColor: '#0a2e1f', // Color verde oscuro al hacer hover
                  },
                  '&.Mui-disabled': {
                    backgroundColor: '#12422C', // Mantener el mismo fondo
                    color: 'gray', // Cambiar el color del texto a gris cuando está deshabilitado
                  },
                }}
                fullWidth
                type='submit'
                disabled={isLoginLoading}
              >
                {isLoginLoading || isSubmitLoading ? <CircularProgress
                  size={24}
                  color='inherit'
                /> : 'INGRESAR'}

              </Button>
              <Typography
                sx={{
                  textDecoration: 'underline',
                  color: '#2196F3',
                  fontSize: '.875rem',
                  marginTop: '1rem',
                }}
              >
                ¿Olvidaste tu contraseña?
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Paper>
  );
}
