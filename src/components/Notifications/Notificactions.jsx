import {
  Badge, Box, IconButton 
} from '@mui/material';
import {
  useEffect,
  useState 
} from 'react'
import {
  NotificationsMenu 
} from '../NotificationsMenu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import {
  useNotifications 
} from '../../api/hooks/useNotifications/useNotifications';
import {
  useNavigate 
} from 'react-router-dom';
import {
  onMessage 
} from 'firebase/messaging';
import {
  messaging 
} from '../../firebase/firebaseConfig';

export const Notificactions = () => {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate()

  const {
    getNewestNotifications: {
      getNewestNotifications
    },
    updateNotifications: {
      updateNotifications
    }
  } = useNotifications()


  useEffect(() => {
    const fetchNotifications = async () => {
      const notifications = await getNewestNotifications();
      setNotifications(notifications.result)
    }

    fetchNotifications();
  }, [])

  const onClickNoti = () => {
    setAnchorElNotifications(null);
    
    updateNotifications(notifications.map(n => n.id), false)

    setNotifications([])

    navigate('/recomendaciones')
  }

  onMessage(messaging, (payload) => {
    console.log('🚀 ~ onMessage ~ payload:', payload)

    const jsonObject = JSON.parse(payload.notification.body);
    console.log('🚀 ~ onMessage ~ jsonObject:', jsonObject)
    const newNotifications = [...notifications, jsonObject]

    console.log('🚀 ~ onMessage ~ newNotifications:', newNotifications)

    setNotifications(newNotifications)
  });
   



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
        onClickNoti={onClickNoti}
      />
    </Box>
  )
}
