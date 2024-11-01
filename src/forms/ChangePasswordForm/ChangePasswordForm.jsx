import {
  yupResolver 
} from '@hookform/resolvers/yup';
import {
  object, string, ref 
} from 'yup';
import {
  Box, IconButton 
} from '@mui/material';
import {
  useForm 
} from 'react-hook-form';
import {
  CancelAndSubmitButton 
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';
import {
  Visibility, VisibilityOff 
} from '@mui/icons-material';
import {
  useState 
} from 'react';
import {
  InputForm 
} from '../../components/InputForm';
import {
  useAuth 
} from '../../api/hooks/useAuth/useAuth';

const newEmployeeSchema = object({
  password: string().required('Es obligatorio ingresar la contraseña actual'),
  newPassword: string()
    .required('Es obligatorio ingresar la nueva contraseña')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
    .matches(/[@$!%*?&#]/, 'La contraseña debe contener al menos un carácter especial (@, $, !, %, *, ?, & o #)'),
  confirmNewPassword: string()
    .oneOf([ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Es obligatorio confirmar la nueva contraseña'),
}).required();

export const ChangePasswordForm = ({
  handleClose, onSuccess 
}) => {
  const {
    control, handleSubmit, formState: {
      errors 
    } 
  } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(newEmployeeSchema),
  });

  const {
    changePassword: {
      changePassword: changePassword, isChangePasswordLoading 
    },
  } = useAuth();  
 
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleShowPassword = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field] 
    }));
  };

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const email = user.personalEmail      
      const response = await changePassword(
        {
          email: email,
          newPassword: data.newPassword,
          password: data.password,
        });
      console.log(user.personalEmail)
      handleClose();
      onSuccess();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          width: '100%',
          padding: '16px 24px' 
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px' 
          }}
        >
          <InputForm
            name='password'
            label='Contraseña actual'
            control={control}
            errors={errors}
            required={true}
            type={showPassword.current ? 'text' : 'password'}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => handleShowPassword('current')}
                >
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <InputForm
            name='newPassword'
            label='Contraseña nueva'
            control={control}
            errors={errors}
            required={true}
            type={showPassword.new ? 'text' : 'password'} 
            helperText={errors.newPassword?.message}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => handleShowPassword('new')}
                >
                  {showPassword.new ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <InputForm
            name='confirmNewPassword'
            label='Confirmar nueva contraseña'
            control={control}
            errors={errors}
            required={true}
            type={showPassword.confirm ? 'text' : 'password'} 
            helperText={errors.confirmNewPassword?.message}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => handleShowPassword('confirm')}
                >
                  {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />

          <CancelAndSubmitButton
            handleClose={handleClose}
            buttonSubmitMessage='Cambiar'
            secondaryButtonMessage='Cerrar'
            onSubmit={handleSubmit(onSubmit)} 
          />
        </Box>
      </Box>
    </form>
  );
};
