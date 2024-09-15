import {
  useEffect
} from 'react';

export function useDrawingOverlays(map, state, stateDraw) {
  useEffect(() => {
    if (!map || !state) return;

    state.forEach(area => {
      area.polyline.setMap(map)
      area.polygon.setMap(map)
    })

    return () => {
      state.map(area => {
        area.polyline.setMap(null)
        area.polygon.setMap(null)
      })
    }
  }, [map, state]);

  useEffect(() => {
    if (!map || !stateDraw.polyline) return;

    stateDraw.polyline.setMap(map)
    stateDraw.polygon.setMap(map)

    return () => {
      stateDraw.polyline.setMap(null)
      stateDraw.polygon.setMap(null)
    }
  }, [map, stateDraw]);
}
