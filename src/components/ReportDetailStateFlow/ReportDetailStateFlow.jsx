import {
  Avatar, Paper, Typography 
} from '@mui/material';
import {
  Box
} from '@mui/system';
import Arrow from '/src/assets/Arrow.svg';
import {
  reportStates 
} from '../../enums/reportStates';

export const ReportDetailStateFlow = ({
  usersReports 
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        height: 1,
        width: 1,
      }}
    >
      <Box
        sx={{
          height: '2.5rem',
          width: 1,
          padding: '0.5rem 1rem'
        }}
      >
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.5rem',
            color: '#000000DE'
          }}
        >
          Historial de estados del reporte
        </Typography>
      </Box>
      <Box
        sx={{
          width: 1,
          padding: '0.5rem 1rem',
          height: 'calc(100% - 2.5rem - 1rem)'
        }}
      >
        <Box
          sx={{
            height: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
          }}
        >
          {usersReports.map(u =>
            <Box
              key={u.id}
              sx={{
                width: 1,
                p: '0.5rem .75rem'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    pr: '0.5rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Avatar>
                    {u.user.fullName[0]}
                  </Avatar>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      mb: '0.5rem'
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        lineHeight: '1.66rem'
                      }}
                    >
                      {u.user.fullName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        fontWeight: 200,
                        lineHeight: '1.66rem'
                      }}
                    >
                      {'- ' + u.date + ' - ' + u.time}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex'
                    }}
                  >
                    <StateRectangle
                      state={u.from}
                    />
                    {u.to && (
                      <>
                        <Box
                          sx={{
                            mx: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={Arrow}
                            alt='Arrow'
                            style={{
                              height: '24px',
                              maxWidth: '1.8125rem' 
                            }}
                          />
                        </Box>
                        <StateRectangle
                          state={u.to}
                        />
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
              {u.observation && (
                <Box
                  sx={{
                    display: 'flex',
                    mt: '0.5rem'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      lineHeight: '1.66rem',
                      letterSpacing: '.025rem'
                    }}
                  >
                    Observación: &nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: '1.66rem',
                      letterSpacing: '.025rem'
                    }}
                  >
                    {u.observation}
                  </Typography>
                </Box>
              )}
            </Box>)}

        </Box>
      </Box>

    </Paper>
  )
}

const StateRectangle = ({
  state 
}) => {
  return <Box
    sx={{
      p: '.25rem .625rem',
      border: '1px solid ' + reportStates[state.toUpperCase()].color,
      borderRadius: '4px'
    }}
  >
    <Typography
      sx={{
        fontSize: '.8125rem',
        fontWeight: 500,
        lineHeight: '1.375rem',
        textTransform: 'uppercase',
        color: reportStates[state.toUpperCase()].colorText
      }}
    >
      {reportStates[state.toUpperCase()].text}
    </Typography>
  </Box>
}