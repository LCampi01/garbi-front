import {
  Box, Divider
} from '@mui/material'
import {
  APIProvider, Map, useMap
} from '@vis.gl/react-google-maps'
import {
  useEffect, useState
} from 'react'
import {
  responseExample
} from './response-example';
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

const routesDetailArray = [
  {
    type: 'calendar',
    icon: CalendarMonthIcon,
    title: '20/02/2024'
  },
  {
    type: 'duration',
    icon: AccessTimeOutlinedIcon,
    title: 'Duración del reccorido: 55min',
    description: 'Inicio: 20.30 hs \n Fin: 21.25 hs'
  },
  {
    type: 'location',
    icon: LocationOnOutlinedIcon,
    title: 'Villa Del Parque',
    description: 'Área 2'
  }
];

const users = {
  supervisores: [
    {
      id: 1,
      avatar: null,
      fullName: 'Oscar Parraguez'
    }
  ],
  recoletores: [
    {
      id: 2,
      avatar: null,
      fullName: 'Octavio Pardo'
    },
    {
      id: 3,
      avatar: null,
      fullName: 'Juan Edison'
    }
  ]
}


export const RouteDetailPage = () => {

  const apiKeyGoogleMaps = import.meta.env.VITE_REACT_APP_API_KEY_GOOGLE_MAPS;
  const position = {
    lat: -34.5893,
    lng: -58.3994,
  };

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
          title={'Recorrido'}
          detail={'#123456'}
        />
      </Box>
      <Divider />
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
              routesDetailArray={routesDetailArray}
            />
            <PaperDetailWorkersOnATrip
              workers={users}
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
              <Map
                defaultZoom={13}
                defaultCenter={position}
                mapId='658a52589c7a963'
                id='garbi-create-area-map'
                disableDefaultUI
                disableDoubleClickZoom
              >
                <Directions />
              </Map>
            </APIProvider>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}

function Directions() {
  const map = useMap();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];

  useEffect(() => {
    if (!map) return;

    drawRoute(responseExample, map);
  }, [map]);

  return (
    <div
      className='directions'
    />
  );
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

function drawRoute(directionResponse, map) {
  if (!directionResponse) return;
  const path = directionResponse.routes[0].overview_path;

  const innerStroke = new google.maps.Polyline({
    path: path,
    strokeColor: STROKE_COLORS.active.innerStroke,
    strokeOpacity: 1.0,
    strokeWeight: 3,
    zIndex: 10
  });

  const outerStroke = new google.maps.Polyline({
    path: path,
    strokeColor: STROKE_COLORS.active.outerStroke,
    strokeOpacity: 1.0,
    strokeWeight: 6,
    zIndex: 1
  });

  innerStroke.setMap(map);
  outerStroke.setMap(map);
}