import {
  Box, Paper
} from '@mui/material';
import {
  ReportDetailsSideComponent
} from '../../components/ReportDetailsSideComponent/ReportDetailsSideComponent';
import {
  ReportStatusSelect
} from '../../components/ReportStatusSelect';

export const ReportDetails = ({
  reportId, content, state, onUpdate
}) => {
  return (
    <Box
      sx={{
        width: '288px'
      }}
    >
      <Box
        sx = {{
          height: '4rem',
          display: 'flex'
        }}
      >
        <ReportStatusSelect
          reportId={reportId}
          reportState={state}
          onUpdate = {onUpdate}
        />
      </Box>
      <Paper
        sx={{
          width: '100%',
          border: '1px solid',
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
