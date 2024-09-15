import {
  Box, Paper,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import {
  useEffect, useState 
} from 'react';
import {
  SearcherAndButton
} from '../../components/SearcherAndButton';
import {
  CreateEmployeeForm
} from '../../forms/CreateEmployee/CreateEmployeeForm';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  TableWithEditAndDeleteButtons
} from '../../components/TableWithEditAndDeleteButtons';
import {
  useEmployees
} from '../../api/hooks/useEmployees/useEmployees';


const tableHeaders = [
  {
    value: 'Apellido',
    minWidth: 160
  },
  {
    value: 'Nombre',
    minWidth: 144
  },
  {
    value: 'Cargo',
    minWidth: 120
  },
  {
    value: 'Turno',
    minWidth: 120
  },
  {
    value: 'Email de la empresa',
    minWidth: 256
  },
  {
    value: 'Teléfono de la empresa',
    minWidth: 188
  }
];
const EmployeeRowRender = (employee) => {
  return (
    <TableRow
      key={employee.id}
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
          {employee.surname}
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
          {employee.name}
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
          {employee.role}
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
          {employee.workingShift}
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
          {employee.companyEmail}
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
          {employee.companyPhone}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export const EmployeeContent = () => {
  const [employees, setEmployees] = useState([])
  const [openCreateEmployeeModal, setOpenCreateEmployeeModal] = useState(false);
  const handleOpenCreateEmployeeModal = () => setOpenCreateEmployeeModal(true);
  const handleCloseCreateEmployeeModal = () => setOpenCreateEmployeeModal(false);

  const [lastKey, setLastKey] = useState(null)
  const {
    fetchEmployees: {
      fetchEmployees,
      isLoadingFetchEmployees
    }
  } = useEmployees();

  const [openModifyEmployeeModal, setOpenModifyEmployeeModal] = useState(false);
  const [employeeToModify, setEmployeeToModify] = useState(false);

  const handleOpenModifyContainerModal = (employeeToModify) => {
    setEmployeeToModify(employeeToModify)
    setOpenModifyEmployeeModal(true)
  };
  const handleCloseModifyCompanyModal = () => {
    setOpenModifyEmployeeModal(false)
    setEmployeeToModify(null);
  };

  const refreshEmployeeList = async () => {
    try {
      const employeesResponse = await fetchEmployees();
      setEmployees(employeesResponse.result);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  
  return (
    <Box
      sx={{
        padding: '32px',
      }}
    >
      <ModalCreateResource
        title={'Nuevo Empleado'}
        description={'Complete los siguientes campos para agregar un nuevo empleado a la empresa'}
        open={openCreateEmployeeModal}
        handleClose={handleCloseCreateEmployeeModal}
        form={<CreateEmployeeForm
          handleClose = {handleCloseCreateEmployeeModal}
          onSuccess={refreshEmployeeList}
        />}
      />
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <SearcherAndButton
          placeholderInput={'Buscar por Nombre o Apellido'}
          buttonText={'Nuevo Empleado'}
          inputWidth={'18.75rem'}
          onClick={handleOpenCreateEmployeeModal}
        />
        <TableWithEditAndDeleteButtons
          tableHeaders={tableHeaders}
          rows={employees}
          renderRow={EmployeeRowRender}
          handleOnClickEditButton={handleOpenCreateEmployeeModal}
        />
      </Paper>
    </Box>
  );
};
