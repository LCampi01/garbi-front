import CircleIcon from '@mui/icons-material/Circle';
import {
  Box,
  CircularProgress,
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
  useState
} from 'react';
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
import {
  useOptimalRoutes
} from '../../api/hooks/useOptimalRoutes/useOptimalRoutes';
import {
  HEIGHT_HEADER_FILTER_SIDE_COMPONENT
} from '../../config';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  ModalAdjustContainersThreshold
} from '../../modales/ModalAdjustContainersThresholds/ModalAdjustContainersThresholds';
import {
  useCompanies
} from '../../api/hooks/useCompanies/useCompanies';
import {
  useEffect
} from 'react';
import {
  getCompanyThresholdInformation 
} from '../../hooks/useGetColorPoint';
import {
  useRoutes 
} from '../../api/hooks/useRoutes/useRoutes';

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

const colors = {
  LOW_CAPACITY: '#2E7D32',
  MEDIUM_CAPACITY: '#EF6C00',
  HIGH_CAPACITY: '#D32F2F',
  DISCONNECTED: '#000000'
};


const getBatteryIcon = (battery) => {
  const index = Math.min(Math.floor(battery / 12.5), icons.length - 1);
  const IconComponent = icons[index];
  console.log(100 - battery);
  return (
    <IconComponent
      sx={{
        color: getColorForBattery(100 - battery),
      }}
    />
  );
};

