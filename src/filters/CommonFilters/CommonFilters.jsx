import {
  Box 
} from '@mui/material';


export const CommonFilters = ({
  filters, control 
}) => {

  return (
    <Box
      sx = {{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}
    >
      {
        filters.map(filter => (
          filter.render({
            filter,
            control
          })
        ))
      }
    </Box>
  )
}
