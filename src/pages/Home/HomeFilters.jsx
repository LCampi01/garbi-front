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
          />

          <Box
            sx={{
              width: '50px',
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

          />
        </Box>
      </Box>
    </Box>
  );
};
