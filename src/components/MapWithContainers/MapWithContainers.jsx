import {
  APIProvider, Map,
  useMap
} from '@vis.gl/react-google-maps';
import {
  useEffect
} from 'react';
import {
  polygonConfig, polylineConfig
} from '../AreaDrawingMap/drawAreas';
import {
  completePath
} from '../../reducers/drawReducer';
import {
  decodePolyline
} from '../../utils/decodePolyline';

export const MapWithContainers = ({
  apiKey, zoom, centerPosition, containers, routes, route, areas
}) => {

  return (
    <APIProvider
      apiKey={apiKey}
    >
      <DrawOptionals
        routes={routes}
        route={route}
        areas={areas}
      />
      <Map
        defaultZoom={zoom}
        defaultCenter={centerPosition}
        mapId='658a52589c7a963'
        streetViewControl={false}
        mapTypeControl={false}
        zoomControl={false}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        id='garbi-home-map'
        style={{
          outline: 'none',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        {containers}
      </Map>
    </APIProvider>
  );
};

const DrawOptionals = ({
  routes, areas, route
}) => {
  const map = useMap('garbi-home-map')

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
  }, [routes])

  useEffect(() => {
    if (route == null || map == null) return;

    const pathCoordinates = decodePolyline(route.overview_polyline)

    const polyline = new window.google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#2196F3',
      strokeOpacity: 0.8,
      strokeWeight: 5,
      zIndex: 10,
      map: map
    });

    return () => {
      polyline.setMap(null)
    }
  }, [route])

  useEffect(() => {
    if (areas == null || map == null) return;

    const newPolygons = [];
    const newPolylines = [];


    areas.forEach(area => {
      const path = completePath(
        area.coordinates.map(
          c => new google.maps.LatLng(c)
        )
      )

      const polygon = new google.maps.Polygon({
        paths: path,
        editable: false,
        fillColor: area.color ? area.color : 'a0e58c',
        ...polygonConfig,
        map
      });
      newPolygons.push(polygon);

      const polyline = new google.maps.Polyline({
        path: path,
        strokeColor: area.color ? area.color : 'a0e58c',
        editable: false,
        ...polylineConfig,
        map
      });
      newPolylines.push(polyline);
    })

    return () => {
      newPolygons.forEach(polygon => polygon.setMap(null)); // Eliminar polígonos del mapa
      newPolylines.forEach(polyline => polyline.setMap(null));
    };
  }, [areas, map])
}

