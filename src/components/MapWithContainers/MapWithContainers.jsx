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

export const MapWithContainers = ({
  apiKey, zoom, centerPosition, containers, routes, route, areas
}) => {

  return (
    <APIProvider
      apiKey={apiKey}
    >
      <DrawOptionals
        routes={routes}
        route = {route}
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
    if (routes == null || map == null) return;

    const pathCoordinates = decodePolyline(routes.optimalRouteFull.overview_polyline)

    const polyline = new window.google.maps.Polyline({
      path: pathCoordinates,
      geodesic: true,
      strokeColor: '#2196F3',
      strokeOpacity: 0.8,
      strokeWeight: 5,
      map: map
    });
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

    areas.map(area => {
      const path = completePath(
        area.coordinates.map(
          c => new google.maps.LatLng(c)
        )
      )

      new google.maps.Polygon({
        paths: path,
        editable: false,
        fillColor: 'a0e58c',
        ...polygonConfig,
        map
      });
      new google.maps.Polyline({
        path: path,
        strokeColor: 'a0e58c',
        editable: false,
        ...polylineConfig,
        map
      });
    })
  }, [areas])
}

function decodePolyline(encoded) {
  if (!encoded) {
    return [];
  }
  var poly = [];
  var index = 0, len = encoded.length;
  var lat = 0, lng = 0;

  while (index < len) {
    var b, shift = 0, result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
    lat += dlat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charCodeAt(index++) - 63;
      result = result | ((b & 0x1f) << shift);
      shift += 5;
    } while (b >= 0x20);

    var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
    lng += dlng;

    var p = {
      lat: lat / 1e5,
      lng: lng / 1e5,
    };
    poly.push(p);
  }
  return poly;
}