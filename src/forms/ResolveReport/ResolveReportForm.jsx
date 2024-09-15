import {
  yupResolver 
} from '@hookform/resolvers/yup';
import {
  object, string 
} from 'yup';
import {
  Box
} from '@mui/material';
import {
  useForm 
} from 'react-hook-form';
import {
  CancelAndSubmitButton 
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';
import {
  InputForm 
} from '../../components/InputForm';
import {
  reportStates 
} from '../../enums/reportStates';
import {
  useReports 
} from '../../api/hooks/useReports/useReports';


const changeReportStatusSchema = object({
  message: string().required('El mensaje es obligatorio'),
}).required();

export const ResolveReportForm = ({
  handleClose, reportId, reportStatus, statusUpdated
}) => {
  const {
    control,
    handleSubmit,
    formState: {
      errors 
    },
  } = useForm({
    defaultValues: {
      id: reportId,
      status: '',
      message: ''
    },
    resolver: yupResolver(changeReportStatusSchema),
  });

  const {
    closeReport: {
      closeReport,
      isCloseReportLoading 
    },
  } = useReports(); 

  const user = JSON.parse(localStorage.getItem('user'));
  const userPersonalEmail = user.personalEmail;

  const onSubmit = async (data) => {
    try {
      const rejected = reportStatus === reportStates.RECHAZADO.text

      const closeReportBody = {
        email: userPersonalEmail,
        rejected: rejected,
        observation: data.message
      }
      
      const response = await closeReport(reportId, closeReportBody);

      //TODO later: validar que la respuesta sea la esperada, y sino tirar error.
      statusUpdated();
      handleClose();
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
          padding: '4px 24px',
        }}
      >
        <InputForm
          name={'message'}
          label={'Mensaje'}
          control={control}
          errors={errors}
          multiline={true}
          rows={4}
        />
      </Box>

      <CancelAndSubmitButton
        buttonSubmitMessage='CONFIRMAR'
        handleClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      />
    </form>
  );
};
