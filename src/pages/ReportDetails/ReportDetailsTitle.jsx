import {
  Typography, Box 
} from '@mui/material';

const navigationTitle = 'Reportes > Reporte';

export const ReportDetailsTitle = ({
  title 
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 1,
        padding: '1rem 4rem .8125rem 4rem',
      }}
    >
      <Typography
        sx={{
          fontSize: '2.125rem',
          fontWeight: '400',
          lineHeight: '2.6244rem',
          letterSpacing: '.0156rem',
          textAlign: 'left',
        }}
      >
        {navigationTitle} {title}
      </Typography>
    </Box>
  );
};
