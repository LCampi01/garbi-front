import {
  Button, Typography 
} from '@mui/material';
import {
  Box 
} from '@mui/system';

export const ReportDetailsSideComponent = ({
  icon,
  titleIcon,
  title,
  description,
  description2,
  button,
  buttonIcon
}) => {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '12px 5px',
        width: '100%',
        height: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        {icon}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '15px',
                fontWeight: '600',
                lineHeight: '26.56px',
                letterSpacing: '0.4px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {title}
              {titleIcon}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '15px',
              fontWeight: '400',
              lineHeight: '26.56px',
              letterSpacing: '0.4px',
              textAlign: 'left',
            }}
          >
            {description}
          </Typography>

          {description2 && (
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '23.24px',
                letterSpacing: '0.4px',
                textAlign: 'left',
                marginTop: '0px',
              }}
            >
              {description2}
            </Typography>
          )}
       

          {button && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center' 
              }}
            >
              <Button
                sx={{
                  color: '#12422C',
                  fontFamily: 'Roboto',
                  fontSize: '14px',
                  fontWeight: '500',
                  lineHeight: '24px',
                  letterSpacing: '0.4px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  width: 'auto', // Ajusta el ancho del botón según su contenido
                }}
              >
                {button}
              </Button>
              {buttonIcon}

            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
