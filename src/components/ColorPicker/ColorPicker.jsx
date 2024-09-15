import {
  IconButton, Paper 
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

const ColorPicker = ({
  selectedColor, setSelectedColor 
}) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        gap: 0.1,
        p: 1,
        m: 1 
      }}
    >
      {colors.map(color => (
        <IconButton
          key={color}
          onClick={() => setSelectedColor(color)}
          sx={{
            color,
            padding: 0 
          }}
        >
          <CircleIcon
            sx = {{
              fontSize: 30
            }}
          />
        </IconButton>
      ))}
    </Paper>
  );
};

export default ColorPicker;
