import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import {
  Divider 
} from '@mui/material';
import {
  Box
} from '@mui/system';
import {
  ReportDetailStateFlow 
} from '../../components/ReportDetailStateFlow/ReportDetailStateFlow';
import {
  ReportDetails
} from '../ReportDetails/ReportDetails';
import {
  ReportDetailsDescriptionContent 
} from './ReportDetailsDescriptionContent';
import {
  ReportDetailsDescriptionHeader 
} from './ReportDetailsDescriptionHeader';
import {
  ReportDetailsTitle
} from './ReportDetailsTitle';

const defaultContent = [
  {
    icon: <CalendarMonthIcon
      sx={{
        color: '#2121213B'
      }}
    />,
    title: 'Fecha de creación',
    description: '19/02/2024 - 09.20 hs'
  },
  {
    icon: <PersonOutlineOutlinedIcon
      sx={{
        color: '#2121213B'
      }}
    />,
    title: 'Reportado por',
    description: 'Ciudadano'
  },
  {
    icon: <RoomOutlinedIcon
      sx={{
        color: '#2121213B'
      }}
    />,
    titleIcon: <OpenInNewOutlinedIcon
      sx={{
        width: '20px',
        height: '20px',
        marginLeft: '5px'
      }}
    />,
    title: 'Ubicación',
    description: 'Villa del Parque - Área 2',
    description2: 'Av. Honorio Pueyrredón 1234'
  },
  {
    icon: <DeleteOutlineOutlinedIcon
      sx={{
        color: '#2121213B'
      }}
    />,
    title: 'Contenedor',
    description: '#123456',
    button: 'HISTORIAL',
    buttonIcon: <OpenInNewOutlinedIcon
      sx={{
        width: '20px',
        height: '20px',
        marginLeft: '5px'
      }}
    />
  }
]

const usersReport = [
  {
    id: 1,
    user: {
      avatar: 'logo',
      fullName: 'Roberto Sanchez'
    },
    from: 'En revision',
    to: 'Resuelto',
    date: '28/05/2024',
    time: '17.30 hs',
    observation: 'Problema resuelto. La tapa fue arreglada.'
  },
  {
    id: 2,
    user: {
      avatar: 'logo',
      fullName: 'Roberto Sanchez'
    },
    from: 'En revision',
    date: '28/05/2024',
    time: '17.30 hs',
  },
  {
    id: 3,
    user: {
      avatar: 'logo',
      fullName: 'Roberto Sanchez'
    },
    from: 'En revision',
    to: 'Resuelto',
    date: '28/05/2024',
    time: '17.30 hs',
    observation: 'Problema resuelto. La tapa fue arreglada.'
  }
]

export const ReportDetailsPage = ({
  content = defaultContent,
  state = 'NUEVO'
}) => {

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          width: 1,
        }}
      >
        <ReportDetailsTitle
          title='#123456'
        />
      </Box>
      <Divider />
      <Box
        sx={{
          flex: 1,
          padding: '2rem 4rem 0'
        }}
      >
        <Box
          sx={{
            width: 1,
            height: '100%'
          }}
        >
          <Box
            sx={{
              height: 1,
              width: 1,
              display: 'flex'
            }}
          >
            <Box
              sx={{
                height: 1,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                p: '0 24px',
                pb: '1.5rem'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'orange',
                  height: '4rem',
                }}
              >
                <ReportDetailsDescriptionHeader
                  title='Contenedor roto'
                  state='Contenedor en mal estado'
                />
              </Box>
              <Box
                sx={{
                  backgroundColor: 'red',
                  height: '21.875rem',
                  padding: '0 24px',
                  mb: '1.5rem',
                }}
              >
                <ReportDetailsDescriptionContent
                  description='la tapa del contenedor esta rota'
                />
              </Box>
              <Box
                sx={{
                  height: '37.3vh',
                  width: 1
                }}

              >
                <ReportDetailStateFlow
                  users={usersReport}
                />
              </Box>

            </Box>
            <Box
              sx={{
                width: '16rem',
                height: '18.625rem',
              }}
            >
              <ReportDetails
                content={content}  // Pasa el array de objetos tal cual está
                state={state}      // Pasa el estado si es necesario
              />
            </Box>
          </Box>
        </Box>
      </Box >
    </Box >
  );
};