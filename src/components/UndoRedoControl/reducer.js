import {
  completeEditablePath
} from '../../reducers/drawReducer';
import {
  polygonConfig, polylineConfig
} from '../AreaDrawingMap/drawAreas';

// TODO: MOVER ESTE REDUCER A LA CARPETA DE REDUCERS


export const DrawingActionKind = {
  UPDATE_DRAW_OVERLAY: 'UPDATE_DRAW_OVERLAY',
  UPDATE_OVERLAY: 'UPDATE_OVERLAY',
  CANCEL_OVERLAY: 'CANCEL_OVERLAY',
  INIT_OVERLAYS: 'INIT_OVERLAYS',
  CLICK_OVERLAY: 'CLICK_OVERLAY',
  DELETE_OVERLAY: 'DELETE_OVERLAY',
  ADD_OVERLAY: 'ADD_OVERLAY'
}

function getPathsAsLatLngArray(overlays) {
  return overlays.map(overlay => {
    if (overlay.getPath) {
      return overlay.getPath().getArray()
        .map(latlng => ({
          lat: latlng.lat(),
          lng: latlng.lng()
        }));
    } else {
      return [];
    }
  });
}

function getPathsAsLatLng(overlay) {
  if (overlay.getPath) {
    return overlay
      .getPath()
      .getArray()
      .map(latlng => ({
        lat: latlng.lat(),
        lng: latlng.lng()
      }))
  }
}

export default function reducer(state, action) {

  const searchArea = (id) => state.find(area => area.id === id);

  switch (action.type) {

  case DrawingActionKind.INIT_OVERLAYS: {
    const {
      areas
    } = action.payload;

    // paint
    const overlaysFormated = areas.map(area => {
      const polygon = new google.maps.Polygon({
        paths: area.path,
        ...polygonConfig,
      });
      const polyline = new google.maps.Polyline({
        strokeColor: area.color,
        editable: false,
        ...polylineConfig,
        path: area.path,
      });

      return {
        ...area,
        polyline,
        polygon
      }
    })

    return [...overlaysFormated]
  }

  // This action is called whenever anything changes on any overlay.
  case DrawingActionKind.UPDATE_DRAW_OVERLAY: {
    const {
      id
    } = action.payload;

    const area = state.find(overlay => overlay.id === id);

    completeEditablePath(area.polyline);

    const path = area.polyline.getPath()?.getArray();

    if (path) {
      area.polygon.setPaths(path);
    }

    return [...state];
  }
    
  // This actoins is called for update title or description on any overlay.
  case DrawingActionKind.UPDATE_OVERLAY: {
    const {
      id,
      title,
      description
    } = action.payload

    const area = searchArea(id)

    area.title = title
    area.description = description

    return [...state];
  }

  case DrawingActionKind.DELETE_OVERLAY: {
    const {
      id
    } = action.payload;

    const newState = state.filter(area => area.id != id)

    // TODO LLAMAR AL BE

    return [...newState];
  }

  case DrawingActionKind.ADD_OVERLAY: {
    const {
      id,
      title,
      description,
      polyline,
      color,
      polygon
    } = action.payload;

    polyline.setEditable(false)

    const newArea = {
      id,
      description,
      title,
      path: getPathsAsLatLng(polyline),
      polyline,
      color,
      polygon
    }

    return [...state, newArea]
  }

  // This action is called when the cancel button is clicked.
  case DrawingActionKind.CANCEL_OVERLAY: {
    return {
      polyline: null,
      polygon: null
    }
  }
  }
}

