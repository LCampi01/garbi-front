import {
  Typography 
} from '@mui/material';
import Box from '@mui/material/Box';
import TextFieldBox from '../../pages/Home/SideBar/Utils/TextFieldBox';

export const HomeFilters = ({
  title 
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
          marginBottom: '20px'
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
          <TextFieldBox
            text='Mínimo'
            sx={{
              width: '80px',
              height: '28px',
            }}
          />

          <Box
            sx={{
              flex: 1,
              height: '1px',
              backgroundColor: '#2121213B',
              margin: '0 8px',
            }}
          />
          <TextFieldBox
            text='Máximo'
            sx={{
              width: '80px',
              height: '28px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
