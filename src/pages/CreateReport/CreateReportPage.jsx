import {
  Box,
  Divider,
  Typography,
} from '@mui/material';
import {
  CreateReportForm 
} from '../../forms/CreateReport/CreateReportForm';
import {
  useParams
} from 'react-router-dom';


export const CreateReportPage = () => {
  const {
    containerId
  } = useParams()

  
  return (
    <Box
      sx={{
        // width: 1,
        // maxWidth: '1020px',
        // margin: 'auto'
        width: '100%',
        maxWidth: '1400px',
        margin: 'auto',
        padding: '0 16px',
      }}
    >
                  
      <Box
        sx={{
          padding: '16px 0 13px',
        }}
      >
        <Typography
          sx={{
            fontSize: '34px',
            fontWeight: 400,
            lineHeight: '42px',
            letterSpacing: '0.25px',
          }}
        >
          Crea un reporte
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}

      >
        <CreateReportForm
          containerId={containerId}
        />

      </Box>

    </Box>
  );
};
