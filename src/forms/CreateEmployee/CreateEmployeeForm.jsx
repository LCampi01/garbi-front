import {
  yupResolver 
} from '@hookform/resolvers/yup';
import {
  object, string 
} from 'yup';
import {
  Box, Typography 
} from '@mui/material';
import {
  useForm 
} from 'react-hook-form';


import {
  InputForm 
} from '../../components/InputForm';
import {
  SelectForm 
} from '../../components/SelectForm/SelectForm';
import {
  CancelAndSubmitButton 
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';
import {
  useEmployees 
} from '../../api/hooks/useEmployees/useEmployees';
import {
  CustomAlert 
} from '../../components/CustomAlert/CustomAlert';

const cargos = [
  {
    value: 'Recolector',
    label: 'Recolector',
  },
  {
    value: 'Supervisor',
    label: 'Supervisor',
  },
];

const turnos = [
  {
    value: 'Noche',
    label: 'Noche',
  },
  {
    value: 'Tarde',
    label: 'Tarde',
  },
  {
    value: 'Mañana',
    label: 'Mañana',
  },
];

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
  personalPhone: string()
    .required('El teléfono personal es obligatorio')
    .matches(/^\+?\d{10,12}$/, 'El teléfono personal no es válido'),
  personalEmail: string()
    .required('El email personal es obligatorio')
    .email('El email personal no es un email válido'),
  jobPosition: string().required('El cargo es obligatorio'),
  timeShift: string().required('El turno es obligatorio'),
  enterprisePhone: string()
    .required('El teléfono de la empresa es obligatorio')
    .matches(/^\+?\d{10,12}$/, 'El teléfono de la empresa no es válido'),
  enterpriseEmail: string()
    .required('El email de la empresa es obligatorio')
    .email('El email de la empresa no es válido')
}).required();

export const CreateEmployeeForm = ({
  handleClose, onSuccess
}) => {
  const {
    control,
    handleSubmit,
    formState: {
      errors 
    },
  } = useForm({
    defaultValues: {
      companyId: '',
      lastName: '',
      firstName: '',
      personalPhone: '',
      personalEmail: '',
      jobPosition:  '',
      timeShift: '',
      enterprisePhone: '',
      enterpriseEmail: ''
    },
    resolver: yupResolver(newEmployeeSchema),
  });

  const {
    createEmployee: {
      createEmployee,
      isCreateEmployeeLoading 
    },
  } = useEmployees();

  const user = JSON.parse(localStorage.getItem('user'));
  const companyId = user.companyId;

  const onSubmit = async (data) => {
    try {
      const response = await createEmployee({
        companyId: companyId,
        name: data.firstName, 
        surname: data.lastName, 
        personalPhone: data.personalPhone, 
        personalEmail: data.personalEmail, 
        companyPhone: data.enterprisePhone,
        companyEmail: data.enterpriseEmail,
        workingShift: data.timeShift,
        role: data.jobPosition //TODO: see what the BE needs here
      });

      //TODO later: validar que la respuesta sea la esperada, y sino tirar error.
      handleClose();
      onSuccess();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const errorMessages = errors ? (
    Object.values(errors).map((error, index) => (
      <li 
        key={index}
      >
        {error.message}
      </li>
    ))
  ) : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          width: '100%',
          padding: '16px 24px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '16px',
            marginBottom: '16px',
          }}
        >
          Datos Personales
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '40px',
              gap: '24px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <InputForm
                control={control}
                name={'lastName'}
                label={'Apellido'}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <InputForm
                control={control}
                name={'firstName'}
                label={'Nombre'}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '40px',
              gap: '24px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <InputForm
                control={control}
                name={'personalPhone'}
                label={'Teléfono personal'}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <InputForm
                control={control}
                name={'personalEmail'}
                label={'Email personal'}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          padding: '16px 24px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '16px',
            marginBottom: '16px',
          }}
        >
          Datos dentro de la empresa
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '40px',
              gap: '24px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <SelectForm
                name={'jobPosition'}
                label={'Cargo'}
                control={control}
                options={cargos}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <SelectForm
                name={'timeShift'}
                label={'Turno'}
                control={control}
                options={turnos}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '40px',
              gap: '24px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <InputForm
                control={control}
                name={'enterprisePhone'}
                label={'Teléfono de la empresa'}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                height: '40px',
              }}
            >
              <InputForm
                control={control}
                name={'enterpriseEmail'}
                label={'Email de la empresa'}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {Object.keys(errors).length > 0 && (
        <CustomAlert
          severity='error'
          title='Error con los datos ingresados'
          message={errorMessages}
        />
      )}

      <CancelAndSubmitButton
        handleClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </form>
  );
};
