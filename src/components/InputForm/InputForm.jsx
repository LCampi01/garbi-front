import {
  FormControl, TextField, Typography 
} from '@mui/material';
import {
  Controller 
} from 'react-hook-form';

export const InputForm = ({
  name,
  label,
  control,
  styleInput,
  errors,
  variant = 'outlined',
  size = 'small',
  helperText = null,
  disabled = false,
  multiline = false,
  rows = 1
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      render={({
        field 
      }) => (
        <FormControl
          size={size}
          fullWidth
        >
          <TextField
            variant={variant}
            size={size}
            fullWidth
            label={label}
            {...field}
            helperText={helperText}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            sx={{
              ...styleInput,
              '& .MuiInputBase-input:-webkit-autofill': { //added this to prevent weird look when the browser autofills the field
                'webkitBoxShadow': '0 0 0 1000px white inset',
                'webkitTextFillColor': 'black',
              }
            }}
          />
          {errors && errors[name] && (
            <Typography
              fontSize={'0.85rem'}
              paddingLeft={1.5}
              color={'red'}
            >
              {errors[name].message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};
