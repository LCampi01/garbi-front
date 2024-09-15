
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl, IconButton, InputAdornment, OutlinedInput 
} from '@mui/material';

export const Searcher = ({
  inputWidth = '350px', placeholderInput
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
              {<SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
