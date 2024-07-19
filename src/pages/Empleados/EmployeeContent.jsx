import {
  yupResolver 
} from '@hookform/resolvers/yup';
import {
  object, string 
} from 'yup';
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
  useForm 
} from 'react-hook-form';
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

const employeesInitial = [
  {
    id: 1,
    lastName: 'García',
    firstName: 'Juan',
    position: 'Developer',
    shift: 'Morning',
    companyEmail: 'juan.garcia@empresa.com',
    companyPhone: '+34 600 123 456'
  },
  {
    id: 2,
    lastName: 'Martínez',
    firstName: 'Ana',
    position: 'Designer',
    shift: 'Afternoon',
    companyEmail: 'ana.martinez@empresa.com',
    companyPhone: '+34 600 654 321'
  },
  {
    id: 3,
    lastName: 'López',
    firstName: 'Carlos',
    position: 'Manager',
    shift: 'Evening',
    companyEmail: 'carlos.lopez@empresa.com',
    companyPhone: '+34 600 789 012'
  }
];

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
      >
        <Typography
          sx={{
            fontSize: '.875rem',
            fontWeight: 400,
            lineHeight: ' 1.2512rem',
            color: '#000000DE'
          }}
        >
          {employee.lastName}
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
          {employee.firstName}
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
          {employee.position}
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
          {employee.shift}
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


const newEmployeeSchema = object({
  lastName: string()
    .required('El apellido es obligatorio')
    .matches(/^[a-zA-Z\s]+$/, 'El apellido no puede contener números o caracteres especiales')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no debe exceder 50 caracteres'),
  firstName: string()
    .required('El nombre es obligatorio')
    .matches(/^[a-zA-Z\s]+$/, 'El nombre no puede contener números o caracteres especiales')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no debe exceder 50 caracteres'),
  phone: string()
    .matches(/^\+?\d{10,12}$/, 'El teléfono personal no es válido')
    .required('El teléfono personal es obligatorio'),
  personalEmail: string()
    .email('El email personal no es un email válido')
    .required('El email personal es obligatorio'),
  jobPosition: string().required('El cargo es obligatorio'),
  timeShift: string().required('El turno es obligatorio'),
  enterprisePhone: string()
    .matches(/^\+?\d{10,12}$/, 'El teléfono de la empresa no es válido')
    .required('El teléfono de la empresa es obligatorio'),
  enterpriseEmail: string()
    .email('El email de la empresa no es válido')
    .required('El email de la empresa es obligatorio')
}).required();

export const EmployeeContent = () => {
  const [employees, setEmployees] = useState(employeesInitial)
  const [openCreateEmployeeModal, setOpenCreateEmployeeModal] = useState(false);
  const handleOpenCreateEmployeeModal = () => setOpenCreateEmployeeModal(true);
  const handleCloseCreateEmployeeModal = () => setOpenCreateEmployeeModal(false);

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

  const {
    control,
    handleSubmit,
    formState: {
      errors 
    },
  } = useForm({
    defaultValues: {
      lastName: '',
      firstName: '',
      phone: '',
      personalEmail: '',
      jobPosition:  '',
      timeShift: '',
      enterprisePhone: '',
      enterpriseEmail: ''
    },
    resolver: yupResolver(newEmployeeSchema),
  });

  const onSubmit = async (data) => {
    /*const response = await login({
      email: data.email,
      password: data.password,
    });

    if (response.success) {
      localStorage.setItem('token', response.token);
      const user = jwtDecode(response.token).user;
      localStorage.setItem('user', JSON.stringify(user));

      if (!response.termsAndConditions) {
        setIsFlipped(true);
      } else {
        navigate('/home');
      }
    }*/
  };

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
          control={control}
          errors={errors}
        />}
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
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
