import DeleteIcon from '@mui/icons-material/Delete';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import UpdateIcon from '@mui/icons-material/Update';
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
  useState 
} from 'react';

export const RecommendationsTable = ({
  data 
}) => {

  const [recommendations,setRecommendations] = useState([])

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('/');
    return `${day}/${month}`;
  };


  const handleToggleRead = (id) => {
    setRecommendations(recommendations.map(row =>
      row.id === id ? {
        ...row,
        read: !row.read
      } : row
    ));
  };
    
  const recommendationsInitial = [
    {
      id: 1,
      title: 'Añadir un contenedor',
      subtitle: 'en Hilario Pueyrredón 1234 - Villa Crespo',
      date: '2024/05/20',
      read: false,
      Icon: DeleteIcon
    },
    {
      id: 2,
      title: 'Eliminar un contenedor',
      subtitle: 'en Hilario Pueyrredón 1234 - Villa Crespo',
      date: '2024/05/24',
      read: false,
      Icon: DeleteIcon
    },
    {
      id: 3,
      title: 'Reducir la frecuencia de recolección',
      subtitle: 'en el Área 2 de Villa del Parque',
      date: '2024/06/20',
      read: false,
      Icon: UpdateIcon
    },
    {
      id: 4,
      title: 'Añadir un contenedor',
      subtitle: 'en Hilario Pueyrredón 1234 - Villa Crespo',
      date: '2024/05/29',
      read: true,
      Icon: DeleteIcon
    },
    {
      id: 5,
      title: 'Eliminar un contenedor',
      subtitle: 'en Hilario Pueyrredón 1234 - Villa Crespo',
      date: '2024/07/20',
      read: true,
      Icon: DeleteIcon
    },
    {
      id: 6,
      title: 'Reducir la frecuencia de recolección',
      subtitle: 'en el Área 2 de Villa del Parque',
      date: '2024/06/20',
      read: true,
      Icon: UpdateIcon
    },
  ];

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
          {data.map((row) => (
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
                  {/* {formatDate(row.date)} */}
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
                    onClick={() => handleToggleRead(row.id)}
                  >
                    {row.read ? <MarkunreadOutlinedIcon /> : <DraftsOutlinedIcon />}
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell
                sx={{
                  width: '1%',
                  paddingRight: '32px'
                }}
              >
                <IconButton
                  edge='end'
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Paper>
  )
}
