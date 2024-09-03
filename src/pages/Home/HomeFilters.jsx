import {
  Typography 
} from '@mui/material';
import Box from '@mui/material/Box';
import {
  InputForm 
} from '../../components/InputForm';

export const HomeFilters = ({
  title, control 
}) => {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}
      >
        <Typography
          fontFamily='Roboto'
          fontSize='14px'
          fontWeight='500'
          lineHeight='21px'
          letterSpacing='0.15px'
          textAlign='left'
          sx={{
            color: '#000000DE',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
            gap: '8px',
          }}
        >
          <InputForm
            name='minimo'
            label='Mínimo %'
            control={control}
            styleInput={ {
              fontFamily:'Roboto',
              fontSize:'14px',
              fontWeight:'300',
              lineHeight:'20px',
              letterSpacing:'0.15000000596046448px',
              textAlign:'left',
              '& .MuiFormLabel-root': {
                fontSize:'14px'
              }
            }}

            
          />

          <Box
            sx={{
              width: '12px',
              padding: '1px' 
            }}
          >
            <Box
              sx={{
                height: '1px',
                backgroundColor: '#2121213B' 
              }}
            />
          </Box>

          <InputForm
            name='maximo'
            label='Máximo %'
            control={control}
            styleInput={ {
              fontFamily:'Roboto',
              fontSize:'14px',
              fontWeight:'300',
              lineHeight:'20px',
              letterSpacing:'0.15000000596046448px',
              textAlign:'left',
              '& .MuiFormLabel-root': {
                fontSize:'14px'
              }

            }}

          />
        </Box>
      </Box>
    </Box>
  );
};