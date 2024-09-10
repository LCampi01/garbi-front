import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import {
  useState
} from 'react';


const orderOptions = [
  {
    value: 'reciente',
    label: 'Más reciente',
  },
  {
    value: 'antiguo',
    label: 'Más antiguo',
  },
];

export default function RecommendationMainContent() {
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

  const [recommendations, setRecommendations] = useState(recommendationsInitial);
  const [sortOrder, setSortOrder] = useState('reciente');

  const handleChangeOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (sortOrder === 'reciente') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const handleToggleRead = (id) => {
    setRecommendations(recommendations.map(row => 
      row.id === id ? {
        ...row,
        read: !row.read 
      } : row
    ));
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('/');
    return `${day}/${month}`;
  };

  return (
    <Box
      width='100%'
      padding='32px'
      overflow= 'hidden'
    >
      <Box 
        display='flex' 
        justifyContent='flex-end' 
        mb={'16px'}
      >
        <FormControl 
          size='small' 
          variant='outlined'
        >
          <InputLabel 
            id='sort-select-label'
          >
            Ordenar por
          </InputLabel>
          <Select
            labelId='sort-select-label'
            value={sortOrder}
            label='Ordenar por'
            onChange={handleChangeOrder}
          >
            {orderOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <TableContainer
          component={Paper}
        >
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label='simple table'
          >
            <TableBody>
              {sortedRecommendations.map((row) => (
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
                      {formatDate(row.date)}
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={3}
            rowsPerPage={3}
            page={6}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
}
