import {
  Box, Button 
} from '@mui/material'

export const CancelAndSubmitButton = ({
  handleClose, onSubmit, buttonSubmitMessage = 'CREAR', typeButton = 'submit', secondaryButtonMessage = 'Cancelar'
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '68px',
        padding: '16px 24px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          gap: '8px',
        }}
      >
        <Button
          color='secondary'
          sx={{
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            padding: '8px',
            '&:hover': {
              backgroundColor: 'secondary.dark',
            },
          }}
          onClick={handleClose}
        >
          {secondaryButtonMessage}
        </Button>
        <Button
          sx={{
            backgroundColor: '#12422C',
            color: 'white',
            paddingLeft: '16px',
            paddingRight: '16px',
            '&:hover': {
              backgroundColor: '#0a2e1f', // Color verde oscuro al hacer hover
            },
          }}
          onClick={onSubmit}
          type={typeButton}
        >
          {buttonSubmitMessage}
        </Button>
      </Box>
    </Box>
  )
}
