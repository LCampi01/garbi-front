import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Paper, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { SearcherAndButton } from '../../components/SearcherAndButton';
import { Controller, useForm } from 'react-hook-form';
import { ModalCreateResource } from '../../modales/ModalCreateResource';
import { CreateCompanyForm } from '../../forms/CreateCompany/CreateCompanyForm';

const CompanyPage = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            padding: '4rem'
        }}>
            <ModalCreateResource
                title={"Nueva Empresa"}
                description={"Complete los siguientes campos para agregar una nueva empresa de recolección al sistema"}
                open={open}
                handleClose = {handleClose}
                form = {<CreateCompanyForm />}
            />

            <Paper sx={{
                width: '100%'
            }}>
                <SearcherAndButton
                    placeholderInput={"Buscar por Razón social o Nombre"}
                    buttonText={"nueva empresa"}
                    inputWidth={'20rem'}
                    onClick={handleOpen}
                />
            </Paper>

        </Box >
    )
}

export default CompanyPage