import {
  Visibility, VisibilityOff 
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material';
import {
  useEffect, useState 
} from 'react';
import {
  Controller, useForm 
} from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import useDebounce from '../../hooks/useDebounce';
import logo from '/src/assets/garbi-login.png';
import {
  ModalTermsAndConditions
} from '../../modales/ModalTermsAndConditions';
import {
  useNavigate 
} from 'react-router-dom';
import {
  useAuth 
} from '../../api/hooks/useAuth/useAuth';
import {
  useEmployees 
} from '../../api/hooks/useEmployees/useEmployees';

const passwordStatusInitial = {
  atLeast8Characters: false,
  atLeastOneNumber: false,
  atLeastOneMayus: false,
  atLeastAnEspecialCharacter: false,
  areBothPasswordsEquals: false,
};

const passwordValidationRegex = {
  uppercase: /(?=.*[A-Z])/,
  number: /(?=.*\d)/,
  specialChar: /(?=.*[.,!@#$%^&//*])/,
};

const termsAndConditionsText = `1. Introducción: Al utilizar nuestra aplicación y aceptar estos términos y condiciones, usted consiente que almacenemos y procesemos los siguientes datos personales:
- Identificación Personal: Nombre, Apellido, Correo electrónico personal, Teléfono personal.
- Información Laboral: Turno de trabajo, Correo electrónico de la empresa, Teléfono de la empresa.

2. Seguridad de la Información: Nos comprometemos a proteger su información personal. Las contraseñas que usted utilice serán almacenadas utilizando un algoritmo de encriptación robusto y deben cumplir con los siguientes requisitos mínimos de seguridad: al menos ocho caracteres, incluyendo una mayúscula y un carácter especial.

3. Uso de la Información: La información recopilada se utilizará exclusivamente para gestionar su acceso al sistema y personalizar su experiencia dentro de la aplicación.

4. Consentimiento: Al aceptar estos términos y condiciones, usted autoriza que la información mencionada anteriormente sea almacenada y procesada conforme a nuestra política de privacidad.

5. Modificación de Términos: Nos reservamos el derecho de actualizar estos términos y condiciones en cualquier momento. Le notificaremos de cualquier cambio significativo para que pueda revisar y aceptar las modificaciones.`;


export const ChangePasswordBox = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(passwordStatusInitial);
  const [passwordChecked, setPasswordChecked] = useState(false);

  const [openTermsModal, setOpenTermsModal] = useState(false);
  const handleOpenTermsModal = () => setOpenTermsModal(true);
  const handleCloseTermsModal = () => setOpenTermsModal(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const {
    changePassword: {
      changePassword: changePassword, isChangePasswordLoading 
    },
  } = useAuth();
  const {
    modifyEmployee: {
      modifyEmployee: modifyEmployee, isModifyEmployeeLoading 
    },
  } = useEmployees();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: {
      errors 
    },
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      passwordRepeated: '',
      oldPassword: '',
      termsAndConditions: false
    },
  });

  const passwordWatched = watch('password');
  const passwordRepeatedWatched = watch('passwordRepeated');
  const passwordDebounced = useDebounce(passwordWatched, 500);
  const passwordRepeatedDebounced = useDebounce(passwordRepeatedWatched, 500);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const newPasswordStatus = {
      atLeast8Characters: passwordDebounced.length >= 8,
      atLeastOneNumber: passwordValidationRegex.number.test(passwordDebounced),
      atLeastOneMayus: passwordValidationRegex.uppercase.test(passwordDebounced),
      atLeastAnEspecialCharacter: passwordValidationRegex.specialChar.test(passwordDebounced),
      areBothPasswordsEquals: false,
    };

    setPasswordStatus(newPasswordStatus);
  }, [passwordDebounced]);

  useEffect(() => {
    setPasswordStatus({
      ...passwordStatus,
      areBothPasswordsEquals: passwordRepeatedDebounced === passwordDebounced,
    });
  }, [passwordRepeatedDebounced]);

  useEffect(() => {
    // Verifica si todos los valores son true
    const allValid = Object.values(passwordStatus).every((status) => status);
    setPasswordChecked(allValid);
  }, [passwordStatus]);

  const onSubmit = async (data) => {
    if (!passwordChecked || !checkboxChecked) return;

    console.log(data);

    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = await JSON.parse(userString);

    const response = await changePassword({
      email: user.personalEmail,
      newPassword: passwordDebounced,
      password: data.oldPassword,
    });

    const termsResponse = await modifyEmployee({
      userId: user.id,
      termsAndConditions: checkboxChecked
    });

    //TODO later: validar que la respuesta sea la esperada, y sino tirar error.
    navigate('/home');
  };


  return (
    <Box>
      <ModalTermsAndConditions
        title={'Términos y Condiciones'}
        description={termsAndConditionsText}
        open={openTermsModal}
        handleClose={handleCloseTermsModal}
        setCheckboxChecked={setCheckboxChecked}
      />
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
            backgroundColor: 'white',
            height: '100%',
            flex: 1,
            width: '50%',
            borderTopLeftRadius: '1rem',
            borderBottomLeftRadius: '1rem',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            padding='0 2rem'
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 400,
              }}
            >
              Cambiá tu contraseña
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#00000099',
              }}
            >
              Por razones de seguridad, te pedimos que cambies tu <br /> contraseña
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#00000099',
                mt: '2rem',
              }}
            >
              La contraseña debe contener
            </Typography>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <ValidationItem
                isValid={passwordStatus.atLeast8Characters}
                text='Al menos 8 caracteres'
              />
              <ValidationItem
                isValid={passwordStatus.atLeastOneNumber}
                text='Al menos un número'
              />
              <ValidationItem
                isValid={passwordStatus.atLeastOneMayus}
                text='Al menos una mayúscula'
              />
              <ValidationItem
                isValid={passwordStatus.atLeastAnEspecialCharacter}
                text='Al menos un caracter especial'
              />
              <ValidationItem
                isValid={passwordStatus.areBothPasswordsEquals}
                text='Las contraseñas coinciden'
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: '50%',
            background: '#12422C',
            height: '100%',
            flex: 1,
            borderTopRightRadius: '1rem',
            borderBottomRightRadius: '1rem',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              width: '150px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
              }}
              src={logo}
            />
          </Box>
          <Box>
            <form
              onSubmit={handleSubmit(onSubmit)}
            >
              <Box
                padding={1}
              >
                <Controller
                  name='oldPassword'
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
                        color='secondary'
                        sx={{
                          color: 'white',
                        }}
                        htmlFor='outlined-adornment-oldPassword'
                      >
                        Anterior contraseña
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-change-oldPassword'
                        {...field}
                        type={showOldPassword ? 'text' : 'oldPassword'}
                        error={!!errors.password}
                        color='secondary'
                        inputProps={{
                          sx: {
                            color: 'white',
                          },
                        }}
                        endAdornment={
                          <InputAdornment
                            position='end'
                          >
                            <IconButton
                              aria-label='toggle oldPassword visibility'
                              onClick={() => setShowOldPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              color='secondary'
                            >
                              {showOldPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Anterior Contraseña'
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'white !important',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                        }}
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
                        color='secondary'
                        sx={{
                          color: 'white',
                        }}
                        htmlFor='outlined-adornment-password'
                      >
                        Nueva contraseña
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-change-password'
                        {...field}
                        type={showNewPassword ? 'text' : 'password'}
                        error={!!errors.password}
                        color='secondary'
                        inputProps={{
                          sx: {
                            color: 'white',
                          },
                        }}
                        endAdornment={
                          <InputAdornment
                            position='end'
                          >
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={() => setShowNewPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                              color='secondary'
                            >
                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Nueva Contraseña'
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'white !important',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                        }}
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
                <Controller
                  name='passwordRepeated'
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
                        color='secondary'
                        sx={{
                          color: 'white',
                        }}
                        htmlFor='outlined-adornment-passwordRepeated'
                      >
                        Repetir nueva contraseña
                      </InputLabel>
                      <OutlinedInput
                        id='outlined-adornment-change-password-repeated'
                        {...field}
                        color='secondary'
                        type={showRepeatedPassword ? 'text' : 'password'}
                        error={!!errors.passwordRepeated}
                        sx={{
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                          '& .MuiInputLabel-root': {
                            color: 'white !important',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                          },
                        }}
                        inputProps={{
                          sx: {
                            color: 'white',
                          },
                        }}
                        endAdornment={
                          <InputAdornment
                            position='end'
                          >
                            <IconButton
                              aria-label='toggle passwordRepeated visibility'
                              onClick={() => setShowRepeatedPassword((show) => !show)}
                              onMouseDown={handleMouseDownPassword}
                              color='secondary'
                              edge='end'
                            >
                              {showRepeatedPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Repetir nueva contraseña'
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
                
                <Controller
                  name='termsAndConditions'
                  control={control}
                  render={({
                    field 
                  }) => (
                    <FormControl
                      fullWidth
                      sx={{
                        minHeight: '80px',
                      }}
                    >
                      <Box
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                        }}
                      >
                        <FormControlLabel 
                          control={
                            <Checkbox 
                              {...field}
                              checked={checkboxChecked}
                              sx={{
                                paddingRight: '0px',
                                color: '#ffffff',
                                '&.Mui-checked': {
                                  color: '#ffffff',
                                },
                              }}
                              onChange={(e) => {
                                field.onChange(e);
                                setCheckboxChecked(e.target.checked);
                              }}
                            />
                          } 
                        />
                        <Typography
                          sx={{
                            color: '#ffffff',
                          }}
                        >
                          He leído y acepto{' '}
                          <span
                            onClick={(e) => {
                              handleOpenTermsModal();
                            }}
                            style={{
                              color: '#ffffff',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                          >
                            Términos y Condiciones
                          </span>
                        </Typography>
                      </Box>
                    </FormControl>
                  )}
                />
                <Button
                  color='secondary'
                  sx={{
                    marginTop: 0.1,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.secondary.contrastText,
                    '&:hover': {
                      backgroundColor: (theme) => theme.palette.secondary.dark,
                    },
                    '&:disabled': {
                      backgroundColor: (theme) => theme.palette.grey[500], // Color gris
                      color: (theme) => theme.palette.grey[900], // Color de texto gris más oscuro
                    },
                  }}
                  disabled={!passwordChecked || !checkboxChecked}
                  fullWidth
                  type='submit'
                >
                  {isChangePasswordLoading ? (
                    <CircularProgress
                      size={24}
                      color='inherit'
                    />
                  ) : (
                    'Guardar cambios'
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const ValidationItem = ({
  isValid, text 
}) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
    >
      {isValid ? (
        <CheckIcon
          sx={{
            color: '#2E7D32',
          }}
        />
      ) : (
        <CloseIcon
          sx={{
            color: '#D32F2F',
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 400,
          verticalAlign: 'center',
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
