import {
  Box, Button, IconButton, Menu, MenuItem, Typography 
} from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';

export const NotificationsMenu = ({
  handleClose, notifications, anchorEl, onRemoveNotification, onClickNoti
}) => {
  const iconStyle = {
    color: '#bdbdbd' 
  };

  const getIcon = (type) => {
    switch (type) {
    case 'frequencyChange':
      return <ChangeCircleIcon
        sx={iconStyle}
      />;
    case 'newReport':
      return <FeedbackIcon
        sx={iconStyle}
      />;
    case 'lowBattery':
      return <BatteryAlertIcon
        sx={iconStyle}
      />;
    case 'fullContainers':
      return <DeleteIcon
        sx={iconStyle}
      />;
    default:
      return <WarningIcon
        sx={iconStyle}
      />;
    }
  };

  return (
    <Menu
      sx={{
        mt: '44px',
        '& .MuiPaper-root': {
          maxHeight: '440px',
          overflowY: 'auto',
        }
      }}
      id='menu-notifications'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right' 
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right' 
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {notifications.length === 0 ? (
        <Box
          sx={{
            padding: 2,
            textAlign: 'center' 
          }}
        >
          <Typography
            variant='body2'
          >
            No tienes ninguna notificación disponible
          </Typography>
        </Box>
      ) : (
        notifications.map((notification, index) => (
          <MenuItem
            key={notification.id}
            onClick={onClickNoti} 
            divider={index < notifications.length - 1}
            sx={{
              width: '384px',
              paddingY: '12px'
            }}
          >
            <Box
              sx={{
                width: '100%' 
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  {getIcon(notification.type)}
                  <Typography 
                    fontWeight='medium'
                    sx={{ 
                      ml: 1,
                      mt: 0.3
                    }}
                  >
                    {notification.title}
                  </Typography>
                </Box>
                <IconButton 
                  size='small'
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveNotification(notification.id);
                  }}
                >
                  <CloseIcon
                    fontSize='small'
                  />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography 
                  variant='body2'
                  sx={{ 
                    flex: 1,
                    maxWidth: '200px',
                    whiteSpace: 'pre-line',
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {notification.description}
                </Typography>
                <Button 
                  size='small' 
                  onClick={handleClose}
                >
                  VER DETALLES
                </Button>
              </Box>
            </Box>
          </MenuItem>
        ))
      )}
    </Menu>
  );
};
