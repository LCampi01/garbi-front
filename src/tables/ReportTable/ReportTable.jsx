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


export const ReportTable = ({
  data: reports
}) => {
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
                {row.typeOfUser}
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
              sx={{
                width: 192,
                paddingX: '24px'
              }}
            >
              <ReportStatusSelect
                reportId={row.id}
                reportState={row.state}
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
                name={row.creatorName}
                profilePicture={row.creatorPhoto}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
