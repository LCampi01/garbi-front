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
  table: Table, fetchData, isLoadingFetchData, mapper, placeHolderInput, inputWidth, datePicker=true
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
  console.log('Data in CommonTableList:', data); // Log para verificar los datos


  return (
    <Box
      sx={{
        padding: '32px',
        width: '100%',
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
            overflow: 'hidden',
            width: '100%'
          }}
        >
          <SearcherDateRangerPickerPaginated
            prevFetch={prevFetch}
            nextFetch={nextFetch}
            disabledNextBtn={disabledNextBtn || isLoadingFetchData}
            disabledPrevBtn={disabledPrevBtn || isLoadingFetchData}
            placeholderInput={placeHolderInput}
            inputWidth={inputWidth}
            datePicker={datePicker}
          />
          <Box
            sx={{
              height: 'calc(100% - 4.5rem)',
              overflow: 'auto',
              width: '100%'
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
