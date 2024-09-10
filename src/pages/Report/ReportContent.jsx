import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import {
  ModalReportResolved
} from '../../modales/ModalReportResolved/ModalReportResolved';
import {
  useEffect,
  useState
} from 'react';
import {
  ResolveReportForm
} from '../../forms/ResolveReport/ResolveReportForm';
import {
  ReportStatusSelect
} from '../../components/ReportStatusSelect';
import {
  AvatarWithTooltip
} from '../../components/AvatarWithTooltip';
import profilePicture from '../../assets/profile_picture.jpg';
import {
  useReports 
} from '../../api/hooks/useReports/useReports';
import {
  TimestampUtil 
} from '../../utils/timestampUtil';


const rows = [
  {
    id: 1,
    fecha: '19/02/24',
    hora: '09:20 hs',
    recolector: 'Recolector | #123458',
    descripcion: 'Contenedor roto: no se puede abrir la tapa porque el pedal está roto porque está trabado',
    tipoDeReporte: 'Contenedor en mal estado',
    lugar: 'Villa del Parque',
    area: 'Área 1',
    estado: 'NUEVO',
    creadorNombre: 'Juan Perez',
    creadorFoto: null
  },
  {
    id: 2,
    fecha: '19/02/24',
    hora: '09:20 hs',
    recolector: 'Recolector | #123458',
    descripcion: 'Contenedor roto',
    tipoDeReporte: 'Basura en la calle',
    lugar: 'Villa Pueyrredon',
    area: 'Área 1',
    estado: 'EN REVISION',
    creadorNombre: 'Juan Perez',
    creadorFoto: profilePicture
  },
  {
    id: 3,
    fecha: '19/02/24',
    hora: '09:20 hs',
    recolector: 'Recolector | #123458',
    descripcion: 'Contenedor roto',
    tipoDeReporte: 'Basura en la calle',
    lugar: 'Caballito',
    area: 'Área 1',
    estado: 'RECHAZADO',
    creadorNombre: null,
    creadorFoto: null
  },
  {
    id: 4,
    fecha: '19/02/24',
    hora: '09:20 hs',
    recolector: 'Recolector | #123458',
    descripcion: 'Contenedor roto',
    tipoDeReporte: 'Contenedor en mal estado',
    lugar: 'Villa del Parque',
    area: 'Área 1',
    estado: 'RESUELTO',
    creadorNombre: 'Juan Perez',
    creadorFoto: null
  },
];

const mapper = (reports) => {



  return reports.map(
    r => {
      const {
        date, time 
      } = TimestampUtil.convertToDateAndHour(r.timestamp)
      const state = r.status[r.status.length - 1]

      return {
        id: r.id,
        date: date,
        time: time,
        state: state.status,
        // recolector o ciudadano,
        description: r.description,
        reportType: r.type.replace('_',' '),
        // falta lugar
        // falta area,
        // falta nombre del que report,
        // falta foto
      }
    }
  )
}

export const ReportContent = () => {
  const [openModalReportResolved, setOpenModalReportResolved] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [reports, setReports] = useState([])
  const [modalReportResolvedTitle, setModalReportResolvedTitle] = useState('');
  const [lastKey, setLastKey] = useState(null)
  const {
    fetchReports: {
      fetchReports,
      isLoadingFetchReports
    }
  } = useReports();

  const handleOpenModalReportResolved = (reportId, title) => {
    setSelectedReportId(reportId);
    setModalReportResolvedTitle(title);
    setOpenModalReportResolved(true);
  };
  const handleCloseModalReportResolved = () => setOpenModalReportResolved(false);


  useEffect(() => {
    const asyncFetchReports = async () => {
      try {
        const reportsReponse = await fetchReports();
        console.log('🚀 ~ asyncFetchReports ~ reportsReponse:', reportsReponse)
        const reportsMapped = mapper(reportsReponse.result)

        setReports(reportsMapped)
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    asyncFetchReports();
  }, []);

  return (
    <Box
      sx={{
        padding: '32px',
      }}
    >
      <ModalReportResolved
        title={modalReportResolvedTitle}
        open={openModalReportResolved}
        handleClose={handleCloseModalReportResolved}
        form={<ResolveReportForm
          handleClose={handleCloseModalReportResolved}
          reportId={selectedReportId}
        />}
      />
      <Paper
        sx={{
          width: '100%',
        }}
      >
        <TableContainer
          component={Paper}
        >
          <Table
            sx={{
              minWidth: 650,
            }}
            aria-label='simple table'
          >
            <TableBody >
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
                      handleOpenModalReportResolved={handleOpenModalReportResolved}
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
        </TableContainer>
      </Paper>
    </Box>
  );
};
