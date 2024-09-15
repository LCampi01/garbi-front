import {
  Paper 
} from '@mui/material'
import {
  RouteBoxDetail 
} from '../RouteBoxDetail'


export const PaperDetailRoute = ({
  routesDetailArray
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        height: 1
      }}
    >
      {
        routesDetailArray.map(r => (
          <RouteBoxDetail
            key={r.type}
            icon={r.icon}
            title={r.title}
            description={r.description}
          />
        ))
      }
    </Paper>
  )
}
