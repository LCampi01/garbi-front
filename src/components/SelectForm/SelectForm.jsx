import {
  Controller 
} from 'react-hook-form';
import {
  FormControl, Select, MenuItem, Typography, InputLabel 
} from '@mui/material';

export const SelectForm = ({
  name,
  label,
  control,
  errors,
  options,
  required = true,
  size = 'small',
  variant = 'outlined',
  shrink = true,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required
      }}
      defaultValue={''} 
      render={({
        field 
      }) => (
        <FormControl
          size={size}
          fullWidth
        >
          {/* i dont know why i need to put another input label when i use shrink prop */}
          {!shrink ? (
            <InputLabel
              id={name + '-label'}
              shrink={false}
            >
              {label}
            </InputLabel>
          ) : (
            <InputLabel
              id={name + '-label'}
            >{label}</InputLabel>
          )}
          <Select
            size={size}
            fullWidth
            variant={variant}
            label={label}
            {...field}
            defaultValue=''
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
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
