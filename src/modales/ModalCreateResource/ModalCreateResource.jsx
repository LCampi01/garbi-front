import CloseIcon from '@mui/icons-material/Close';
import {
  Alert, AlertTitle, Box, Button, Divider, Modal, Typography
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '0px 6px 30px 5px #0000001F',
  borderRadius: '8px',
};

export const ModalCreateResource = ({
  title, description, open, handleClose, form, buttonSubmitMessage = 'CREAR', onSubmit=null, errors=null
}) => {

  const errorMessages = errors ? (
    Object.values(errors).map((error, index) => (
      <li 
        key={index}
      >
        {error.message}
      </li>
    ))
  ) : null;

  const handleSubmit = (event) => {
    if (onSubmit) {
      event.preventDefault(); // Prevent the default form submission
      onSubmit(event);
    } else {
      // Optional: You can add any fallback behavior if needed
      console.warn('No onSubmit handler provided.');
    }
  };

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
        {description && (<>
          <Divider />
          <Box
            sx={{
              height: '78px',
              padding: '12px 24px',
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 300,
                lineHeight: '26.56px',
              }}
            >
              {description}
            </Typography>
          </Box></>)}
        <Divider />
        <form
          onSubmit={handleSubmit}
        >
          {form}
          {Object.keys(errors).length > 0 && (
            <Box
              sx={{
                paddingInline: '24px'
              }}
            >  
              <Alert
                severity='error'
              >
                <AlertTitle>Error con los datos ingresados</AlertTitle>
                <Box
                  component='ul'
                  sx={{
                    paddingLeft: '16px',
                    margin: 0,
                    wordWrap: 'break-word',
                  }}
                >
                  {errorMessages}
                </Box>
              </Alert>
            </Box>
          )}

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
                type='submit'
              >
                Cancelar
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
                type='submit'
              >
                {buttonSubmitMessage}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
