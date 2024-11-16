import {
  Box, CircularProgress, Divider
} from '@mui/material'
import {
  APIProvider, Map, useMap
} from '@vis.gl/react-google-maps'
import {
  useEffect, useState
} from 'react'


import {
  BreadcrumbsComponent
} from '../../../components/BreadcrumbsComponent/BreadcrumbsComponent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {
  PaperDetailRoute
} from '../../../components/PaperDetailRoute';
import {
  PaperDetailWorkersOnATrip
} from '../../../components/PaperDetailWorkersOnATrip';
import {
  HEIGHT_HEADER
} from '../../../config';
import {
  useParams
} from 'react-router-dom';
import {
  useRoutes
} from '../../../api/hooks/useRoutes/useRoutes';
import {
  TimestampUtil
} from '../../../utils/timestampUtil';
import {
  decodePolyline
} from '../../../utils/decodePolyline';
import {
  useCompanies 
} from '../../../api/hooks/useCompanies/useCompanies';
import {
  PositionMarker 
} from '../../Home/HomeMainContent';


const routeDetailsMapper = (route) => {
  const {
    date, time
  } = TimestampUtil.convertToDateAndHour(route.timestamp)

  let startTime = null;
  let endTime = null;
  let duration = 'Pendiente';

  const startedStatus = route.status.find(statusItem => statusItem.status === 'STARTED');
  const finishedStatus = route.status.find(statusItem => statusItem.status === 'FINISHED');

  const startedTimestamp = startedStatus?.timestamp;
  const {
    time: startedTime
  } = TimestampUtil.convertToDateAndHour(startedTimestamp);
  if (startedTimestamp) { // recorrido empezado. Si no estuviera empezado, queda Pendiente.
    startTime = `Inicio: ${startedTime}`;
  }

  if (finishedStatus) { // recorrido finalizado
    const finishedTimestamp = finishedStatus.timestamp;
    const {
      time: finishedTime
    } = TimestampUtil.convertToDateAndHour(finishedTimestamp);
    endTime = `Fin: ${finishedTime}`;

    const durationUnformatter = TimestampUtil.getDuration(finishedTimestamp, startedTimestamp);
    duration = `Duración: ${TimestampUtil.formatMinutes(durationUnformatter / 1000 / 60)}`
  } else if (startedTimestamp) { // recorridos en curso: empezado pero no finalizado
    duration = 'Recorrido en curso';
    startTime = `Comenzó a las ${startedTime}`;
    endTime = null;
  }

  //agrego esto por si son null estos valores
  let durationDescription = '';
  if (startTime) durationDescription += startTime;
  if (endTime) durationDescription += `\n ${endTime}`;

  const routesDetailArray = [
    {
      type: 'calendar',
      icon: CalendarMonthIcon,
      title: date
    },
    {
      type: 'duration',
      icon: AccessTimeOutlinedIcon,
      title: duration,
      description: durationDescription.trim()
    },
    {
      type: 'location',
      icon: LocationOnOutlinedIcon,
      title: route.area.name
    }
  ]

  return routesDetailArray
}

const workersDetailsMapper = (route) => {

  const workersDetailsArray = {
    supervisores: [
      {
        id: 1,
        avatar: route.managerImage,
        fullName: route.managerName
      }
    ],
    recoletores: [
      {
        id: 2,
        avatar: null,
        fullName: route.collectors[0].name + ' ' + route.collectors[0].surname,
      },
      {
        id: 3,
        avatar: null,
        fullName: route.collectors[1].name + ' ' + route.collectors[1].surname,
      }
    ]
  }

  return workersDetailsArray
}


export const RouteDetailPage = () => {

  const apiKeyGoogleMaps = 'AIzaSyChdsbPNc69MyOgPRQf8o2_5kMUFDx2zMM';
  const position = {
    lat: -34.5893,
    lng: -58.3994,
  };

  const {
    id
  } = useParams()

  const [routeData, setRouteData] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [workersDetails, setWorkersDetails] = useState(null);
  const [company, setCompany] = useState(null);

  const {
    getCompany: {
      getCompany,
      isGetCompanyLoading
    }
  } = useCompanies();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const companyId = user?.companyId;
    if (companyId) {
      getCompany(companyId)
        .then((response) => {
          setCompany(response)
        });
    }
  }, []);

  const {
    fetchRoute: {
      fetchRoute: fetchRoute, isLoadingFetchRoute
    },
  } = useRoutes();

  useEffect(() => {
    const asyncFetchRoute = async () => {
      try {
        const routeReponse = await fetchRoute(id)

        const routeDetailsMapped = routeDetailsMapper(routeReponse)
        setRouteDetails(routeDetailsMapped)
        const workersDetailsMapped = workersDetailsMapper(routeReponse)
        setWorkersDetails(workersDetailsMapped)

        setRouteData(routeReponse)
      } catch (error) {
        console.error('Error fetching route:', error)
      }
    };
    asyncFetchRoute()
  }, [])

  return (
    <Box
      sx={{
        width: '100%',
        height: `calc(100vh - ${HEIGHT_HEADER})`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '4.5rem',
          pl: '4rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <BreadcrumbsComponent
          prefix={'Recorridos'}
          title={`Recorrido #${id.slice(-6)}`}
        />
      </Box>
      <Divider />
      {!routeData ? (
        <Box
          sx={{
            width: 1,
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            padding: '2rem',
            width: 1,
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              width: 1,
              p: '0px 1.5rem 2rem',
            }}
          >
            <Box
              sx={{
                width: 1,
                display: 'flex',
                height: '7rem',
                justifyContent: 'space-between',
              }}
            >
              <PaperDetailRoute
                routesDetailArray={routeDetails}
              />
              <PaperDetailWorkersOnATrip
                workers={workersDetails}
              />
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                height: '110%'
              }}
            >
              <APIProvider
                apiKey={apiKeyGoogleMaps}
              >
                <DrawOptionals
                  routes={routeData.directions.polylines}
                />
                <Map
                  defaultZoom={13}
                  defaultCenter={position}
                  mapId='658a52589c7a963'
                  id='garbi-route-detail'
                  disableDefaultUI
                  disableDoubleClickZoom
                >
                  {company && [
                    <PositionMarker
                      position={company.dump}
                      text='FIN'
                      key={'pt-1'}
                    />,
                    <PositionMarker
                      position={company.truckTerminal}
                      text='INICIO'
                      key={'pt-2'}
                    />
                  ]}
                </Map>
              </APIProvider>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

const DrawOptionals = ({
  routes
}) => {
  const map = useMap('garbi-route-detail')

  useEffect(() => {
    if (routes == null || map == null || routes.length === 0) return;

    const routesPolylines = [];

    routes.forEach(
      r => {
        const pathCoordinates = decodePolyline(r)

        const routePolyline = new window.google.maps.Polyline({
          path: pathCoordinates,
          geodesic: true,
          strokeColor: '#2196F3',
          strokeOpacity: 0.8,
          strokeWeight: 5,
          map
        });

        routesPolylines.push(routePolyline);
      }
    )

    return () => {
      routesPolylines.forEach(
        r => r.setMap(null)
      );
    }
  }, [routes, map])
}

const STROKE_COLORS = {
  active: {
    innerStroke: '#4285F4',
    outerStroke: '#185ABC',
  },
  inactive: {
    innerStroke: '#BDC1C6',
    outerStroke: '#80868B',
  },
};