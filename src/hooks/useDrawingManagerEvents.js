import {
  useEffect
} from 'react';
import {
  DrawingActionKind
} from '../components/UndoRedoControl/reducer';
import {
  DrawingActionType
} from '../reducers/drawReducer';


export function useDrawingManagerEvents(drawingManager, dispatch, dispatchDraw, state, areaSelected, setAreaSelected) {
  useEffect(() => {
    if (!drawingManager) return;

    const eventListeners = [];

    const addUpdateListener = (eventName, overlay) => {
      const updateListener = google.maps.event.addListener(
        overlay.polyline,
        eventName,
        () => {
          dispatch({
            type: DrawingActionKind.UPDATE_DRAW_OVERLAY,
            payload: {
              id: overlay.id
            }
          });
        }
      );

      eventListeners.push(updateListener);
    };

    const addUpdateListenerOverlay = (eventName, drawResult) => {
      const updateListener = google.maps.event.addListener(
        drawResult.overlay,
        eventName,
        () => {
          dispatchDraw({
            type: DrawingActionType.UPDATE_DRAW
          });
        }
      );
      eventListeners.push(updateListener);
    };

    const addClickListener = (overlay) => {
      const clickListener = google.maps.event.addListener(
        overlay.polygon,
        'click',
        () => {
          setAreaSelected(prev => prev && prev.id === overlay.id ? null : overlay);
        }
      );

      eventListeners.push(clickListener);
    };

    // drawed overlays
    state.forEach(overlay => {
      ['mouseup'].forEach(eventName =>
        addUpdateListener(eventName, overlay)
      );
      addClickListener(overlay);
    });

    // for new overlays
    const overlayCompleteListener = google.maps.event.addListener(
      drawingManager,
      'overlaycomplete',
      (drawResult) => {
        if (google.maps.drawing.OverlayType.POLYLINE) {
          ['mouseup'].forEach(eventName =>
            addUpdateListenerOverlay(eventName, drawResult)
          );
        }
        drawingManager.setDrawingMode(null)
        dispatchDraw({
          type: DrawingActionType.SET_DRAW,
          payload: drawResult
        });

      }
    );

    eventListeners.push(overlayCompleteListener);

    return () => {
      eventListeners?.forEach(listener =>
        google.maps.event.removeListener(listener)
      );
    };
  }, [dispatch, drawingManager, state]);
}