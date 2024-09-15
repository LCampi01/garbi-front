import {
  Snackbar,
  Typography
} from '@mui/material'
import {
  Box
} from '@mui/system'
import {
  RouteOptimalInfo
} from '../RouteOptimalInfo/RouteOptimalInfo'

import {
  useState 
} from 'react'
import {
  useRoutes 
} from '../../api/hooks/useRoutes/useRoutes'

export const RightSidePanelOptimalRouteIinfo = ({
  routeSelected, optimalRoutes, setRouteSelected
}) => {
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const {
    selectOptimalRoute: {
      isLoadingSelectRoute,
      selectOptimalRoute
    }
  } = useRoutes()

  if (!routeSelected) return;

  const onSelectOptimalRoute = async (optimalRouteId) => {
    await selectOptimalRoute(optimalRouteId)
  }


  return (
    <Box
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right' 
        }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message='Ruta óptima enviada'
        key={'optimal route sent'}
      />
      <Typography
        sx={{
          padding: '.5rem 1rem',
          color: '#000',
          fontSize: '1rem',
          fontWeight: 500,
          lineHeight: '160%'
        }}
      >
        Rutas óptimas
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflow: 'auto'
        }}
      >
        <RouteOptimalInfo
          name={'Solo contenedores llenos'}
          color={'#2E7D32'}
          colorNoSelected={'rgba(46, 125, 50, 0.30)'}
          selected={routeSelected.id == optimalRoutes.optimalRouteFull.id}
          onClick={() => setRouteSelected(optimalRoutes.optimalRouteFull)}
          onSendRoute={() => onSelectOptimalRoute(optimalRoutes.optimalRouteFull.id)}
          timeInMinutes={(optimalRoutes.optimalRouteFull.total_duration/60).toFixed(0)}
          distanceInKms={(optimalRoutes.optimalRouteFull.total_distance/1000).toFixed(1)}
        />
        <RouteOptimalInfo
          name={'Contenedores llenos y próximos a llenarse'}
          color={'#EF6C00'}
          colorNoSelected={'rgba(239, 108, 0, 0.30)'}
          selected={routeSelected.id == optimalRoutes.optimalRouteWarningAndFull.id}
          onClick={() => setRouteSelected(optimalRoutes.optimalRouteWarningAndFull)}
          onSendRoute={() => onSelectOptimalRoute(optimalRoutes.optimalRouteWarningAndFull.id)}
          timeInMinutes={(optimalRoutes.optimalRouteWarningAndFull.total_duration/60).toFixed(0)}
          distanceInKms={(optimalRoutes.optimalRouteWarningAndFull.total_distance/1000).toFixed(1)}
        />
        <RouteOptimalInfo
          name={'Solo contenedores llenos'}
          color={'#D32F2F'}
          colorNoSelected={'rgba(211, 47, 47, 0.30)'}
          selected={routeSelected.id == optimalRoutes.optimalRouteAll.id}
          onClick={() => setRouteSelected(optimalRoutes.optimalRouteAll)}
          onSendRoute={() => onSelectOptimalRoute(optimalRoutes.optimalRouteAll.id)}
          timeInMinutes={(optimalRoutes.optimalRouteAll.total_duration/60).toFixed(0)}
          distanceInKms={(optimalRoutes.optimalRouteAll.total_distance/1000).toFixed(1)}
        />
      </Box>
    </Box >
  )
}
