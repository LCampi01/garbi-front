import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import {
  AvatarWithTooltip
} from '../../components/AvatarWithTooltip';
import {
  ReportStatusSelect
} from '../../components/ReportStatusSelect';
import {
  useState
} from 'react';
import { 
  useNavigate 
} from 'react-router-dom';

export const ReportTable = ({
  data: initialReports
}) => {
  const navigate = useNavigate()
  const [reports, setReports] = useState(initialReports);

  const handleUpdateAvatar = (reportId, user) => {
    const newReports = [...reports];
    const reportIndex = newReports.findIndex(report => report.id === reportId);
    
    newReports[reportIndex] = {
      ...newReports[reportIndex],
      assignedManagerName: `${user.name} ${user.surname}`,
      assignedManagerPhoto: user.profilePicture
    };
    
    setReports(newReports);
  };
  
  const handleRowClick = (id) => {
    navigate(`/reportes/${id}`)
  }

  if(reports.length == 0) {
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
          No se creó ningún reporte en el rango de fechas seleccionado
        </Typography>
      </Box>
    )
  }
  
  return (
    <Table
      sx={{
        minWidth: 650,
      }}
      aria-label='simple table'
    >
      <TableBody>
        {reports.map((row) => (
          <TableRow
            key={row.id}
            onClick={() => handleRowClick(row.id)}
            sx={{
              cursor: 'pointer' 
            }}
          >
            <TableCell
              sx={{
                width: '1%',
                padding: '16px'
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '21px',
                    textAlign: 'left',
                    color: '#00000099',
                  }}
                >
                  {row.date}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '21px',
                    textAlign: 'left',
                    color: '#00000099',
                  }}
                >
                  {row.time}
                </Typography>
              </Box>
            </TableCell>
            <TableCell
              align='left'
              sx={{
                minWidth: 240,
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  textAlign: 'left',
                  color: '#00000099',
                }}
              >
                {row.typeOfUser} | #{row.id}
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  textAlign: 'left',
                  color: '#000000DE',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
              >
                {row.description}
              </Typography>
            </TableCell>
            <TableCell
              align='right'
              sx={{
                width: '1%',
              }}
            >
              <Chip
                size='small'
                label={row.reportType}
                variant='outlined'
              />
            </TableCell>
            <TableCell
              align='right'
              sx={{
                width: 176
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  lineHeight: '24px',
                  color: '#00000099',
                }}
              >
                {row.place}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: '21px',
                  color: '#00000099',
                }}
              >
                {row.area}
              </Typography>
            </TableCell>
            <TableCell
              align='center'
              onClick={(event) => event.stopPropagation()}
              sx={{
                width: 192,
                paddingX: '24px'
              }}
            >
              <ReportStatusSelect
                reportId={row.id}
                reportState={row.state}
                onAvatarUpdate={handleUpdateAvatar}
              />
            </TableCell>
            <TableCell
              align='center'
              sx={{
                width: 88,
                paddingLeft: '16px'
              }}
            >
              <AvatarWithTooltip
                name={row.assignedManagerName}
                profilePicture={row.assignedManagerPhoto}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
