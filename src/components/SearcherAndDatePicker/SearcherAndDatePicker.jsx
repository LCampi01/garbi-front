import {
  Box
} from '@mui/material';
import {
  SearchBox
} from '../../components/SearchBox';
import {
  DatePickerCustom
} from '../../components/DatePickerCustom';
import {
  DateRangePicker
} from '../../components/DateRangePicker';

export const SearcherAndDatePicker = ({
  placeholderInput, inputWidth, datePicker=true
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <SearchBox
        placeholderInput= {placeholderInput}
        inputWidth= {inputWidth}
      />

      <Box
        sx={{
          flexShrink: 0 
        }}
      >
        {datePicker ? <DatePickerCustom /> : <DateRangePicker />}
      </Box>
    </Box>
  );
};
