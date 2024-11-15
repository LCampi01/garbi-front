import {
  ControlPosition, Map,
  MapControl
} from '@vis.gl/react-google-maps';
import {
  useEffect
} from 'react';
import {
  PanelControlMap
} from '../PanelControlMap/PanelControlMap';
import {
  useDrawingManager
} from '../../hooks/useDrawingManager';
import ColorPicker from '../ColorPicker/ColorPicker';
import {
  DrawingActionType
} from '../../reducers/drawReducer';

export const AreaDrawingMap = ({
  areas, setAreas, areaActionStates, setOpenDeleteAreaForm, selectedColor, setSelectedColor, areaSelected, setAreaSelected, setIsAddingNewArea, state, dispatch, stateDraw, dispatchDraw
}) => {
  const drawingManager = useDrawingManager('garbi-create-area-map', selectedColor);
  const {
    isAddingArea,
  } = areaActionStates

  useEffect(() => {
    if (drawingManager && selectedColor) {
      drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE)
    }
  }, [selectedColor, drawingManager])

  const position = {
    lat: -34.608901,
    lng: -58.428579,
  };

  useEffect(() => {
    if (areaSelected) {
      dispatchDraw({
        type: DrawingActionType.CLEAR_DRAW
      })

      if (areaSelected.polygon) {
        areaSelected.polygon.setOptions({
          fillOpacity: 0.8,
          fillColor: areaSelected.color
        });
      }
    }
    return () => {
      areaSelected?.polygon?.setOptions({
        fillOpacity: 0.1
      })
      areaSelected?.polyline?.setOptions({
        editable: false
      })
    }
  }, [areaSelected]);

  const onClickColor = (color) => {
    setSelectedColor(color)
    dispatchDraw({
      type: DrawingActionType.UPDATE_COLOR,
      payload: {
        color
      }
    })
  }


  return (
    <>
      <Map
        defaultZoom={14.5}
        defaultCenter={position}
        mapId='658a52589c7a963'
        id='garbi-create-area-map'
        disableDefaultUI
        disableDoubleClickZoom
      >
        {isAddingArea && (<MapControl
          position={ControlPosition.LEFT_TOP}
        >
          <ColorPicker
            onClickColor = {onClickColor}
          />
        </MapControl>)}
        <MapControl
          position={ControlPosition.TOP_RIGHT}
        >
          <PanelControlMap
            areaSelected={areaSelected}
            areaActionStates={areaActionStates}
            dispatchDraw={dispatchDraw}
            areas={areas}
            state={state}
            stateDraw={stateDraw}
            dispatch={dispatch}
            setAreas={setAreas}
            drawingManager={drawingManager}
            setAreaSelected={setAreaSelected}
            onDeleteClick={setOpenDeleteAreaForm}
          />
        </MapControl>
      </Map>

    </>
  )
}
