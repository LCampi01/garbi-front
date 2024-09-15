import {
  Typography, Box, Chip
} from '@mui/material';

export const ReportDetailsDescriptionHeader = ({
  title, state
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        width: '100%'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '39.84px',
          letterSpacing: '0.4px',
          textAlign: 'left'
        }}
      >
        {title}
      </Typography>
      <Chip
        label={state}
        color='default'
        size='small'
        variant='outlined'
        sx={{
          marginLeft: '20px',
          padding: '3px 4px',
        }}
      />
    </Box>
  );
};