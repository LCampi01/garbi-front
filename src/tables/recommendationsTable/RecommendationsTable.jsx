import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import {
  useEffect,
  useState 
} from 'react';
import {
  TimestampUtil
} from '../../utils/timestampUtil';
import {
  useNotifications 
} from '../../api/hooks/useNotifications/useNotifications';

export const RecommendationsTable = ({
  data 
}) => {

  const [recommendations,setRecommendations] = useState([])

  const {
    updateNotification: {
      updateNotification
    }
  } = useNotifications();

  const handleToggleRead = (r) => {
    updateNotification(r.id, !r.read)
    
    setRecommendations(recommendations.map(row =>
      row.id === r.id ? {
        ...row,
        read: !row.read
      } : row
    ));
  };
    
  useEffect(() => {
    setRecommendations(data)
  }, [data])

  return (
    <Paper
      sx={{
        width: '100%',
      }}
    >
      <Table
        sx={{
          minWidth: 650,
        }}
        aria-label='simple table'
      >
        <TableBody>
          {recommendations.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                backgroundColor: row.read ? '#F5F5F5' : 'inherit',
                transition: 'box-shadow 0.1s ease, z-index 0.1s ease',
                position: 'relative',
                zIndex: 1,
                '&:hover': {
                  boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.3)',
                  zIndex: 10,
                  cursor: 'pointer'
                }
              }}
            >
              <TableCell
                sx={{
                  width: '1%',
                  paddingRight: '8px'
                }}
              >
                <Box>
                  <Avatar>
                    <row.Icon />
                  </Avatar>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  width: 'auto'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    color: '#212121',
                    fontWeight: row.read ? 'normal' : '500'
                  }}
                >
                  {row.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#212121',
                    fontWeight: row.read ? 'normal' : '500'
                  }}
                >
                  {row.subtitle}
                </Typography>
              </TableCell>

              <TableCell
                align='right'
                sx={{
                  width: 80
                }}
              >
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#616161',
                  }}
                >
                  {(() => {
                    const { 
                      date, time 
                    } = TimestampUtil.convertToDateAndHour(row.date)
                    return `${date}`
                  })()}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  width: '1%'
                }}
              >
                <Tooltip
                  title={row.read ? 'Marcar como no leída' : 'Marcar como leída'}
                  arrow
                >
                  <IconButton
                    edge='end'
                    onClick={() => handleToggleRead(row)}
                  >
                    {row.read ? <MarkunreadOutlinedIcon /> : <DraftsOutlinedIcon />}
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Paper>
  )
}
