import AppBar from '@mui/material/AppBar';
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
  useState, useEffect 
} from 'react';
import garbiLogo from '/src/assets/garbi-navbar.png';
import {
  useNavigate, useLocation 
} from 'react-router-dom';
import {
  ProfileIconMenu 
} from '../../components/ProfileIconMenu';
import {
  Notificactions 
} from '../Notifications';
import{
  onMessage 
} from 'firebase/messaging';
import {
  messaging 
} from '../../firebase/firebaseConfig';

const pages = {
  Mapa: '/inicio',
  Estadísticas: '/estadisticas',
  Recomendaciones: '/recomendaciones',  
  Reportes: '/reportes',
};

const managementItems = {
  Empleados: '/empleados',
  Contenedores: '/contenedores',  
  Recorridos: '/recorridos',  
  Áreas: '/areas',
};

export const Header = ({
  logoOnly = false 
}) => {  
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = useState(null);
  
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElManagement, setAnchorElManagement] = useState(null);
  const [currentTab, setCurrentTab] = useState('');

  onMessage(messaging, (payload) => {
    console.log('🚀 ~ onMessage ~ payload:', payload)
  });

  useEffect(() => {
    const activePage = Object.keys(pages).find(key => pages[key] === location.pathname);
    if (activePage) {
      setCurrentTab(activePage);
    } else if (Object.values(managementItems).includes(location.pathname)) {
      setCurrentTab('Gestión');
    } else {
      setCurrentTab('');
    }
  }, [location.pathname]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleOpenManagementMenu = (event) => {
    setAnchorElManagement(event.currentTarget);
    setCurrentTab('Gestión');
  };

  const handleCloseManagementMenu = () => {
    setAnchorElManagement(null);
  };

  const handleClickTab = (path) => (event) => {
    if (event.type === 'auxclick' && event.button === 1) { //Middle-click
      window.open(path, '_blank');
    } else if (event.type === 'click' && event.button === 0) { //Left-click
      navigate(path);
      setAnchorElNav(null);
      setCurrentTab(Object.keys(pages).find(key => pages[key] === path));
    }
  };

  const handleHeaderMouseDown = (e) => {
    if (e.button === 1) { //Middle-click
      e.preventDefault() //previene el autoscroll para que funcione el abrir páginas en nuevas tabs.
    }
  }
  
  const handleClickManagementItem = (path) => (event) => {
    if (event.type === 'auxclick' && event.button === 1) { //Middle-click
      window.open(path, '_blank');
    } else if (event.type === 'click' && event.button === 0) { //Left-click
      navigate(path);
      setAnchorElManagement(null);
      setCurrentTab('Gestión');
    }
  };



  return (
    <AppBar
      onMouseDown={handleHeaderMouseDown}
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
                onClick={() => navigate('/inicio')}
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
                  onClick={() => navigate('/inicio')}
                  onAuxClick={(event) => {
                    if (event.button === 1) { //Middle-click
                      window.open('/inicio', '_blank');
                    }
                  }}
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
                      onAuxClick={handleClickTab(pages[page])} //for middle click
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
                      onAuxClick={handleClickTab(pages[page])} //for middle click
                      onClick={handleClickTab(pages[page])}
                      sx={{
                        color: 'white',
                        textTransform: 'unset',
                        borderBottom: currentTab === page ? '2px solid white' : 'none',
                        '&:hover': {
                          backgroundColor: '#0c3020',
                        },
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
                      borderBottom: currentTab === 'Gestión' ? '2px solid white' : 'none',
                      '&:hover': {
                        backgroundColor: '#0c3020',
                      },
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
                        onAuxClick={handleClickManagementItem(managementItems[managementItem])} //for middle click
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
                  <Notificactions />
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