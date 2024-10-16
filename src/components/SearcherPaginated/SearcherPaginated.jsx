import {
  Box, Button
} from '@mui/material'
import {
  Searcher
} from '../Searcher/Searcher'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  SelectOrder 
} from '../SelectOrder/SelectOrder';

export const SearcherPaginated = ({
  prevFetch, nextFetch, disabledPrevBtn, disabledNextBtn,
  placeholderInput = 'Buscar por ID, Título', inputWidth,
  componentToRender,
  onSearcherSubmit,
  handleChangeOrder
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
      {onSearcherSubmit && (<Searcher
        placeholderInput={placeholderInput}
        inputWidth={inputWidth}
        onSearcherSubmit={onSearcherSubmit}
      />)}
      {handleChangeOrder && (
        <SelectOrder
          handleChangeOrder={handleChangeOrder}
        />
      )}
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

        {componentToRender}
      </Box>
    </Box>
  )
}
