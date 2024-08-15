import {
  Box, Paper, Button 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  ReportDetailsSideComponent 
} from '../../components/ReportDetailsSideComponent/ReportDetailsSideComponent';


const colors = {
  NEW: '#EF6C0080',
  REVIEW: '#2196F3',
  SOLVED: '#2E7D3280',
};

const getColor = (state) => {
  if (state === 'NUEVO') {
    return colors.NEW;
  } else if (state === 'EN REVISIÓN') {
    return colors.REVIEW;
  } else {
    return colors.SOLVED;
  }
};

export const ReportDetails = ({
  content, state 
}) => {
  return (
    <Box
      sx={{
        width: '100%' 
      }}
    >
      <Button
        variant='outlined'
        color='warning'
        size='small'
        sx={{
          color: getColor(state),
          width: '100%',
          height: '30px',
          padding: '4px 10px',
          border: '1px solid',
        }}
      >
        {state}
        <ExpandMoreIcon
          sx={{
            color: getColor(state),
          }}
        />
      </Button>

      <Paper
        sx={{
          width: '100%',
          gap: '48px',
          border: '1px solid',
          marginTop: '10px',
          borderColor: '#0000001F',
        }}
      >
        {content.map((item, index) => (
          <ReportDetailsSideComponent
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            titleIcon={item.titleIcon}
            description2={item.description2}
            button={item.button}
            buttonIcon={item.buttonIcon}
          />
        ))}
      </Paper>
    </Box>
  );
};
