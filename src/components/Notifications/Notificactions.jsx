import {
  Badge, Box, IconButton 
} from '@mui/material';
import {
  useState 
} from 'react'
import {
  NotificationsMenu 
} from '../NotificationsMenu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {
  useNotifications 
} from '../../api/hooks/useNotifications/useNotifications';

export const Notificactions = () => {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'frequencyChange',
      title: 'Cambio de frecuencia',
      description: 'Reduce la frecuencia en Área 2'
    },
    {
      id: 2,
      type: 'newReport',
      title: 'Nuevo reporte',
      description: 'Contenedor desbordado'
    },
    {
      id: 3,
      type: 'lowBattery',
      title: 'Batería baja',
      description: 'El contenedor #123456 tiene menos de 20% de batería'
    },
    {
      id: 4,
      type: 'fullContainers',
      title: 'Contenedores llenos',
      description: 'El 60% de los contenedores en zona 1 están llenos',
      details: 'VER DETALLES'
    },
  ]);


  const {
    getNotifications: {
      getNotifications,
      isLoadingGetNotifications
    },
    updateNotification: {
      updateNotification,
      isLoadingUpdateNotifications
    }
  } = useNotifications()


  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const notifications = await getNotifications();
  //     console.log('🚀 ~ fetchNotifications ~ notifications:', notifications)
  //   }

  //   fetchNotifications();
  // }, [])


  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleRemoveNotification = (id) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== id));
  };

  return (
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
  )
}
