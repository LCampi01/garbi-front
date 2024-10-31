import {
  Accordion, AccordionDetails, AccordionSummary, Avatar, Paper, Typography
} from '@mui/material';
import {
  ExpandMore
} from '@mui/icons-material';
import {
  Box
} from '@mui/system';
import Arrow from '/src/assets/Arrow.svg';
import {
  reportStates
} from '../../enums/reportStates';

export const ReportDetailStateFlow = ({
  statusHistory
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        width: 1,
        maxHeight: '100%'
      }}
    >
      <Accordion
        sx = {{
          '& .MuiCollapse-root': {
            maxHeight: '240px',
            overflow: 'auto'
          }
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography>
            Historial de estados del reporte
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              width: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem',
              }}
            >
              {statusHistory.map(u =>
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
                      <Avatar
                        alt={u.user.fullName}
                        src={u.user.avatar || undefined}
                      />
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
                          {`\u00A0 - ${u.date} - ${u.time}`}
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
                        mt: '0.5rem',
                        ml: '3rem'
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
                </Box>
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
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