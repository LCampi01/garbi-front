import CloseIcon from '@mui/icons-material/Close';
import {
  Box, Button, Divider, Modal, Typography
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '0px 6px 30px 5px #0000001F',
  borderRadius: '8px',
  width: '32.5rem',
};

export const ModalChangePassword = ({
  title,
  open,
  handleClose,
  form,
  buttonSubmitMessage = 'CAMBIAR',
  onSubmit, // Añadir el prop onSubmit
}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
    >
      <Box
        sx={style}
      >
        <Box
          sx={{
            height: '4rem',
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
            padding: '16px 24px' 
          }}
        >
          {form}
        </Box>

        <Divider />

      </Box>
    </Modal>
  );
};
