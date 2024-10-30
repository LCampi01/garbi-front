import {
  Typography, Box
} from '@mui/material';

export const ReportDetailsDescriptionContent = ({
  description, image
}) => {
  return (
    <Box
      sx={{
        border: '1px solid var(--divider, #0000001F)',
        borderRadius: '4px',
        padding: '.75rem 1.5rem 1rem',
        height: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '26.56px',
            letterSpacing: '0.4px',
            textAlign: 'left',

          }}
        >
          Descripción:
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '26.56px',
            letterSpacing: '0.4px',
            textAlign: 'left'
          }}
        >
          {description}
        </Typography>
      </Box>
      <Box>
        {image ? (
          <img
            src={image}
            alt='Descripción de la imagen'
            style={{
              maxWidth: '320px',
              maxHeight: '240px',
              width: '100%',
              height: 'auto',
            }}
          />
        ) : (
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '15px',
              fontWeight: '400',
              lineHeight: '26.56px',
              letterSpacing: '0.4px',
              textAlign: 'left',
              mt: '32px',
            }}
          >
            El creador del reporte no adjuntó ninguna imagen
          </Typography>
        )}
      </Box>
    </Box>
  );
};
