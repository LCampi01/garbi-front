import {
  Box, Typography
} from '@mui/material';


import {
  CancelAndSubmitButton
} from '../../components/CancelAndSubmitButton/CancelAndSubmitButton';



export const DeleteAreaForm = ({
  areaName, handleClose, onSubmit 
}) => {
  return (
    <form
      onSubmit={onSubmit}
    >
      <Box
        sx={{
          width: '100%',
          padding: '16px 24px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 300,
            lineHeight: '26.56px',
          }}
        >
          ¿Está seguro que desea eliminar el área de nombre: {' '}
          <Typography
            component='span'
            sx={{
              fontWeight: '500'
            }}
          >
            {areaName}
          </Typography>
          ? No podrá deshacer esta acción.
        </Typography>
      </Box>
      <CancelAndSubmitButton
        buttonSubmitMessage='ELIMINAR'
        handleClose={handleClose}
      />
    </form>
  )
}
