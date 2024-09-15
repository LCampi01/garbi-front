import {
  Box,
  CircularProgress,
  Paper,
  TableContainer
} from '@mui/material';
import {
  SearcherDateRangerPickerPaginated
} from '../../components/SearcherDateRangePickerPaginated';
import {
  HEIGHT_HEADER_FILTER_SIDE_COMPONENT
} from '../../config';
import {
  usePagination
} from '../../hooks/usePagination';


export const CommonTableList = ({
  table: Table, fetchData, isLoadingFetchData, mapper, placeHolderInput 
}) => {

  const {
    data,
    prevFetch,
    nextFetch,
    disabledPrevBtn,
    disabledNextBtn
  } = usePagination({
    fetch: fetchData,
    mapper
  })

  return (
    <Box
      sx={{
        padding: '32px',
        height: `calc(100% - ${HEIGHT_HEADER_FILTER_SIDE_COMPONENT})`,
      }}
    >
      <Paper
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            paddingX: '1rem',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <SearcherDateRangerPickerPaginated
            prevFetch={prevFetch}
            nextFetch={nextFetch}
            disabledNextBtn={disabledNextBtn}
            disabledPrevBtn={disabledPrevBtn}
            placeholderInput={placeHolderInput}
          />
          <Box
            sx={{
              height: 'calc(100% - 4.5rem)',
              overflow: 'auto'
            }}
          >
            {
              isLoadingFetchData ?
                <Box
                  sx={{
                    width: 1,
                    display: 'flex',
                    p: 2,
                    justifyContent: 'center'
                  }}
                >
                  <CircularProgress />
                </Box>
                :
                <Table
                  data={data}
                />
            }
          </Box>
        </TableContainer>
      </Paper>
    </Box>
  );
}
