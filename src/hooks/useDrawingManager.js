import {
  useMap, useMapsLibrary 
} from '@vis.gl/react-google-maps';
import {
  useEffect, useState 
} from 'react';
import {
  polylineConfig 
} from '../components/AreaDrawingMap/drawAreas';


export const useDrawingManager = (id = null, selectedColor) => {
  const map = useMap(id);
  const drawing = useMapsLibrary('drawing');

  const [drawingManager, setDrawingManager] = useState(null);

  useEffect(() => {
    if (!map || !drawing ) return;

    // https://developers.google.com/maps/documentation/javascript/reference/drawing
    const newDrawingManager = new drawing.DrawingManager({
      map,
      drawingMode: null,
      drawingControl: false,
      drawingControlOptions: {
        drawingModes: [
          google.maps.drawing.OverlayType.POLYLINE,
        ]
      },
      polylineOptions: {
        editable: true,
        draggable: false,
        strokeColor: selectedColor,
        ...polylineConfig
      }
    });

    setDrawingManager(newDrawingManager);

    return () => {
      newDrawingManager.setMap(null);
    };
  }, [drawing, map, selectedColor]);

  return drawingManager;
}