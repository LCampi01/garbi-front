import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { API } from '../../utils/apiHelper'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import logo from '/src/assets/garbi-login.png'

const userLoginSchema = object({
    // email: string().email().required(),
    // password: string().max(16).required()
}).required();

export const LoginBox = ({setIsFlipped}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(userLoginSchema)
    });

    const onSubmit = async (data) => {
        // const response = await API.login(data.email, data.password);
        // localStorage.setItem('token', response.data.token);
        setIsFlipped(true);
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
                backgroundColor: 'green',
                height: '100%',
                flex: 1,
                width: '50%',
                borderTopLeftRadius: '1rem',
                borderBottomLeftRadius: '1rem'
            }}>
                <img src={logo} style={{
                    borderTopLeftRadius: '1rem',
                    borderBottomLeftRadius: '1rem'

                }}></img>
            </Box>
            <Box sx={{
                width: '50%',
                background: 'white',
                height: '100%',
                flex: 1,
                borderTopRightRadius: '1rem',
                borderBottomRightRadius: '1rem',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography
                            sx={{
                                fontFamily: 'Roboto',
                                fontSize: '1.5rem',
                                fontWeight: 400,
                                textAlign: 'center',
                                lineHeight: '4rem'
                            }}
                        >Inicia sesión</Typography>
                        <Box padding={1}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <FormControl fullWidth sx={{ minHeight: '80px' }}>
                                        <TextField
                                            fullWidth label="Email"
                                            {...field}
                                        />
                                        {errors.email && (
                                            <Typography fontSize={'0.85rem'} paddingLeft={1.5} color={'red'}>{errors.email.message}</Typography>
                                        )}
                                    </FormControl>

                                )
                                }
                            />
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) =>
                                    <FormControl sx={{ minHeight: '80px' }} fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            error={!!errors.password}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Contraseña"
                                        />
                                        {errors.password && (
                                            <Typography fontSize={'0.85rem'} paddingLeft={1.5} color={'red'}>{errors.password.message}</Typography>
                                        )}
                                    </FormControl>
                                }
                            />
                            <Button sx={{
                                backgroundColor: '#12422C',
                                color: 'white',
                                marginTop: 0.1
                            }} fullWidth type='submit'  >
                                INGRESAR
                            </Button>
                            <Typography sx={{
                                textDecoration: 'underline',
                                color: '#2196F3',
                                fontSize: '.875rem',
                                marginTop: '1rem'
                            }}>
                                ¿Olvidaste tu contraseña?
                            </Typography>
                        </Box>
                    </form>
                </Box>

            </Box>
        </Paper>
    )
}
