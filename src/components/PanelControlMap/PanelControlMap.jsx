import {
  Box, Fab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import {
  useEffect, useState
} from 'react';
import {
  useMap
} from '@vis.gl/react-google-maps';
import {
  DrawingActionKind
} from '../UndoRedoControl/reducer';
import {
  useDrawingManagerEvents
} from '../../hooks/useDrawingManagerEvents';
import {
  useDrawingOverlays
} from '../../hooks/useDrawingOverlays';

const areasDefault = [
  {
    id: 1,
    title: 'area 1',
    color: '#006610',
    description: 'triangulo 1',
    path: [
      {
        'lat': -34.592974210775964,
        'lng': -58.53266916503906
      },
      {
        'lat': -34.55254895697824,
        'lng': -58.50897989501953
      },
      {
        'lat': -34.583081734691056,
        'lng': -58.41010294189453
      },
      {
        'lat': -34.592974210775964,
        'lng': -58.53266916503906
      }
    ]
  },
  {
    id: 2,
    title: 'area 2',
    color: '#333',
    description: 'triangulo 2',
    path: [

      {
        'lat': -34.647785430789106,
        'lng': -58.43207559814453
      },
      {
        'lat': -34.60314810025483,
        'lng': -58.370964147949216
      },
      {
        'lat': -34.64241892081793,
        'lng': -58.314315893554685
      },
      {
        'lat': -34.647785430789106,
        'lng': -58.43207559814453
      }
    ]

  }
]

export const PanelControlMap = ({
  areaSelected, onDeleteClick, areaActionStates, areas, setAreas,  dispatchDraw, stateDraw, drawingManager, setAreaSelected, state, dispatch
}) => {
  const map = useMap('garbi-create-area-map');
  const [isEditing, setIsEditing] = useState(false);
  const {
    addingArea,
    enableEditArea,
    editingArea,
    controlCamera,
    enabledAddArea,
    enabledEditArea,
    enabledDeleteArea
  } = areaActionStates


  useEffect(() => {
    dispatch({
      type: DrawingActionKind.INIT_OVERLAYS,
      payload: {
        areas: areasDefault
      }
    });
  }, []);

  useDrawingManagerEvents(drawingManager, dispatch, dispatchDraw, state, areaSelected, setAreaSelected)
  useDrawingOverlays(map, state, stateDraw)

  const handleDelete = () => {
    setAreaSelected(null)
    dispatch({
      type: DrawingActionKind.DELETE_OVERLAY,
      payload: {
        id: areaSelected.id
      }
    })
  }

  const handleSetDrawingMode = (mode) => {
    if (drawingManager) {
      drawingManager.setDrawingMode(mode);
    }
  };

  const handleAddNewArea = () => {
    addingArea()
    handleSetDrawingMode(google.maps.drawing.OverlayType.POLYLINE)
  }

  const handleChangeToControlCamera = () => {
    handleSetDrawingMode(null)
    setAreaSelected(null)
    controlCamera()
  }

  const handleEditArea = () => {
    editingArea()
    areaSelected.polyline.setOptions({
      editable: true
    })
  }

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Fab
        color='secondary'
        aria-label='pan'
        size='small'
        onClick={handleChangeToControlCamera}
      >
        <ControlCameraIcon />
      </Fab>
      <Fab
        color='secondary'
        aria-label='edit'
        size='small'
        disabled={!enabledEditArea}
        onClick={handleEditArea}
      >
        <EditIcon />
      </Fab>
      <Fab
        color='secondary'
        aria-label='edit'
        size='small'
        disabled={!enabledDeleteArea}
        onClick={onDeleteClick}
      >
        <DeleteIcon />
      </Fab>
      <Fab
        color='secondary'
        aria-label='edit'
        size='small'
        disabled={!enabledAddArea}
        onClick={handleAddNewArea}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
