import {
  InputAdornment,
  TextField
} from '@mui/material';
import {
  forwardRef,
  useState
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePicker.css';
import {
  es 
} from 'date-fns/locale'; 
import {
  subDays 
} from 'date-fns'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const DateRangePicker = () => {
  const defaultStartDate = subDays(new Date(), 7);
  const defaultEndDate = subDays(new Date(), 1);
  const [dateRange, setDateRange] = useState([defaultStartDate, defaultEndDate]);
  const [startDate, endDate] = dateRange;

  const CustomInput = forwardRef(
    ({
      value, onClick 
    }, ref) => (
      <TextField
        id='date-picker'
        value={value}
        onClick={onClick}
        variant='outlined'
        ref={ref}
        sx={{
          width: '248px' 
        }}
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
            >
              <CalendarTodayIcon 
                sx={{ 
                  color: '#bdbdbd'
                }} 
              />
            </InputAdornment>
          ),
        }}
      />
    ),
  );

  CustomInput.displayName = 'CustomInput';

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      locale={es}
      customInput={<CustomInput/>}
      dateFormat='dd/MM/yyyy'
      maxDate={defaultEndDate}
      calendarStartDay={7}
    />
  );
};
