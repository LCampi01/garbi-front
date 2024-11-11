import CloseIcon from '@mui/icons-material/Close';
import {
  Box, Button, Modal, Typography 
} from '@mui/material';
import Circle from '@mui/icons-material/Circle';
import {
  useForm 
} from 'react-hook-form';
import {
  InputForm 
} from '../../components/InputForm';
import {
  CancelAndSubmitButton 
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';
import {
  yupResolver 
} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  thresholdFull: yup
    .lazy((value) => {
      if (value === '' || value === undefined) {
        return yup.mixed().notRequired();
      } else {
        return yup
          .number()
          .typeError('El valor debe ser un número')
          .max(100, 'El valor no debe superar el 100%')
          .min(
            yup.ref('thresholdWarning'), 
            'El valor debe ser mayor al valor del otro campo'
          )        
          .required('El límite de llenado es obligatorio');
      }
    }),

  thresholdWarning: yup
    .lazy((value) => {
      if (value === '' || value === undefined) {
        return yup.mixed().notRequired();
      } else {
        return yup
          .number()
          .typeError('El valor debe ser un número')
          .min(0, 'El valor debe ser mayor o igual a 0')
          .max( yup.ref('thresholdFull'), 'El valor debe ser menor al valor del otro campo')
          .required('El límite de advertencia es obligatorio');
      }
    }),
}).required();


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '0px 6px 30px 5px #0000001F',
  borderRadius: '8px',
};

export const ModalAdjustContainersThreshold = ({
  open, handleClose, onSubmit, company, thresholdInformation
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {
      errors 
    }
  } = useForm({
    defaultValues: {
      thresholdFull: '',
      thresholdWarning: ''
    },
    resolver: yupResolver(schema)
  });

  const handleFormSubmit = (data) => {

    if (!data.thresholdFull) {
      setValue('thresholdFull', company.threshold.full || 75);
    }
    if (!data.thresholdWarning) {
      setValue('thresholdWarning', company.threshold.warning || 25);
    }

    const thresholdFull = data.thresholdFull || company.threshold.full;
    const thresholdWarning = data.thresholdWarning || company.threshold.warning;

    const modifiedCompany = {
      ...company 
    };
    delete modifiedCompany.truckTerminal;
    delete modifiedCompany.timestamp;
    delete modifiedCompany.dump;

    const reviewCompanyBody = {
      ...modifiedCompany,
      threshold: {
        full: thresholdFull,
        warning: thresholdWarning,
      },
    };

    onSubmit(reviewCompanyBody);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box
        sx={{
          width: '32rem',
          ...style 
        }}
      >
        <Box
          sx={{
            width: '100%',
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
              lineHeight: '32px' 
            }}
          >
            Ajustar límites
          </Typography>
          <Button
            sx={{
              padding: 0,
              minWidth: 0,
              borderRadius: '50%' 
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Box
          sx={{
            marginLeft: '20px' 
          }}
        >
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center' 
              }}
            >
              <Circle
                sx={{
                  color: '#D32F2F',
                  marginRight: '8px' 
                }}
              />
              <Typography>es</Typography>
              <InputForm
                control={control}
                name={'thresholdFull'}
                styleInput={{
                  width: '60px',
                  marginLeft: '8px',
                  marginRight: '8px' 
                }}
                errors={errors}
                fullWidth={false}
                placeholder={company?.threshold?.full ? `${company.threshold.full}%` : '75%'}
              />
              <Typography>o más de la capacidad del contenedor</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '16px' 
              }}
            >
              <Circle
                sx={{
                  color: '#2E7D32',
                  marginRight: '8px' 
                }}
              />
              <Typography>es</Typography>
              <InputForm
                control={control}
                name={'thresholdWarning'}
                styleInput={{
                  width: '60px',
                  marginLeft: '8px',
                  marginRight: '8px' 
                }}
                errors={errors}
                fullWidth={false}
                placeholder={company?.threshold?.warning ? `${company.threshold.warning}%` : '25%'}
              />
              <Typography>o menos de la capacidad del contenedor</Typography>
            </Box>

            <CancelAndSubmitButton
              handleClose={handleClose}
              buttonSubmitMessage='MODIFICAR'
            />
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
