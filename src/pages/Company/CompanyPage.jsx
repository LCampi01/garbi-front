import {
  Box, Paper,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import {
  useState
} from 'react';
import {
  SearcherAndButton
} from '../../components/SearcherAndButton';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  CreateCompanyForm
} from '../../forms/CreateCompany/CreateCompanyForm';
import {
  DeleteCompanyForm
} from '../../forms/DeleteCompany/DeleteCompanyForm';
import {
  TableWithEditAndDeleteButtons
} from '../../components/TableWithEditAndDeleteButtons';

const companiesInitial = [
  {
    id: 1234,
    companyName: 'Tech Solutions LLC',
    CUIT: '30-12345678-9',
    province: 'Buenos Aires',
    address: 'Av. Libertador General 1234',
    startDate: '2020-01-15',
    adminEmail: 'admin@techsolutions.com',
  },
  {
    id: 12345,
    companyName: 'Innovatech Corp',
    CUIT: '30-87654321-0',
    province: 'Cordoba',
    address: 'Calle Falsa 123',
    startDate: '2018-06-20',
    adminEmail: 'contact@innovatech.com',
  },
  {
    id: 123456,
    companyName: 'Green Energy SA',
    CUIT: '30-11223344-5',
    province: 'Santa Fe',
    address: 'Av. Siempreviva 742',
    startDate: '2015-09-10',
    adminEmail: 'info@greenenergy.com',
  },
];

const CompanyRowRender = (company) => {
  return (
    <TableRow
      key={company.id}
      sx={{
        height: '48px',
        '& .MuiTableCell-root:last-child': {
          borderRight: 0,
        },
        '& .MuiTableCell-root': {
          height: '100%',
          paddingTop: 0,
          paddingBottom: 0
        }
      }}
    >
      <TableCell
        component='th'
        scope='row'
      >
        <Typography
          sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
        >
          {company.companyName}
        </Typography>
      </TableCell>
      <TableCell
        align='center'
      >
        <Typography
          sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
        >
          {company.CUIT}
        </Typography>
      </TableCell>
      <TableCell
        align='center'
      ><Typography
        sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
      >
          {company.province}
        </Typography>
      </TableCell>
      <TableCell
        align='center'
      >
        <Typography
          sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
        >
          {company.address}
        </Typography>
      </TableCell>
      <TableCell
        align='center'
      >
        <Typography
          sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
        >
          {company.startDate}
        </Typography>
      </TableCell>
      <TableCell
        align='center'
      >
        <Typography
          sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
        >
          {company.adminEmail}
        </Typography>
      </TableCell>
    </TableRow>
  )
}


const tableHeaders = [
  {
    value: 'Razón social',
    minWidth: 160
  },
  {
    value: 'CUIT',
    minWidth: 144
  },
  {
    value: 'Provincia',
    minWidth: 200
  },
  {
    value: 'Dirección',
    minWidth: 176
  },
  {
    value: 'Fecha de inicio',
    minWidth: 136
  },
  {
    value: 'Mail admin',
    minWidth: 144
  }
];

const CompanyPage = () => {
  const [companies, setcompanies] = useState(companiesInitial)
  const [openCreateCompanyModal, setOpenCreateCompanyModal] = useState(false);
  const handleOpenCreateCompanyModal = () => setOpenCreateCompanyModal(true);
  const handleCloseCreateCompanyModal = () => setOpenCreateCompanyModal(false);
  const [openDeleteCompanyModal, setOpenDeleteCompanyModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(false);

  const [openModifyCompanyModal, setOpenModifyCompanyModal] = useState(false);
  const [companyToModify, setCompanyToModify] = useState(false);

  const handleOpenModifyCompanyModal = (companyToModify) => {
    setCompanyToModify(companyToModify)
    setCompanyToModify(true)
  };
  const handleCloseModifyCompanyModal = () => {
    setOpenModifyCompanyModal(false)
    setCompanyToModify(null);
  };

  const handleOpenDeleteCompanyModal = (companyToDelete) => {
    setCompanyToDelete(companyToDelete)
    setOpenDeleteCompanyModal(true)
  };
  const handleCloseDeleteCompanyModal = () => {
    setOpenDeleteCompanyModal(false)
    setCompanyToDelete(null);
  };


  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: '4rem',
      }}
    >
      <ModalCreateResource
        title={'Nueva Empresa'}
        description={
          'Complete los siguientes campos para agregar una nueva empresa de recolección al sistema'
        }
        open={openCreateCompanyModal}
        handleClose={handleCloseCreateCompanyModal}
        form={<CreateCompanyForm
          handleClose={handleCloseCreateCompanyModal}
        />}
      />
      <ModalCreateResource
        title={'Eliminar empresa'}
        open={openDeleteCompanyModal}
        handleClose={handleCloseDeleteCompanyModal}
        form={<DeleteCompanyForm
          companyToDelete={companyToDelete}
          handleClose = {handleCloseDeleteCompanyModal}
        />}
      />

      <Paper
        sx={{
          width: '100%',
        }}
      >
        <SearcherAndButton
          placeholderInput={'Buscar por Razón social o Nombre'}
          buttonText={'nueva empresa'}
          inputWidth={'20rem'}
          onClick={handleOpenCreateCompanyModal}
        />
        <TableWithEditAndDeleteButtons
          tableHeaders={tableHeaders}
          rows={companies}
          renderRow={CompanyRowRender}
          handleOnClickEditButton={handleCloseModifyCompanyModal}
          handleOnClickDeleteButton={handleOpenDeleteCompanyModal}
        />
      </Paper>
    </Box>
  );
};

export default CompanyPage;