const getColorForBattery = (battery) => {
  if (battery > 75) {
    return colors.HIGH_CAPACITY;
  } else if (battery <= 25) {
    return colors.LOW_CAPACITY;
  } else {
    return colors.MEDIUM_CAPACITY;
  }
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

export default function HomeMainContent({
  containers, areas, containerSelected, setContainerSelected
}) {

  const [openGenerateOptimalRouteModal, setOpenGenerateOptimalRouteModal] = useState(false)
  const [optimalRouteSelected, setOptimalRouteSelected] = useState(null)
  const [openGenerateOptimalRouteRightSideInfo, setOpenGenerateOptimalRouteRightSideInfo] = useState(false)
  const [containersFormatted, setContainersFormatted] = useState(null)
  const [thresholdInformation, setThresholdInformation] = useState(null)
  const [optimalRoutes, setOptimalRoutes] = useState(null)
  const [company, setCompany] = useState(null)
  const [openAdjustThresholdsModal, setOpenAdjustThresholdsModal] = useState(false);
  const [collectors, setCollectors] = useState([])
  const [selectedCollectors, setSelectedCollectors] = useState([])

  const handleOpenAdjustThresholdsModal = () => {
    setOpenAdjustThresholdsModal(true)
  };
  const handleCloseAdjustThresholdsModal = () => {
    setOpenAdjustThresholdsModal(false)
  };
  const handleOpenGenerateOptimalRouteModal = () => setOpenGenerateOptimalRouteModal(true)
  const handleCloseOpenGenerateOptimalRouteModal = () => setOpenGenerateOptimalRouteModal(false)
  const handleCloseRightSidePanelContainerInfo = () =>{ 
    setContainerSelected(null)
  }
  const handleCloseRightSidePanelOptimalRouteInfo = () =>{ 
    setOpenGenerateOptimalRouteRightSideInfo(false)
    setOptimalRouteSelected(null)
    setOptimalRoutes(null)
  }
  const handleOpenRightSidePanelOptimalRouteInfo = () => {
    handleCloseOpenGenerateOptimalRouteModal()
    setOpenGenerateOptimalRouteRightSideInfo(true)
  }

  const position = {
    lat: -34.5893,
    lng: -58.3974,
  };

  const {
    getOptimalRoutes: {
      getOptimalRoutes,
      isLoadingGetOptimalRoutes
    }
  } = useOptimalRoutes()

  const {
    fetchCollectors: {
      isLoadingFetchCollectors,
      fetchCollectors,
    }
  } = useRoutes()


  const apiKeyGoogleMaps = 'AIzaSyChdsbPNc69MyOgPRQf8o2_5kMUFDx2zMM';


  const fetchOptimalRoutes = async (areaId) => {
    const optimalRoutes = await getOptimalRoutes(areaId)

    setOptimalRoutes(optimalRoutes)
    setOptimalRouteSelected(optimalRoutes.optimalRouteFull)
  }

  const {
    getCompany: {
      getCompany,
      isGetCompanyLoading
    },
    modifyCompany: {
      modifyCompany,
      isModifyCompanyLoading
    }
  } = useCompanies();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const companyId = user?.companyId;
    if (companyId) {
      getCompany(companyId)
        .then((response) => {
          setCompany(response)
        });
    }

    const fetchCollectorsForRoute = async () => {
      const collectorsRetrieved = await fetchCollectors()
      setCollectors(collectorsRetrieved.result)
    }

    fetchCollectorsForRoute()
  }, []);

  useEffect(() => {
    if (!company || !containers) return;

    setThresholdInformation(getCompanyThresholdInformation(company.threshold))

  }, [company, containers])

  useEffect(() => {
    if (!thresholdInformation) return;
    const getColorPoint = (capacity, id) => {
      if (id == 'C9' || id == 'Test12') {
        return colors.DISCONNECTED
      }

      const matchedInfo = thresholdInformation.find(info =>
        capacity >= info.thresholdRange[0] && capacity <= info.thresholdRange[1]
      );

      return matchedInfo ? matchedInfo.color : '#888';
    };

    const newContainersFormated = containers.map(
      c => { return {
        ...c,
        color: getColorPoint(c.capacity, c.id) 
      } }
    )

    setContainersFormatted(newContainersFormated)
  }, [thresholdInformation])

  const onGenerateOptimalRoute = (data) => {
    const selectedCollectorObjects = collectors.filter((collector) =>
      data.collectors.includes(collector.id)
    )
    setSelectedCollectors(selectedCollectorObjects)

    fetchOptimalRoutes(data.areaId)
    handleCloseOpenGenerateOptimalRouteModal()
    setOpenGenerateOptimalRouteRightSideInfo(true)
  }

  const handleCompanyUpdate = async (reviewCompanyBody) => {
    try {
      await modifyCompany(reviewCompanyBody.id, reviewCompanyBody);
      setCompany(reviewCompanyBody)
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  if (!company || !containers || !containersFormatted || isGetCompanyLoading) {
    return (
      <Box
        sx = {{
          width: 1,
          height: `calc(100% - ${HEIGHT_HEADER_FILTER_SIDE_COMPONENT})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      width='100%'
      height={`calc(100% - ${HEIGHT_HEADER_FILTER_SIDE_COMPONENT})`}
    >
      <ModalCreateResource
        title={'Generar ruta óptima'}
        open={openGenerateOptimalRouteModal}
        handleClose={handleCloseOpenGenerateOptimalRouteModal}
        form={<GenerateOptimalRouteForm
          onGenerateOptimalRoute={onGenerateOptimalRoute}
          handleClose={handleCloseOpenGenerateOptimalRouteModal}
          handleOpenRightSideOptimalRouteInfo={handleOpenRightSidePanelOptimalRouteInfo}
          areas={areas}
          collectors={collectors}
        />}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          pt: '24px',
          alignItems: 'center',
          gap: '11px',
          pr: '32px',
        }}
      >
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
          height: 'calc(100% - 140px)'
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
            zoom={15}
            areas={areas}
            route={optimalRouteSelected}
            centerPosition={position}
            containers={containersFormatted.map((p) => (
              <Marker
                key={p.id}
                setContainerSelected={setContainerSelected}
                point={p}
                markerColor={p.color}
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
        {
          openGenerateOptimalRouteRightSideInfo && (
            <RightSidePanel
              disablePadding={true}
              handleClose={handleCloseRightSidePanelOptimalRouteInfo}
              componentToRender={<RightSidePanelOptimalRouteIinfo
                routeSelected={optimalRouteSelected}
                optimalRoutes={optimalRoutes}
                setRouteSelected={setOptimalRouteSelected}
                selectedCollectors={selectedCollectors}
              />}
            />
          )
        }
      </Box>
      <Paper
        elevation={6}
        sx={{
          margin: 'auto',
          marginBottom: '14px',
          width: 'fit-content',
          display: 'flex',
          padding: '9px 16px',
          gap: '32px',
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-30%)',
          zIndex: 1,
        }}
      >
        {thresholdInformation.map((i, index) => (
          <Box
            key={'tr-' + index}
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
            minWidth: '30px',
            width: '30px',
            height: '30px',
          }}
          onClick={handleOpenAdjustThresholdsModal}
        >
          <SettingsIcon />
        </Button>
        <ModalAdjustContainersThreshold
          open={openAdjustThresholdsModal}
          handleClose={handleCloseAdjustThresholdsModal}
          onSubmit={handleCompanyUpdate}
          company={company}
          thresholdInformation={thresholdInformation}
        />
      </Paper>
    </Box>
  );
}

function Marker({
  point, setContainerSelected, markerColor
}) {
  return (
    <AdvancedMarker
      position={point}
      onClick={() => setContainerSelected(point)}
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
                overflow: 'hidden'
              }}
            >
              <LinearProgress
                variant='determinate'
                value={point.capacity}
                sx={{
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: markerColor,
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    lineHeight: '14px',
                    color: 'black',
                    marginTop: '4px'
                  }}
                >
                  {point.capacity}% lleno
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 300,
                    lineHeight: '14px',
                    color: '#00000061'
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
        <Box>
          <CircleIcon
            sx={{
              color: markerColor
            }}
          />
        </Box>
      </HtmlTooltip>
    </AdvancedMarker>
  );
}

