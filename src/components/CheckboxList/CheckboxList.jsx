import {
  CheckboxControlled 
} from '../CheckboxControlled'
import {
  Box, Typography 
} from '@mui/material'

export const CheckboxList = ({
  control, name, prefix, values 
}) => {
  return (
    <Box
      sx = {{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
        }}
      >
        {name}
      </Typography>
      {
        values.map(
          (value) => (
            <CheckboxControlled
              control={control}
              key={value.value}
              label={value.key}
              name={prefix + '.' + value.value}
            />
          )
        )
      }
    </Box>
  )
}
