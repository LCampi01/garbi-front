import CircleIcon from '@mui/icons-material/Circle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Box,
  LinearProgress,
  Paper,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import {
  AdvancedMarker
} from '@vis.gl/react-google-maps';
import {
  MapWithContainers
} from '../../components/MapWithContainers';
import {
  useEffect, useState
} from 'react';
import {
  useContainers
} from '../../api/hooks/useContainers/useContainers';

import './HomeMainContent.css';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import Battery1BarIcon from '@mui/icons-material/Battery1Bar';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import Battery3BarIcon from '@mui/icons-material/Battery3Bar';
import Battery4BarIcon from '@mui/icons-material/Battery4Bar';
import Battery5BarIcon from '@mui/icons-material/Battery5Bar';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import {
  ModalCreateResource
} from '../../modales/ModalCreateResource';
import {
  GenerateOptimalRouteForm
} from '../../forms/GenerateOptimalRoute';
import {
  RightSidePanel 
} from '../../components/RightSidePanel/RightSidePanel';
import {
  RightSidePanelContainerInfo 
} from '../../components/RightSidePanelContainerInfo/RightSidePanelContainerInfo';
import {
  RightSidePanelOptimalRouteIinfo 
} from '../../components/RightSidePanelOptimalRouteInfo';

import SettingsIcon from '@mui/icons-material/Settings';

const icons = [
  Battery0BarIcon,
  Battery1BarIcon,
  Battery2BarIcon,
  Battery3BarIcon,
  Battery4BarIcon,
  Battery5BarIcon,
  Battery6BarIcon,
  BatteryFullIcon,
];

const getBatteryIcon = (battery) => {
  const index = Math.min(Math.floor(battery / 12.5), icons.length - 1);
  const IconComponent = icons[index];
  console.log(100 - battery);
  return (
    <IconComponent
      sx={{
        color: getColorPoint(100 - battery),
      }}
    />
  );
};

const colors = {
  LOW_CAPACITY: '#D32F2F',
  MEDIUM_CAPACITY: '#EF6C00',
  HIGH_CAPACITY: '#2E7D32',
};


const HtmlTooltip = styled(({
  className, ...props
}) => (
  <Tooltip
    {...props}
    classes={{
      popper: className,
    }}
  />
))(({
  theme
}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    padding: 0,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: 'transparent',
  },
}));

const getColorPoint = (capacity) => {
  if (capacity > 75) {
    return colors.LOW_CAPACITY;
  } else if (capacity <= 25) {
    return colors.HIGH_CAPACITY;
  } else {
    return colors.MEDIUM_CAPACITY;
  }
};

