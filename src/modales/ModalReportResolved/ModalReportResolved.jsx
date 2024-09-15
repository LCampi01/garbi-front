import {
  Box, Button, Divider, Modal, Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '0px 6px 30px 5px #0000001F',
  borderRadius: '8px',
};

export const ModalReportResolved = ({
  title, open, handleClose, form
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus={true}
    >
      <Box
        sx={{
          width: '32.5rem',
          ...style,
        }}
      >
        <Box
          sx={{
            height: '4rem',
            width: '100%',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '32px',
            }}
          >
            {title}
          </Typography>
          <Button
            sx={{
              padding: 0,
              minWidth: 0,
              borderRadius: '50%',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Button>
        </Box>
        <Divider />
        <Box
          sx={{
            height: '78px',
            padding: '12px 24px 8px 24px',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 300,
              lineHeight: '26.56px',
            }}
          >
            Para confirmar el cambio de estado del reporte, ingrese un mensaje para el recolector/ciudadano que reportó el problema.
          </Typography>
        </Box>
        {form}
      </Box>
    </Modal>
  );
};
