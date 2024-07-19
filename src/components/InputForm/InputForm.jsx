import {
  FormControl, TextField 
} from '@mui/material';
import {
  Controller 
} from 'react-hook-form';

export const InputForm = ({
  name,
  label,
  control,
  errors,
  variant = 'outlined',
  size = 'small',
  helperText = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      render={({
        field,
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
          />
        </FormControl>
      )}
    />
  );
};
