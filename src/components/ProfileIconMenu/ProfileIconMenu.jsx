import {
  Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
  useNavigate 
} from 'react-router-dom';

export const ProfileIconMenu = ({
  handleClose, anchorEl
}) => {
  const navigate = useNavigate();
  const handleClickProfileItem = () => () => {
    navigate('/perfil');
    handleClose();
  };

  const userData = JSON.parse(localStorage.getItem('user'));
  const userName = userData.name
  const userSurname = userData.surname
  const userEmail = userData.email

  return (
    <Menu
      sx={{
        mt: '44px',
      }}
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
      <Box
        sx={{
          paddingX: 2,
          paddingBottom: 1
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 400,
          }}
        >
          {userName} {userSurname}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 300,
          }}
        >
          {userEmail}
        </Typography>
      </Box>
      <Divider />
      <MenuItem
        onClick={handleClickProfileItem()}
        sx={{
          marginTop: 1
        }}
      >
        <ListItemIcon>
          <PersonOutlineIcon
            fontSize='small'
          />
        </ListItemIcon>
        <ListItemText>Perfil</ListItemText>
      </MenuItem>
      <MenuItem >
        <ListItemIcon>
          <LogoutIcon
            fontSize='small'
          />
        </ListItemIcon>
        <ListItemText>Cerrar sesión</ListItemText>
      </MenuItem>
    </Menu>
  );
};
