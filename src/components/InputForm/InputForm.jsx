import {
  FormControl,
  TextField,
  Typography
} from '@mui/material';
import {
  Controller
} from 'react-hook-form';

export const InputForm = ({
  name,
  label,
  control,
  errors,
  styleInput,
  placeholder,
  variant = 'outlined',
  size = 'small',
  helperText = null,
  disabled = false,
  multiline = false,
  rows = 1,
  required = true,
  fullWidth = true,
  type = 'text', 
  InputProps 
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required,
      }}
      defaultValue={''}
      render={({
        field 
      }) => (
        <FormControl
          size={size}
          fullWidth={fullWidth}
        >
          <TextField
            variant={variant}
            size={size}
            fullWidth
            label={label}
            type={type} 
            {...field}
            helperText={helperText}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            placeholder={placeholder}
            InputProps={InputProps}
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
