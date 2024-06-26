import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, styled } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SmallKeyboardArrowDownIcon = (color) => styled(KeyboardArrowDownIcon)(({ theme }) => ({
    fontSize: '16px',
    color: color + "!important"
}));


const estados = {

    NUEVO: {
        color: "#EF6C0080",
        colorText: "#EF6C00",
        text: "NUEVO"
    },

    "EN REVISION": {
        color: "#2196F380",
        colorText: "#2196F3",
        text: "EN REVISIÓN"
    },

    RECHAZADO: {
        color: "#2E7D32",
        colorText: "#2E7D32",
        text: "RECHAZADO"
    },

    RESUELTO: {
        color: "#2E7D32",
        colorText: "#2E7D32",
        text: "RESUELTO"
    }


}

const rows = [
    {
        id: 1,
        fecha: '19/02/24',
        hora: '09:20 hs',
        recolector: "Recolector | #123458",
        descripcion: "Contenedor roto",
        tipoDeReporte: "Contenedor en mal estado",
        lugar: "Villa del Parque",
        area: "Área 1",
        estado: "NUEVO",
    },
    {
        id: 2,
        fecha: '19/02/24',
        hora: '09:20 hs',
        recolector: "Recolector | #123458",
        descripcion: "Contenedor roto",
        tipoDeReporte: "Basura en la calle",
        lugar: "Villa del Parque",
        area: "Área 1",
        estado: "EN REVISION",
    },
    {
        id: 3,
        fecha: '19/02/24',
        hora: '09:20 hs',
        recolector: "Recolector | #123458",
        descripcion: "Contenedor roto",
        tipoDeReporte: "Basura en la calle",
        lugar: "Villa del Parque",
        area: "Área 1",
        estado: "RECHAZADO",
    },
    {
        id: 4,
        fecha: '19/02/24',
        hora: '09:20 hs',
        recolector: "Recolector | #123458",
        descripcion: "Contenedor roto",
        tipoDeReporte: "Contenedor en mal estado",
        lugar: "Villa del Parque",
        area: "Área 1",
        estado: "RESUELTO",
    }
];


export const ReportPage = () => {
    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            height: '100%'
        }}>
            <Box sx={{
                width: '256px',
                boxShadow: '0px 3px 1px -2px #00000033',
                backgroundColor: '#F5F5F5',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Typography sx={{
                    color: '#00000099'
                }}>Filtros</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                        backgroundColor: "#12422C"
                    }}
                >
                    Aplicar
                </Button>
            </Box>
            <Box width={'100%'}>
                <Box sx={{
                    width: '100%',
                    padding: '16px 32px'
                }}>
                    <Typography sx={{
                        fontSize: '34px',
                        fontWeight: 400,
                        letterSpacing: '0.25px',
                        textAlign: 'left'
                    }}>Reportes</Typography>
                </Box>
                <Divider />
                <Box sx={{
                    padding: '32px'
                }}>
                    <Paper sx={{
                        width: '100%',
                    }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                        >
                                            <TableCell>
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 400,
                                                            lineHeight: '21px',
                                                            textAlign: 'left',
                                                            color: "#00000099"
                                                        }}
                                                    >
                                                        {row.fecha}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: 400,
                                                            lineHeight: '21px',
                                                            textAlign: 'left',
                                                            color: "#00000099"
                                                        }}
                                                    >
                                                        {row.hora}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: 400,
                                                        lineHeight: '21px',
                                                        textAlign: 'left',
                                                        color: '#00000099'
                                                    }}
                                                >
                                                    {row.recolector}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 400,
                                                        lineHeight: '24px',
                                                        textAlign: 'left',
                                                        color: '#000000DE'
                                                    }}
                                                >
                                                    {row.descripcion}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip size="small" label={row.tipoDeReporte} variant="outlined" />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: 400,
                                                        lineHeight: '24px',
                                                        color: '#00000099'
                                                    }}
                                                >
                                                    {row.lugar}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: 400,
                                                        lineHeight: '21px',
                                                        color: '#00000099'
                                                    }}
                                                >
                                                    {row.area}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormControl size="small"
                                                    sx={{
                                                        width: '144px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        '& .MuiOutlinedInput-root': {
                                                            '& .MuiSvgIcon-root': {
                                                                right: '20px'
                                                            },
                                                            '& fieldset': {
                                                                borderColor: estados[row.estado].color,
                                                            },
                                                            '&:hover fieldset': {
                                                                borderColor: estados[row.estado].color,
                                                            },
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: estados[row.estado].color,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <InputLabel shrink={false}
                                                        sx={{
                                                            fontSize: '13px',
                                                            fontWeight: 500,
                                                            lineHeight: '22px',
                                                            color: estados[row.estado].colorText + " !important",
                                                            left: '50px',
                                                            transform: 'translateX(-50%) translate(14px, 4px) scale(1)',
                                                        }}
                                                    >
                                                        {estados[row.estado].text}
                                                    </InputLabel>
                                                    <Select
                                                        labelId="provincia-label"
                                                        id="provincia-select"
                                                        IconComponent={SmallKeyboardArrowDownIcon(estados[row.estado].colorText)}
                                                        sx={{
                                                            height: '30px'
                                                        }}
                                                    >
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Avatar>H</Avatar>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={3}
                                rowsPerPage={3}
                                page={6}
                            />
                        </TableContainer>
                    </Paper>
                </Box>
            </Box>
        </Box >
    )
}
