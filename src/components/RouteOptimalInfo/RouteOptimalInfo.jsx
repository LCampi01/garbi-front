import {
  Box, Typography, Button
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteIcon from '@mui/icons-material/Route';

export const RouteOptimalInfo = ({
  name,
  timeInMinutes,
  distanceInKms,
  color,
  colorNoSelected,
  selected,
  onClick,
  onSendRoute
}) => {
  return (
    <Box
      sx={{
        padding: '1rem',
        width: 1,
        cursor: 'pointer',
        borderLeft: selected ? `4px solid ${color}` : `4px solid ${colorNoSelected}`,
        boxShadow: '0px 2px 1px -1px #00000033, 0px 1px 1px 0px #00000024, 0px 1px 3px 0px #0000001F',
        transition: 'background-color 0.3s ease',  // Transición suave solo para el background
        '&:hover': {
          backgroundColor: '#f0f0f0',  // Cambia el color de fondo al hacer hover
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          mb: '8px'
        }}
      >
        <Typography
          sx={{
            fontSize: '1.125rem',
            fontWeight: 500,
            lineHeight: '1.8rem',
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '1.5rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <AccessTimeIcon
            sx={{
              fontSize: '1.25rem',
              mr: '2px'
            }}

          />
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: '1.5rem'
            }}
          >
            {timeInMinutes + ' min'}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <RouteIcon
            sx={{
              fontSize: '1.25rem',
              mr: '2px'
            }}

          />
          <Typography
            sx={{
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: '1.5rem'
            }}
          >
            {distanceInKms + ' km'}
          </Typography>
        </Box>
      </Box>
      <Box >
        <Button
          variant='text'
          color='primary'
          size='large'
          onClick={onSendRoute}
        >
          <Typography
            sx={{
              color: '#2196F3',
            }}
          >
            ENVIAR RUTA
          </Typography>
        </Button>
      </Box>

    </Box >
  )
}
