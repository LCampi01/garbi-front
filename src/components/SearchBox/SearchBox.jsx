import {
  FormControl, IconButton, InputAdornment, OutlinedInput 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBox = ({
  placeholderInput, inputWidth 
}) => {
  return (
    <FormControl
      sx={{
        width: inputWidth,
      }}
      variant='outlined'
    >
      <OutlinedInput
        id='outlined-adornment-search'
        size='small'
        placeholder={placeholderInput}
        endAdornment={
          <InputAdornment
            position='end'
          >
            <IconButton
              aria-label='icon search'
              edge='end'
            >
              <SearchIcon 
                sx={{ 
                  color: '#bdbdbd'
                }} 
              />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
