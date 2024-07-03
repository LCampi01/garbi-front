import { Box, Button, Divider, FormControl, Grid, Input, TextField, Typography, Select, MenuItem, InputLabel } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputForm } from '../../components/InputForm';
import { SelectForm } from '../../components/SelectForm/SelectForm';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import addImage from "/src/assets/mdi_image-plus-outline.svg"

const tipos = [
    { value: 'CONTENEDOR_ROTO', label: 'Contenedor en mal estado' },
    { value: 'CONTENEDOR_SUCIO', label: 'Contenedor sucio' },
    { value: 'BASURA_EN_LA_CALLE', label: 'Basura en la calle' },
    { value: 'CONTENEDOR_FALTANTE', label: 'Contenedor faltante' },
    { value: 'OTROS', label: 'Otro' },
  ];

export const CreateReportPage = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    let shrink = true

    return (
        <Box
            sx={{
                // width: 1,
                // maxWidth: '1020px',
                // margin: 'auto'
                width: '100%',
                maxWidth: '1400px',
                margin: 'auto',
                padding: '0 16px'
            }}
        >
            <Box sx={{ padding: '16px 0 13px' }}>
                <Typography
                    sx={{
                        fontSize: '34px',
                        fontWeight: 400,
                        lineHeight: '42px',
                        letterSpacing: '0.25px'
                    }}
                >
                    Crea un reporte
                </Typography>
            </Box>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '26.56px',
                        mt: '16px',
                        mb: '24px',
                        color: 'black'
                    }}
                >
                    Ingrese los siguientes datos para realizar el reporte
                </Typography>
                <Grid container spacing={2.5}>
                    <Grid item xs={6}>
                        <InputForm
                            name='titleOfReport'
                            control={control}
                            errors={errors}
                            label={'Título del reporte *'}
                            variant='filled'
                            size='medium'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name='typeOfProblem'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormControl variant={'filled'} size={'medium'} fullWidth>
                                    {/* i dont know why i need to put another input label when i use shrink prop */}
                                    {!shrink ?
                                        <InputLabel id={'typeOfProblem' + "-label"} shrink={false}>{'Tipo de Problema'}</InputLabel>
                                        :
                                        <InputLabel id={'typeOfProblem' + "-label"}>{'Tipo de Problema'}</InputLabel>
                                    }
                                    <Select
                                        size={'medium'}
                                        fullWidth
                                        variant={'filled'}
                                        label={'Tipo de Problema'}
                                        {...field}
                                    >
                                        {tipos.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors['typeOfProblem'] && (
                                        <Typography fontSize={'0.85rem'} paddingLeft={1.5} color={'red'}>
                                            {errors['typeOfProblem'].message}
                                        </Typography>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        multiline
                                        label="Descripción"
                                        {...field}
                                        minRows={4}
                                        rows={4}
                                        helperText="Ingrese una descripción del problema para poder brindarle una mejor atención."
                                    />
                                    {errors.description && (
                                        <Typography fontSize={'0.85rem'} paddingLeft={1.5} color={'red'}>{errors.description.message}</Typography>
                                    )}

                                </FormControl>
                            )
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="banner"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <Input
                                        {...field}
                                        id="image-input"
                                        type="file"
                                        disableUnderline
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                        sx={{ display: 'none' }}
                                        inputProps={{
                                            accept: 'image/*',
                                            hidden: true
                                        }}
                                    />
                                    <label htmlFor="image-input">
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
                                                alignItems: 'center'
                                            }}
                                        >
                                            <img src={addImage} />
                                            <Typography
                                                sx={{
                                                    color: '#00000099',
                                                    fontSize: '16px',
                                                    fontWeight: 400,
                                                    lineHeight: '24px',
                                                }}
                                            >
                                                Añade una foto del problema
                                            </Typography>
                                        </Box>
                                    </label>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputForm
                            name='direccion'
                            control={control}
                            errors={errors}
                            label={'Dirección aproximada del contenedor *'}
                            variant='filled'
                            size='medium'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputForm
                            name='id'
                            control={control}
                            errors={errors}
                            label={'Identificador del contenedor (6 dígitos)'}
                            variant='filled'
                            helperText={'OPCIONAL. Ingrese el identificador del contenedor para poder brindarle una mejor atención.'}
                            size='medium'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputForm
                            name='email'
                            control={control}
                            errors={errors}
                            label={'Email'}
                            variant='filled'
                            helperText={'Ingrese su correo electrónico para recibir novedades del reporte'}
                            size='medium'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{
                            width: 1,
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Button
                                sx={{
                                    backgroundColor: '#12422C',
                                    color: 'white',
                                    paddingLeft: '85px',
                                    paddingRight: '85px',
                                    '&:hover': {
                                        backgroundColor: '#0a2e1f' // Color verde oscuro al hacer hover
                                    }
                                }}
                                type="submit"
                            >
                                ENVIAR
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
