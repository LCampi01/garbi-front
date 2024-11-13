import {
  FormControl, TextField, Typography
} from '@mui/material';
import {
  useEffect, useState 
} from 'react';
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
  type = null,
  rootParent = null,
  helperText = null,
  disabled = false,
  multiline = false,
  rows = 1,
  required = true,
  fullWidth = true
}) => {

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let message;
    if (errors) {
      if (rootParent && errors[rootParent] && errors[rootParent][name.split('.')[1]]) {
        message = errors[rootParent][name.split('.')[1]].message;
      } else if (errors[name]) {
        message = errors[name].message;
      }
    }
    setErrorMessage(message);
  }, [errors, name, rootParent]);

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
            type={type}
            fullWidth
            label={label}
            {...field}
            helperText={helperText}
            disabled={disabled}
            multiline={multiline}
            rows={rows}
            placeholder={placeholder}
            sx={{
              ...styleInput,
              '& .MuiInputBase-input:-webkit-autofill': { //added this to prevent weird look when the browser autofills the field
                'webkitBoxShadow': '0 0 0 1000px white inset',
                'webkitTextFillColor': 'black',
              }
            }}
          />
          {errorMessage && (
            <Typography
              fontSize={'0.85rem'}
              paddingLeft={1.5}
              color={'red'}
            >
              {errorMessage}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};