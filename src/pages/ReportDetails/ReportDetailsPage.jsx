import {
  Box 
} from '@mui/system';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  ReportDetails 
} from '../ReportDetails/ReportDetails';

import {
  ReportDetailsDescriptionHeader
} from '../../pages/ReportDetails/ReportDetailsDescriptionHeader';
import {
  ReportDetailsDescriptionContent
} from '../../pages/ReportDetails/ReportDetailsDescriptionContent';


export const ReportDetailsPage = ({
  content = [
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
  ],
  state = 'NUEVO'
}) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          height: '4.5rem',
          width: 1,
          backgroundColor: 'black'
        }}
      />
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'green',
          padding: '2rem 4rem 0'
        }}
      >
        <Box
          sx={{
            width: 1,
            height: '100%',
            backgroundColor: 'aquamarine'
          }}
        >
          <Box
            sx={{
              height: 1,
              width: 1,
              backgroundColor: 'yellowgreen',
              display: 'flex'
            }}
          >
            <Box
              sx={{
                height: 1,
                flex: 1,
                backgroundColor: 'blue',
                display: 'flex',
                flexDirection: 'column',
                pb: '1.5rem'
              }}
            >
              <Box
                sx={{
                  backgroundColor: 'white',
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
                  backgroundColor: 'white',
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
                  flex: 1,
                  backgroundColor: 'white',
                }}
              />
            </Box>
            <Box
              sx={{
                width: '16rem',
                height: '18.625rem',
                backgroundColor: 'white'
              }}
            >
              <ReportDetails
                content={content}  // Pasa el array de objetos tal cual está
                state={state}      // Pasa el estado si es necesario
              />
            </Box>
          </Box>
          <Box>
            {/* {code here....} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
