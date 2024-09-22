import {
  Checkbox, FormControlLabel 
} from '@mui/material'
import {
  Controller 
} from 'react-hook-form'

export const CheckboxControlled = ({
  control, label, name 
}) => {
  return (
    <FormControlLabel
      label={label}
      sx={{
        padding: '2.5px',
        mr: 0,
        '& .MuiTypography-root': {
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '21px',
        }
      }}
      control={
        <Controller
          name={name}
          control={control}
          defaultValue={false}
          render={({
            field: {
              onChange, value 
            } 
          }) => (
            <Checkbox
              sx={{
                padding: '2.5px',
                mr: 0
              }}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
        />
      }
    />
  )
}
