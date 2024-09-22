import {
  Box, Paper,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import {
  useState, useEffect
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
          {company.name}
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
          {company.cuit}
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
          {company.address.street + company.address.number + ', ' + company.address.neighborhood}
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
          {company.timestamp}
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
          {company.email}
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

const CompanyTable = ({
  data: companies
}) => {
  const [openCreateCompanyModal, setOpenCreateCompanyModal] = useState(false);
  const handleOpenCreateCompanyModal = () => setOpenCreateCompanyModal(true);
  const handleCloseCreateCompanyModal = () => setOpenCreateCompanyModal(false);
  
  const [openDeleteCompanyModal, setOpenDeleteCompanyModal] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const [openModifyCompanyModal, setOpenModifyCompanyModal] = useState(false);
  const [companyToModify, setCompanyToModify] = useState(null);
  
  const handleOpenModifyCompanyModal = (company) => {
    setCompanyToModify(company);
    setOpenModifyCompanyModal(true);
  };

  const handleCloseModifyCompanyModal = () => {
    setOpenModifyCompanyModal(false);
    setCompanyToModify(null);
  };

  const handleOpenDeleteCompanyModal = (company) => {
    setCompanyToDelete(company);
    setOpenDeleteCompanyModal(true);
  };

  const handleCloseDeleteCompanyModal = () => {
    setOpenDeleteCompanyModal(false);
    setCompanyToDelete(null);
  };

  useEffect(() => {console.log(companies)}, [companies])


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

export default CompanyTable;
