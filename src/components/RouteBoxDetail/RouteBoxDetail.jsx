import {
  Box, Typography 
} from '@mui/material'

export const RouteBoxDetail = ({
  icon: Icon, title, description, iconColor = '#0000004D'
}) => {
  return (
    <Box
      sx={{
        padding: '1rem',
        display: 'inline-block',
        verticalAlign: 'top'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '.5rem',
          alignItems: 'center'
        }}
      >
        <Icon
          sx={{
            color: iconColor
          }}
        />
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5rem',
            color: '#000000DE'
          }}
        >
          {title}
        </Typography>
      </Box>
      {description && (
        <Box
          sx={{
            pt: '0.5rem',
            pl: '2rem'
          }}
        >
          <Typography
            sx={{
              fontSize: '.875rem',
              fontWeight: 400,
              lineHeight: '1.3125rem',
              whiteSpace: 'pre-line'
            }}
          >
            {description}
          </Typography>
        </Box>)}
    </Box >
  )
}