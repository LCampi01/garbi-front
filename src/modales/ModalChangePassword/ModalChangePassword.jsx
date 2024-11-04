import CloseIcon from '@mui/icons-material/Close';
import {
  Box, Button, Divider, Modal, Typography, IconButton
} from '@mui/material';
import {
  useForm 
} from 'react-hook-form';
import {
  yupResolver 
} from '@hookform/resolvers/yup';
import {
  object 
} from 'yup';
import {
  string 
} from 'yup';
import {
  ref 
} from 'yup';
import {
  useAuth 
} from '../../api/hooks/useAuth/useAuth';
import {
  useState 
} from 'react';
import {
  InputForm 
} from '../../components/InputForm';
import {
  Visibility, VisibilityOff 
} from '@mui/icons-material';
import {
  CancelAndSubmitButton 
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '0px 6px 30px 5px #0000001F',
  borderRadius: '8px',
  width: '32.5rem',
};

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



export const ModalChangePassword = ({
  title,
  open,
  handleClose,
  emailProp
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

  const email = emailProp || JSON.parse(localStorage.getItem('user'))?.personalEmail;


  const onSubmit = async (data) => {
    try {
      const response = await changePassword(
        {
          email: email,
          newPassword: data.newPassword,
          password: data.password,
        });
      handleClose();
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
    >
      <Box
        sx={style}
      >
        <Box
          sx={{
            height: '4rem',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '32px',
            }}
          >
            {title}
          </Typography>
          <Button
            sx={{
              padding: 0,
              minWidth: 0,
              borderRadius: '50%',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </Box>

        <Divider />

        <Box
          sx={{
            padding: '16px 24px' 
          }}
        >
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
        </Box>

        <Divider />

      </Box>
    </Modal>
  );
};
