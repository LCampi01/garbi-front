import {
  AvatarGroup,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import {
  useEffect, useState 
} from 'react';
import {
  useRoutes 
} from '../../../api/hooks/useRoutes/useRoutes';
import {
  AvatarWithTooltip 
} from '../../../components/AvatarWithTooltip';
import {
  SearcherAndDatePicker
} from '../../../components/SearcherAndDatePicker';
import profilePicture from '../../../assets/profile_picture.jpg';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  TimestampUtil 
} from '../../../utils/timestampUtil';


const mapper = (routes) => {
  return routes
    .filter(r => r.status.some(statusItem => statusItem.status === 'FINISHED')) //Excluye recorridos in progress, pq esta pantalla solo muestra los terminados.
    .filter(r => r.status.some(statusItem => statusItem.status === 'STARTED')) //el BE tiene rutas sin STARTED asiq pongo esto asi no se ve feo en una demo. TODO: borrar esta linea.
    .map(r => {
      const {
        date: date 
      } = TimestampUtil.convertToDateAndHour(r.timestamp)

      const totalMinutes = Math.round(r.directions.total_duration / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      let duration;
      if (hours > 0 && minutes != 0) {
        duration = `${hours} hr  ${minutes} min`;
      } else if (minutes == 0) {
        duration = `${hours} hr`;
      } else {
        duration = `${minutes} min`;
      }

      const startedStatus = r.status.find(statusItem => statusItem.status === 'STARTED');
      const startedTimestamp = startedStatus.timestamp;
      const {
        time: startTime 
      } = TimestampUtil.convertToDateAndHour(startedTimestamp);

      const finishedStatus = r.status.find(statusItem => statusItem.status === 'FINISHED');
      const finishedTimestamp = finishedStatus.timestamp;
      const {
        time: endTime 
      } = TimestampUtil.convertToDateAndHour(finishedTimestamp);


      return {
        id: r.id.slice(-6),
        date: date,
        area: 'Área 1', // falta recibir nombre de area del BE.
        duration: duration,
        startTime: startTime,
        endTime: endTime,
        manager: 'Hernan Ramirez', //falta recibir bien del BE supervisor y recolectores. ahora es cualquier cosa.
        manager_picture: profilePicture,
        collector1: 'Pepe Pepin',
        collector1_picture: null,
        collector2: 'Roberto Roberti',
        collector2_picture: null
      }
    }
    )
}

export default function RouteMainContent() {
  const {
    fetchRoutes: {
      fetchRoutes: fetchRoutes,
      isLoadingFetchRoutes : isLoadingFetchRoutes
    },
  } = useRoutes();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const asyncFetchRoutes = async () => {
      try {
        const routesReponse = await fetchRoutes();
        console.log('🚀 ~ asyncFetchRoutes ~ routesReponse:', routesReponse)
        const routesMapped = mapper(routesReponse.result)

        setRoutes(routesMapped)
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    asyncFetchRoutes();
  }, []);
  
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:900px)');

  return (
    <Box
      width='100%'
      padding='32px'
      overflow= 'hidden'
    >
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <SearcherAndDatePicker
          placeholderInput={'Buscar por Recolector o Supervisor'}
          inputWidth={'20rem'}
        />
        <TableContainer
          component={Paper}
        >
          {isLoadingFetchRoutes ? (
            <Box
              sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#13422c',
              }}
            >
              <CircularProgress
                color='inherit'
              />
            </Box>
          ) : (
            <Table
              aria-label='simple table'
            >
              <TableBody>
                {routes.map((row) => (
                  <TableRow
                    key={row.id}
                  >
                    <TableCell 
                      align='left'
                      sx={{
                        width: '1%',
                        padding: '16px' 
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#616161',
                        }}
                      >
                        {row.date}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='left'
                      sx={{
                        minWidth: 240
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '16px',
                          color: '#212121',
                        }}
                      >
                        {row.area}
                        <Typography
                          component='span'
                          sx={{
                            fontSize: '14px',
                            color: '#616161',
                            marginLeft: '16px'
                          }}
                        >
                          #{row.id}
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{
                        minWidth: 160,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '16px',
                          color: '#212121',
                        }}
                      >
                        {row.duration}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color: '#616161',
                        }}
                      >
                        {row.startTime} - {row.endTime}
                      </Typography>
                    </TableCell>
                    {isMediumScreen && (
                      <>
                        <TableCell
                          align='center'
                          sx={{
                            width: '1%',
                            paddingRight: '0px',
                            paddingLeft: '48px'
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '16px',
                              color: '#616161',
                            }}
                          >
                            Supervisor
                          </Typography>
                        </TableCell>
                        <TableCell
                          align='center'
                          sx={{
                            width: '1%',
                            paddingLeft: '8px'
                          }}
                        >
                          <AvatarWithTooltip
                            name={row.manager}
                            profilePicture={row.manager_picture}
                          />
                        </TableCell>
                      </>
                    )}
                    {isLargeScreen && (
                      <>
                        <TableCell
                          align='right'
                          sx={{
                            width: '1%',
                            paddingRight: '0px',
                            paddingLeft: '16px'
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: '16px',
                              color: '#616161',
                            }}
                          >
                            Recolectores
                          </Typography>
                        </TableCell>
                        <TableCell
                          align='right'
                          sx={{
                            width: '1%',
                            paddingLeft: '8px',
                          }}
                        >
                          <AvatarGroup
                            max={2}
                          >
                            <AvatarWithTooltip
                              name={row.collector1}
                              profilePicture={row.collector1_picture}
                            />
                            <AvatarWithTooltip
                              name={row.collector2}
                              profilePicture={row.collector2_picture}
                            />
                          </AvatarGroup>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
