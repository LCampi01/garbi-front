import {
  useState 
} from 'react';
import {
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  styled 
} from '@mui/system';
import {
  reportStates 
} from '../../enums/reportStates';

const SmallKeyboardArrowDownIcon = (color) =>
  styled(KeyboardArrowDownIcon)(({
    _ 
  }) => ({
    fontSize: '16px',
    color: color + '!important',
  }));

export const ReportStatusSelect = ({
  reportId, reportState, handleOpenModalReportResolved 
}) => {
  const [selectedValue, setSelectedValue] = useState(reportState);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    if (newValue === reportStates.RECHAZADO.text) {
      handleOpenModalReportResolved(reportId, 'Cambiar a Rechazado');
    } else if (newValue === reportStates.RESUELTO.text) {
      handleOpenModalReportResolved(reportId, 'Cambiar a Resuelto');
    }
  };

  return (
    <FormControl
      size='small'
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        '& .MuiOutlinedInput-root': {
          '& .MuiSvgIcon-root': {
            right: '20px',
          },
          '& fieldset': {
            borderColor: reportStates[selectedValue].color,
          },
          '&:hover fieldset': {
            borderColor: reportStates[selectedValue].color,
          },
          '&.Mui-focused fieldset': {
            borderColor: reportStates[selectedValue].color,
          },
        },
      }}
    >
      <Select
        value={selectedValue}
        onChange={handleChange}
        IconComponent={SmallKeyboardArrowDownIcon(reportStates[selectedValue].colorText)}
        sx={{
          height: '30px',
          color: reportStates[selectedValue].colorText,
          fontSize: '13px',
          fontWeight: 500,
          lineHeight: '22px',
        }}
      >
        <MenuItem 
          value='NUEVO'
          sx={{
            color: selectedValue === reportStates.NUEVO.text ? reportStates['NUEVO'].colorText : 'inherit',
          }}
        >
          NUEVO
        </MenuItem>
        <MenuItem
          value='EN REVISION'
          sx={{
            color: selectedValue === reportStates['EN REVISION'].text ? reportStates['EN REVISION'].colorText : 'inherit',
          }}
        >
          EN REVISIÓN
        </MenuItem>
        <MenuItem
          value='RECHAZADO'
          sx={{
            color: selectedValue === reportStates.RECHAZADO.text ? reportStates['RECHAZADO'].colorText : 'inherit',
          }}
        >
          RECHAZADO
        </MenuItem>
        <MenuItem
          value='RESUELTO'
          sx={{
            color: selectedValue === reportStates.RESUELTO.text ? reportStates['RESUELTO'].colorText : 'inherit',
          }}
        >
          RESUELTO
        </MenuItem>
      </Select>
    </FormControl>
  );
};