import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {
  ExpandMore 
} from '@mui/icons-material';
import {
  useState 
} from 'react';
import garbiLogo from '/src/assets/garbi-navbar.png';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {
  useNavigate, useLocation 
} from 'react-router-dom';
import {
  NotificationsMenu 
} from '../../components/NotificationsMenu';
import {
  ProfileIconMenu 
} from '../../components/ProfileIconMenu';

const pages = {
  Mapa: '/home',
  Estadísticas: '/home',  // esta hay que cambiarla cuando la creemos
  Recomendaciones: '/recomendaciones',  
  Reportes: '/reportes',
};

const managementItems = {
  Empleados: '/empleados',
  Contenedores: '/containers',  
  Recorridos: '/routes',  
  Áreas: '/areas',
};

export const Header = ({
  logoOnly = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElManagement, setAnchorElManagement] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleOpenManagementMenu = (event) => {
    setAnchorElManagement(event.currentTarget);
  };

  const handleCloseManagementMenu = () => {
    setAnchorElManagement(null);
  };


  const handleClickTab = (path) => () => {
    navigate(path);
    setAnchorElNav(null);
  };

  const handleClickManagementItem = (path) => () => {
    navigate(path);
    setAnchorElManagement(null);
  };


  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'frequencyChange',
      title: 'Cambio de frecuencia',
      description: 'Reduce la frecuencia en Área 2',
    },
    {
      id: 2,
      type: 'newReport',
      title: 'Nuevo reporte',
      description: 'Contenedor desbordado',
    },
    {
      id: 3,
      type: 'lowBattery',
      title: 'Batería baja',
      description: 'El contenedor #123456 tiene menos de 20% de batería',
    },
    {
      id: 4,
      type: 'fullContainers',
      title: 'Contenedores llenos',
      description: 'El 60% de los contenedores en zona 1 están llenos',
      details: 'VER DETALLES'
    }
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const currentTab = Object.keys(pages).find(key => pages[key] === location.pathname) || false;

  return (
    <AppBar
      sx={{
        background: '#12422c',
        zIndex: 1100 
      }}
    >
      <Container
        sx={{
          background: '#12422c',
          margin: 0,
          width: 1,
          maxWidth: 'unset !important',
        }}
        disableGutters
      >
        <Toolbar
          disableGutters
          sx={{
            background: '#12422c',
            width: '100%',
            pr: '32px' 
          }}
        >
          <AdbIcon
            sx={{
              display: {
                xs: 'none' 
              },
              mr: 1,
              backgroundColor: '#12422c' 
            }}
          />
          {logoOnly ? (
            <Box
              width={'256px'}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center' 
              }}
            >
              <Box
                sx={{
                  background: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: 'none' 
                }}
                component={'button'}
                onClick={() => navigate('/home')}
              >
                <img
                  src={garbiLogo}
                  height='40'
                />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '100%' 
              }}
            >
              <Box
                width={'256px'}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' 
                }}
              >
                <Box
                  sx={{
                    background: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'none' 
                  }}
                  component={'button'}
                  onClick={() => navigate('/home')}
                >
                  <img
                    src={garbiLogo}
                    height='40'
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  flexGrow: 1,
                  display: {
                    xs: 'flex',
                    md: 'none' 
                  },
                  backgroundColor: '#12422c' 
                }}
              >
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleOpenNavMenu}
                  color='inherit'
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left' 
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left' 
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: {
                      xs: 'block',
                      md: 'none' 
                    },
                    backgroundColor: '#12422c' 
                  }}
                >
                  {Object.keys(pages).map((page) => (
                    <MenuItem
                      key={page}
                      onClick={handleClickTab(pages[page])}
                    >
                      <Typography
                        textAlign='center'
                      >{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              
              <AdbIcon
                sx={{
                  display: {
                    xs: 'flex',
                    md: 'none' 
                  },
                  backgroundColor: '#12422c',
                  mr: 1 
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'space-between' 
                }}
              >
                <Box
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'flex' 
                    },
                    backgroundColor: '#12422c',
                    gap: {
                      md: '16px' 
                    },
                  }}
                >
                  {Object.keys(pages).map((page) => (
                    <Button
                      key={page}
                      onClick={handleClickTab(pages[page])}
                      sx={{
                        color: 'white',
                        textTransform: 'unset',
                        borderBottom: currentTab === page ? '2px solid white' : 'none',
                      }}
                    >
                      {page}
                    </Button>
                  ))}
             
                  <Button
                    onClick={handleOpenManagementMenu}
                    sx={{
                      color: 'white',
                      textTransform: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Gestión
                    <ExpandMore
                      sx={{
                        color: 'white' 
                      }}
                    />
                  </Button>
                  <Menu
                    sx={{
                      mt: '44px' 
                    }}
                    id='menu-appbar'
                    anchorEl={anchorElManagement}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left' 
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left' 
                    }}
                    open={Boolean(anchorElManagement)}
                    onClose={handleCloseManagementMenu}
                  >
                    {Object.keys(managementItems).map((managementItem) => (
                      <MenuItem
                        key={managementItem}
                        onClick={handleClickManagementItem(managementItems[managementItem])}
                      >
                        <Typography
                          textAlign='center'
                        >{managementItem}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px' 
                  }}
                >
                  <Box>
                    <IconButton
                      onClick={handleOpenNotificationsMenu}
                    >
                      <Badge 
                        badgeContent={notifications.length}
                        color='error'
                        sx={{
                          '& .MuiBadge-badge': {
                            right: 4,
                            top: 4,
                          },
                        }}
                      >
                        <NotificationsOutlinedIcon
                          sx={{
                            color: 'white' 
                          }}
                        />
                      </Badge>
                    </IconButton>
                    <NotificationsMenu
                      handleClose={handleCloseNotificationsMenu}
                      notifications={notifications}
                      anchorEl={anchorElNotifications}
                      onRemoveNotification={handleRemoveNotification}
                    />
                  </Box>
                  <Box>
                    <IconButton
                      onClick={handleOpenProfileMenu}
                    >
                      <PersonIcon
                        sx={{
                          color: 'white' 
                        }}
                      />
                    </IconButton>
                    <ProfileIconMenu
                      handleClose={handleCloseProfileMenu}
                      anchorEl={anchorElProfile}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
