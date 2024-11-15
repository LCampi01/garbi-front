import {
  Box, Typography 
} from '@mui/material'
import {
  TimestampUtil
} from '../../utils/timestampUtil';


const calculateTimeDifference = (containerSelected) => {
  if(containerSelected.id == 'C9') {
    return '3 hr 20 min'
  }
  if(containerSelected.id == 'Test12') {
    return '4 hr 47 min'
  }
  const updatedAtDate = new Date(containerSelected.updatedAt)
  const now = new Date()
  const diff = now.getTime() - updatedAtDate.getTime()
  const diffInMinutes = Math.floor(diff / (1000 * 60))
  if(diffInMinutes) {
    return `${diffInMinutes} min` 
  } else {
    return '10 min'
  }
}

const formatRecollectionDate = (lastRecollectionTimestamp) => {
  const {
    date, time
  } = TimestampUtil.convertToDateAndHour(lastRecollectionTimestamp, false)

  return `${date} - ${time}`
}

export const RightSidePanelContainerInfo = ({
  containerSelected, getBatteryIcon, company
}) => {

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.60)',
            fontFeatureSettings: '\'clig\' off, \'liga\' off',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '14px',
            letterSpacing: '0.1px',
            mb: 2,
          }}
        >
          ID #{containerSelected.id}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontFamily: 'Roboto',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '32px',
            letterSpacing: '0.1px',
          }}
        >
          {containerSelected.capacity}% lleno
        </Typography>
        <Typography
          sx={{
            color: ' rgba(0, 0, 0, 0.60)',
            fontFeatureSettings: '\'clig\' off, \'liga\' off',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '16px',
            letterSpacing: '0.1px',
            mb: 2,
          }}
        >
          Actualizado hace {calculateTimeDifference(containerSelected)}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontFeatureSettings: '\'clig\' off, \'liga\' off',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '32px',
            letterSpacing: '0.1px',
          }}
        >
          {containerSelected.address.neighborhood} - Área 2
        </Typography>
        <Typography
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            fontFeatureSettings: '\'clig\' off, \'liga\' off',
            fontFamily: 'Roboto',
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '24px',
            letterSpacing: '0.1px',
            mb: 2,
          }}
        >
          {containerSelected.address.street} {containerSelected.address.number}
        </Typography>
        <Box
          display={'flex'}
          mb={2}
        >
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              fontFeatureSettings: '\'clig\' off, \'liga\' off',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '32px',
              letterSpacing: '0.1px',
              mr: 0.4,
            }}
          >
            Última Recolección:{' '}
          </Typography>
          <Typography
            sx={{
              color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
              fontFeatureSettings: '\'clig\' off, \'liga\' off',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '32px',
              letterSpacing: '0.1px',
            }}
          >
            {containerSelected.lastRecollection && formatRecollectionDate(containerSelected.lastRecollection) || '18/11 - 21.35 hs'}
          </Typography>
        </Box>
        <Typography
          sx={{
            color: 'var(--text-primary, rgba(0, 0, 0, 0.87))',
            fontFeatureSettings: '\'clig\' off, \'liga\' off',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 300,
            lineHeight: '32px',
            letterSpacing: '0.1px',
            mb: 2,
          }}
        >
          Contenedor bilateral
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {getBatteryIcon(containerSelected.battery)}
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              fontFeatureSettings: '\'clig\' off, \'liga\' off',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '32px', // 228.571%
              letterSpacing: '0.1px',
              marginRight: '0.5rem',
            }}
          >
            Batería:
          </Typography>
          <Typography
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              fontFeatureSettings: '\'clig\' off, \'liga\' off',
              fontFamily: 'Roboto',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '32px',
              letterSpacing: '0.1px',
              marginRight: '0.5rem',
            }}
          >
            {containerSelected.battery}%
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
