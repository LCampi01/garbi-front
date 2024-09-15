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
import '../DateRangePicker/DateRangePicker.css';
import {
  es 
} from 'date-fns/locale'; 
import {
  subDays 
} from 'date-fns'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export const DatePickerCustom = () => {
  const defaultEndDate = subDays(new Date(), 1);
  const [startDate, setStartDate] = useState(subDays(new Date(), 1));

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
          width: '200px',
          '& .MuiInputBase-input': {
            textAlign: 'center',
          },
        }}
        size='small'
      
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='end'
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
      selected={startDate} 
      onChange={
        (date) => setStartDate(date)
      }
      locale={es}
      customInput={<CustomInput/>}
      dateFormat='dd/MM/yyyy'
      maxDate={defaultEndDate}
      calendarStartDay={7}
    />
  );
};