export default function HomeMainContent({
  information, settingsEnabled 
}) { 

  const [openGenerateOptimalRouteModal, setOpenGenerateOptimalRouteModal] = useState(false);
  const [openGenerateOptimalRouteRightSideInfo, setOpenGenerateOptimalRouteRightSideInfo] = useState(false);

  const [containers, setContainers] = useState([]);
  const [containerSelected, setContainerSeleted] = useState(null);

  const handleOpenGenerateOptimalRouteModal = () => setOpenGenerateOptimalRouteModal(true);
  const handleCloseOpenGenerateOptimalRouteModal = () => setOpenGenerateOptimalRouteModal(false);
  const handleCloseRightSidePanelContainerInfo = () => setContainerSeleted(null);
  const handleCloseRightSidePanelOptimalRouteInfo = () => setOpenGenerateOptimalRouteRightSideInfo(false);
  const handleOpenRightSidePanelOptimalRouteInfo = () => {
    handleCloseOpenGenerateOptimalRouteModal();
    setOpenGenerateOptimalRouteRightSideInfo(true);
  };

  const position = {
    lat: -34.5893,
    lng: -58.3974,
  };

  const {
    getContainers: {
      getContainers: getContainers
    },
  } = useContainers();

  const apiKeyGoogleMaps = import.meta.env.VITE_REACT_APP_API_KEY_GOOGLE_MAPS;

  const formatContainers = (containers) => {
    return containers.documents.map((container) => {
      if (!container.coordinates) {
        return {
          ...container,
          lat: 0,
          lng: 0,
        };
      }
      return {
        ...container,
        lat: container.coordinates.lat,
        lng: container.coordinates.lng,
      };
    });
  };

  useEffect(() => {
    const retrieveContainers = async () => {
      try {
        const containersUnformated = await getContainers();
        const containersFormated = formatContainers(containersUnformated);
        setContainers(containersFormated);
      } catch (e) {
        console.log(e);
      }
    };

    retrieveContainers();
  }, [getContainers]);

  return (
    <>
      <Box
        width='100%'
        height={'calc(100% - 83px)'}
      >
        <ModalCreateResource
          title={'Generar ruta óptima'}
          open={openGenerateOptimalRouteModal}
          handleClose={handleCloseOpenGenerateOptimalRouteModal}
          form={
            <GenerateOptimalRouteForm
              handleClose={handleCloseOpenGenerateOptimalRouteModal}
              handleOpenRightSideOptimalRouteInfo={handleOpenRightSidePanelOptimalRouteInfo}
            />
          }
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            marginTop: '24px',
            alignItems: 'center',
            gap: '11px',
            pr: '32px',
          }}
        >
          <InfoOutlinedIcon
            sx={{
              color: '#0000008F',
            }}
            width='24px'
            height='24px'
            top='2px'
            left='2px'
          />
          <Button
            width='177px'
            height='26px'
            font='button/large'
            fontFamily='Roboto'
            fontSize='15px'
            variant='contained'
            color='primary'
            size='large'
            sx={{
              backgroundColor: '#12422C',
            }}
            onClick={handleOpenGenerateOptimalRouteModal}
          >
            Generar Ruta Óptima
          </Button>
        </Box>
        <Box
          width='100%'
          sx={{
            height: 'calc(100% - 140px)',
          }}
          padding={'24px 32px 12px'}
          position={'relative'}
          overflow={'hidden'}
        >
          <Box
            width={1}
            height={'110%'}
          >
            <MapWithContainers
              apiKey={apiKeyGoogleMaps}
              zoom={12}
              centerPosition={position}
              containers={containers.map((p) => (
                <Marker
                  setContainerSeleted={setContainerSeleted}
                  key={p._id}
                  point={p}
                />
              ))}
            />
          </Box>
          {containerSelected && (
            <RightSidePanel
              handleClose={handleCloseRightSidePanelContainerInfo}
              componentToRender={
                <RightSidePanelContainerInfo
                  containerSelected={containerSelected}
                  getBatteryIcon={getBatteryIcon}
                />
              }
            />
          )}
          {openGenerateOptimalRouteRightSideInfo && (
            <RightSidePanel
              disablePadding={true}
              handleClose={handleCloseRightSidePanelOptimalRouteInfo}
              componentToRender={<RightSidePanelOptimalRouteIinfo />}
            />
          )}
        </Box>
        <Paper
          elevation={6}
          sx={{
            margin: 'auto',
            marginBottom: '16px',
            width: 'fit-content',
            display: 'flex',
            padding: '9px 16px',
            gap: '32px',
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          {information.map((i, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CircleIcon
                sx={{
                  color: i.color,
                  mr: '16px',
                }}
              />
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  lineHeight: '24px',
                  color: '#000000',
                }}
              >
                {i.valor}
              </Typography>
            </Box>
          ))}
          <Button
            sx={{
              borderRadius: '50%',
              minWidth: '40px',
              width: '40px',
              height: '40px',
            }}
          >
            {settingsEnabled && (
              <SettingsIcon />
            )}
          </Button>
        </Paper>
      </Box>
    </>
  );
}

function Marker({
  point, setContainerSeleted
}) {
  return (
    <AdvancedMarker
      position={point}
      // ref={markerRef}
      onClick={() => setContainerSeleted(point)}
    >
      <HtmlTooltip
        placement='top'
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, -7],
                },
              },
            ],
          },
        }}
        title={
          <Box
            position={'relative'}
          >
            <Box
              width={'88px'}
              height={'42px'}
              sx={{
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <LinearProgress
                variant='determinate'
                value={point.capacity}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getColorPoint(point.capacity),
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '14px',
                    color: 'black',
                    marginTop: '4px',
                  }}
                >
                  {point.capacity}% lleno
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: '14px',
                    color: '#00000061',
                  }}
                >
                  hace 10 mins
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '6px',
                height: '6px',
                backgroundColor: 'white',
                position: 'absolute',
                left: '50%',
                bottom: '-3px',
                transform: 'translateX(-50%) rotate(-45deg)',
              }}
            />
          </Box>
        }
      >
        <div>
          <CircleIcon
            sx={{
              color: getColorPoint(point.capacity),
            }}
          />
        </div>
      </HtmlTooltip>
    </AdvancedMarker>
  );
}
