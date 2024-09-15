import {
  Box, Divider, Paper, Typography 
} from '@mui/material'
import {
  AvatarFullNameInline 
} from '../AvatarFullNameInline/AvatarFullNameInline'

export const PaperDetailWorkersOnATrip = ({
  workers
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        height: 1,
        p: '1rem',
        display: 'flex'
      }}
    >

      <Box
        sx={{
          pr: '3rem'
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
            mb: '0.5rem'
          }}

        >
          Supervisor
        </Typography>
        {
          workers.supervisores.map(s => (
            <AvatarFullNameInline
              key={s.id}
              avatar={s.avatar}
              fullName={s.fullName}
            />
          ))
        }
      </Box>
      <Divider
        orientation='vertical'
      />
      <Box
        sx={{
          pl: '3rem'
        }}
      >
        <Typography
          align='center'
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '24px',
            mb: '0.5rem'
          }}

        >
          Recolectores
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '.5rem'
          }}
        >
          {
            workers.recoletores.map(r => (
              <AvatarFullNameInline
                key={r.id}
                avatar={r.avatar}
                fullName={r.fullName}
              />
            ))
          }
        </Box>
      </Box>
    </Paper>
  )
}
