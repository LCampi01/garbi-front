import {
  AvatarGroup,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {
  AvatarWithTooltip 
} from '../../components/AvatarWithTooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { 
  useNavigate 
} from 'react-router-dom';


export const RoutesTable = ({
  data: routes
}) => {
  const navigate = useNavigate()
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:900px)');

  const handleRowClick = (id) => {
    navigate(`/recorridos/${id}`)
  }

  if(routes.length == 0) {
    return(
      <Box
        sx = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '30%',
        }}
      >
        <Typography
          sx={{
            fontSize: '1.2rem',
            fontWeight: 400,
          }}
        >
          No hay rutas disponibles para la fecha seleccionada.
        </Typography>
      </Box>
    )
  }

  return (
    <Table
      aria-label='simple table'
    >
      <TableBody>
        {routes.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => handleRowClick(row.id)}
            sx={{
              cursor: 'pointer' 
            }}
          >
            <TableCell 
              align='left'
              sx={{
                width: '1%',
                padding: '16px' 
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#616161',
                }}
              >
                {row.date}
              </Typography>
            </TableCell>
            <TableCell
              align='left'
              sx={{
                minWidth: 240
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#212121',
                }}
              >
                {row.area}
                <Typography
                  component='span'
                  sx={{
                    fontSize: '14px',
                    color: '#616161',
                    marginLeft: '16px'
                  }}
                >
                  #{row.id.slice(-6)}
                </Typography>
              </Typography>
            </TableCell>
            <TableCell
              align='right'
              sx={{
                minWidth: 160,
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#212121',
                }}
              >
                {row.duration}
              </Typography>

              {row.startTime && (
                <Typography
                  sx={{
                    fontSize: '14px',
                    color: '#616161',
                  }}
                >
                  {row.startTime}{row.endTime}
                </Typography>
              )}
            </TableCell>
            {isMediumScreen && (
              <>
                <TableCell
                  align='center'
                  sx={{
                    width: '1%',
                    paddingRight: '0px',
                    paddingLeft: '48px'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: '#616161',
                    }}
                  >
                    Supervisor
                  </Typography>
                </TableCell>
                <TableCell
                  align='center'
                  sx={{
                    width: '1%',
                    paddingLeft: '8px'
                  }}
                >
                  <AvatarWithTooltip
                    name={row.manager}
                    profilePicture={row.manager_picture}
                  />
                </TableCell>
              </>
            )}
            {isLargeScreen && (
              <>
                <TableCell
                  align='right'
                  sx={{
                    width: '1%',
                    paddingRight: '0px',
                    paddingLeft: '16px'
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '16px',
                      color: '#616161',
                    }}
                  >
                    Recolectores
                  </Typography>
                </TableCell>
                <TableCell
                  align='right'
                  sx={{
                    width: '1%',
                    paddingLeft: '8px',
                  }}
                >
                  <AvatarGroup
                    max={2}
                  >
                    <AvatarWithTooltip
                      name={row.collector1}
                      profilePicture={row.collector1_picture}
                    />
                    <AvatarWithTooltip
                      name={row.collector2}
                      profilePicture={row.collector2_picture}
                    />
                  </AvatarGroup>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}