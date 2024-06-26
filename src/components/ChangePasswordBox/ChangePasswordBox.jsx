import { Visibility, VisibilityOff, X } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check'
import useDebounce from '../../hooks/useDebounce'
import logo from '/src/assets/garbi-login.png'

const passwordStatusInitial = {
  atLeast8Characters: false,
  atLeastOneNumber: false,
  atLeastOneMayus: false,
  atLeastAnEspecialCharacter: false,
  areBothPasswordsEquals: false
}

const passwordValidationRegex = {
  uppercase: /(?=.*[A-Z])/,
  number: /(?=.*\d)/,
  specialChar: /(?=.*[!@#$%^&//*])/,
};

export const ChangePasswordBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(passwordStatusInitial);

  let passwordChecked = false;

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      password: "",
      passwordRepeated: "",
    },
  });


  const passwordWatched = watch("password");
  const passwordRepeatedWatched = watch("passwordRepeated");
  const passwordDebounced = useDebounce(passwordWatched, 500);
  const passwordRepeatedDebounced = useDebounce(passwordRepeatedWatched,500);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log(passwordDebounced)
    const newPasswordStatus = {
      atLeast8Characters: passwordDebounced.length >= 8,
      atLeastOneNumber: passwordValidationRegex.number.test(passwordDebounced),
      atLeastOneMayus: passwordValidationRegex.uppercase.test(passwordDebounced),
      atLeastAnEspecialCharacter: passwordValidationRegex.specialChar.test(passwordDebounced),
      areBothPasswordsEquals: false
    }

    setPasswordStatus(newPasswordStatus);
  }, [passwordDebounced])


  useEffect(() => {
    const oldStatus = passwordStatus;

    setPasswordStatus({...passwordStatus, areBothPasswordsEquals: passwordRepeatedDebounced === passwordDebounced})

  }, [passwordRepeatedDebounced])

  useEffect(() => {
    // Verificar si todos los valores son true
    const passwordStatusArray = Object.values(passwordStatus);

    passwordChecked = passwordStatusArray.every(status => status);
  
  }, [passwordStatus])


  const onSubmit = async (data) => {
    if (!passwordChecked) return;
  }

  return (
    <Paper sx={{
      backgroundColor: 'red',
      height: '32rem',
      width: '64rem',
      display: 'flex',
      borderRadius: '1rem'
    }}
      elevation={8}
    >
      <Box sx={{
        backgroundColor: 'white',
        height: '100%',
        flex: 1,
        width: '50%',
        borderTopLeftRadius: '1rem',
        borderBottomLeftRadius: '1rem',
      }}>
        <Box
          sx={{ width: '100%', height: '100%' }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          padding='0 2rem'
        >
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 400
            }}
          >Cambiá tu contraseña</Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#00000099'
            }}

          >Por razones de seguridad, te pedimos que cambies tu <br /> contraseña</Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#00000099',
              mt: '2rem'
            }}

          >La contraseña debe contener</Typography>
          <Box sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <ValidationItem isValid={passwordStatus.atLeast8Characters} text="Al menos 8 caracteres" />
            <ValidationItem isValid={passwordStatus.atLeastOneNumber} text="Al menos un número" />
            <ValidationItem isValid={passwordStatus.atLeastOneMayus} text="Al menos una mayúscula" />
            <ValidationItem isValid={passwordStatus.atLeastAnEspecialCharacter} text="Al menos un caracter especial" />
            <ValidationItem isValid={passwordStatus.areBothPasswordsEquals} text="Las contraseñas coinciden" />
          </Box>

        </Box>

      </Box>
      <Box sx={{
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
        position: 'relative'
      }}>
        <Box sx={{
          overflow: 'hidden',
          width: '150px',
          height: '100px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <img style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover'
          }} src={logo}></img>
        </Box>
        <Box>

          <form>
            <Box padding={1}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <FormControl sx={{ minHeight: '80px' }} fullWidth>
                    <InputLabel color='secondary' sx={{ color: 'white' }} htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-change-password"
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.password}
                      color='secondary'
                      inputProps={
                        {
                          sx: {
                            color: 'white'
                          }
                        }
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            color='secondary'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Contraseña"
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: 'white !important'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white'
                        },
                      }}
                    />
                    {errors.password && (
                      <Typography fontSize={'0.85rem'} paddingLeft={1.5} color={'red'}>{errors.password.message}</Typography>
                    )}
                  </FormControl>
                }
              />
              <Controller
                name="passwordRepeated"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <FormControl sx={{ minHeight: '80px' }} fullWidth>
                    <InputLabel color='secondary' sx={{ color: 'white' }} htmlFor="outlined-adornment-passwordRepeated">Repetir Contraseña</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-change-password-repeated"
                      {...field}
                      color="secondary"
                      type={showPassword ? 'text' : 'password'}
                      error={!!errors.passwordRepeated}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white'
                        },
                        '& .MuiInputLabel-root': {
                          color: 'white !important'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'white'
                        },
                      }}
                      inputProps={
                        {
                          sx: {
                            color: 'white'
                          }
                        }
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle passwordRepeated visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            color='secondary'
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Repetir Contraseña"
                    />
                    {errors.password && (
                      <Typography fontSize={'0.85rem'} paddingLeft={1.5} color={'red'}>{errors.password.message}</Typography>
                    )}
                  </FormControl>
                }
              />
              <Button
                color="secondary"
                sx={{
                  marginTop: 0.1,
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText',
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                  },
                }}
                fullWidth
                type='submit'
              >
                Guardar cambios
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Paper >
  )
}

const ValidationItem = ({ isValid, text }) => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      {isValid ? <CheckIcon sx={{ color: '#2E7D32' }} /> : <CloseIcon sx={{ color: '#D32F2F' }} />}
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 400,
          verticalAlign: 'center'
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};