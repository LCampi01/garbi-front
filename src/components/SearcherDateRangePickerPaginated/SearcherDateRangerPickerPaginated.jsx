
import {
  Box, Button 
} from '@mui/material'
import {
  Searcher 
} from '../Seacher/Searcher'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  DateRangePicker 
} from '../DateRangePicker';

export const SearcherDateRangerPickerPaginated = ({
  prevFetch, nextFetch, disabledPrevBtn, disabledNextBtn, placeholderInput = 'Buscar por ID, Título'
}) => {
  return (
    <Box
      sx={{
        height: '4.5rem',
        width: 1,
        padding: '1rem 0rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Searcher
        placeholderInput={placeholderInput}
      />
      <Box
        sx={{
          display: 'flex'
        }}
      >
        <Box
          sx={{
            mr: 2,
            '& .MuiButtonBase-root': {
              minWidth: 'unset'
            }
          }}
        >
          <Button
            disabled={disabledPrevBtn}
            onClick={prevFetch}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            disabled={disabledNextBtn}
            onClick={nextFetch}
          >
            <ChevronRightIcon />
          </Button>
        </Box>
        <DateRangePicker />
      </Box>
    </Box>
  )
}
