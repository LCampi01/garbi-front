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
import {
  useOptimalRoutes 
} from '../../api/hooks/useOptimalRoutes/useOptimalRoutes';
import {
  useAreas 
} from '../../api/hooks/useAreas/useAreas';
import {
  formatContainers 
} from '../../api/hooks/useReports/mappers';
import {
  HEIGHT_HEADER_FILTER_SIDE_COMPONENT 
} from '../../config';

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


export default function HomeMainContent() {

  const [openGenerateOptimalRouteModal, setOpenGenerateOptimalRouteModal] = useState(false)
  const [openGenerateOptimalRouteRightSideInfo, setOpenGenerateOptimalRouteRightSideInfo] = useState(false)

  const [optimalRouteSelected, setOptimalRouteSelected] = useState(null)

  const [optimalRoutes, setOptimalRoutes] = useState(null)

  const [containers, setContainers] = useState([]);
  const [containerSelected, setContainerSeleted] = useState(null);

  const [areas, setAreas] = useState([])

  const handleOpenGenerateOptimalRouteModal = () => setOpenGenerateOptimalRouteModal(true)
  const handleCloseOpenGenerateOptimalRouteModal = () => setOpenGenerateOptimalRouteModal(false)
  const handleCloseRightSidePanelContainerInfo = () => setContainerSeleted(null)
  const handleCloseRightSidePanelOptimalRouteInfo = () => setOpenGenerateOptimalRouteRightSideInfo(false)
  const handleOpenRightSidePanelOptimalRouteInfo = () => {
    handleCloseOpenGenerateOptimalRouteModal()
    setOpenGenerateOptimalRouteRightSideInfo(true)
  }

  const position = {
    lat: -34.5893,
    lng: -58.3974,
  };
  const {
    getContainers: {
      getContainers: getContainers
    },
  } = useContainers();
  const {
    getOptimalRoutes: {
      getOptimalRoutes,
      isLoadingGetOptimalRoutes
    }
  } = useOptimalRoutes()
  const {
    getAreas: {
      getAreas,
      isLoadingGetAreas
    }
  } = useAreas()

  const apiKeyGoogleMaps = import.meta.env.VITE_REACT_APP_API_KEY_GOOGLE_MAPS;

  useEffect(() => {
    const retrieveContainers = async () => {
      const containersUnformated = await getContainers();
      const containersFormated = formatContainers(containersUnformated.result);

      setContainers(containersFormated);
    };

    try {
      retrieveContainers();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      const areasRetrieved = await getAreas()
      setAreas(areasRetrieved.result)
    }

    fetchAreas()
  }, [])

  const fetchOptimalRoutes = async (areaId) => {
    // lo comento para usar el mock y no generar bill
    const optimalRoutes = await getOptimalRoutes(areaId)

    // TODO BORRAR ESTO Y PONER LA LINEA DE ARRIBA
    // const optimalRoutes = getOptimalRoutesMocked()

    setOptimalRoutes(optimalRoutes)
    setOptimalRouteSelected(optimalRoutes.optimalRouteFull)
  }

  const onGenerateOptimalRoute = (data) => {
    fetchOptimalRoutes(data.areaId)
    handleCloseOpenGenerateOptimalRouteModal()
    setOpenGenerateOptimalRouteRightSideInfo(true)
  }

  return (
    <>
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
          />}
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
          <Tooltip
            title={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center' 
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '14px',
                    color: '#FFFFFF',
                    textAlign:'center'
                  }}
                >
                  Automáticamente se genera a las 20hs cada día
                </Typography>
              </Box>
            }
            placement='bottom'
            arrow
          >
            <InfoOutlinedIcon
              sx={{
                color: '#0000008F',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            />
          </Tooltip>
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
              zoom={12}
              areas={areas}
              route = {optimalRouteSelected}
              centerPosition={position}
              containers={containers.map((p) => (
                <Marker
                  key={p.id}
                  setContainerSeleted={setContainerSeleted}
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
          {
            openGenerateOptimalRouteRightSideInfo && (
              <RightSidePanel
                disablePadding={true}
                handleClose={handleCloseRightSidePanelOptimalRouteInfo}
                componentToRender={<RightSidePanelOptimalRouteIinfo 
                  routeSelected={optimalRouteSelected}
                  optimalRoutes={optimalRoutes}
                  setRouteSelected={setOptimalRouteSelected}
                />}
              />
            )
          }
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
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <CircleIcon
              sx={{
                color: colors.LOW_CAPACITY,
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
              {' '}
              +75%
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <CircleIcon
              sx={{
                color: colors.MEDIUM_CAPACITY,
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
              {' '}
              25% - 75%
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <CircleIcon
              sx={{
                color: colors.HIGH_CAPACITY,
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
              {' '}
              -25%
            </Typography>
          </Box>
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


const getOptimalRoutesMocked = () => {
  return {
    'optimalRouteFull': {
      'overview_polyline': 'rp~qEvzncJo@E_@UeCsBUc@Qg@Kg@E_@Ak@@a@Hi@V{@fByE`@qAVoA\\qBZeDF}@HI@AN_@Pi@Ta@`@m@NGl@e@j@u@P]AYIa@W[OKIAIA[FULiAnAMTCV?PLd@Ez@UnB@VG|@[dDu@`Ea@pAgBxEWz@Ih@?lAPfAf@jAdCrB^TxCbCnApARVnAhAhHxGr@h@^Pn@LZPVPbA`B|@~@J^vBlBxDlDn@l@@JP\\HPj@fA@H@L@LLVRLV@PGr@Rz@p@vCjCxCjCj@^l@n@j@d@zErEjAhAvGfGNp@GVG^Ax@JdAG^a@v@gClEe@|@TPnB~A|ApA\\VlByC~BsDjFcI|DkGfEmG~CaFyAqCyAsCgBzCuElHyFlJE@QJa@l@IBe@EKQOKIC[c@EID{@RaIP}HLwFNsDT{HRNn@~@jCbEhBuCpBnDzArC~AjCtAfChH~McG|I}@tAeCmEc@w@`AwA~AaC`F{HdC}Dv@kA~@jB|A|CtBtDhA`Cj@vAHVELk@nC[xAITIZw@pDO\\eA|AiA|AbAhBV`@{CfEsBrCaDhE_DbEgCnDsCvD_BvBw@pAeCdDWXyFxHgEzFiDtEwC|DaDnEYd@gCpDpCnE|DhFvB`CyChDGR[n@{@|AeC~DgAzAwBoBg@c@T[~@{AT_@x@mAdAcArBqBdIcLDCJEFQjBeCb@q@lEeGbLwOpBoCR]uDwF_CmDcBcCoEiFiDgDeFcE{BcBWIK@q@?k@GI@UBWKeBs@iIkDmAg@KQa@USC}JcEmD{AwAg@u@WK^Q@_@l@IDO@MAgAgAe@_@i@g@wDcD_Ak@iHsDc@U?CKMm@[}@aA_@]]M_Bo@w@MYSw@y@e@k@uAmBoCqD_AkA_AqAYe@AMDWFOCi@pDwGt@aBdCiGjAyCrAeDj@sA`@O|A{CnB{Dh@_AJc@jBkDTa@PSTMVERBPHNRFLDZATERKRONKD[@GA',
      'total_distance': 17136,
      'total_duration': 3589,
      'id': 'c40accba-ba52-4791-930c-a593415e734a',
      'timestamp': '2024-09-07T13:06:33.071Z'
    },
    'optimalRouteWarningAndFull': {
      'overview_polyline': 'rp~qEvzncJo@E_@UeCsBUc@Qg@Kg@E_@Ak@@a@Hi@V{@fByE`@qAVoA\\qBZeDF}@HI@AN_@Pi@Ta@`@m@NGl@e@j@u@P]AYIa@W[OKIAIA[FULiAnAMTCV?PLd@Ez@UnB@VG|@[dDu@`Ea@pAgBxEWz@Ih@?lAPfAf@jAdCrB^TxCbCnApARVnAhAhHxGr@h@^Pn@LZPVPbA`B|@~@J^vBlBxDlDn@l@@JP\\HPj@fA@H@L@LLVRLV@PGr@Rz@p@vCjCxCjCj@^l@n@j@d@zErEjAhAvGfGNp@GVG^Ax@@Pd@l@JFl@NxBrCrFxHzD`FfHeKpC{DwAiCoAaC{B`Dc@p@|@pAvB`DpC{DuAgCqAcC{B`Dc@p@|@pAvB`DpHmKdDwELVdB`D~@bBpBjDfEpH~BzDwCdFQPg@|@_BlCU_@kB_DyByDsBsDGYaBcCgDeG~CqEvAhCpA|BqC|DOPmAyByAkC~CqEhDfGzAjCjC~Dd@bAd@`A~@~A|AjCWXaCbEaBqC_@m@Zm@r@mA`@s@d@u@d@z@|AjCWXaCbEaBqCuC_FMYkAqB_@s@EUuAuBKM}@nAORs@bAOLeChDqC~Dh@`ArDdGdDxFjDdGLTdAiBh@}@PYaAeBcC~DwBvDh@~@NVlA|BnAtBt@tAzB{DzBaEaAgBSg@MaBGUECi@@_@]mAsBaCgE{CgFc@{@iDiG]c@{C}DvCgEfA`BhBtCFNfAjBJJoBlCa@d@uCzDfC`EdDxFj@fApDhG`@p@yB|D}DnFaB|BiF`HkBjCc@l@b@h@vBdCPWzBaDbBqB~AaCn@}@h@s@vAiB{@yAy@yAgCqE_@m@YUoIgHvEiG|BoDlCoDUc@iBiDyAiCqC~DeCfDkAaBcBaClGeJyDgFqCbEoErGoDhFcAxAKI{DaDpFkIzKpJz@gA{DcFmD_FxBmDfA_BbA}AdBkCdBxBrAbBOTm@`A{DzF}BdDmD_FsDaFq@y@iCxEdCpBdI|GoDhFcAxAKI{DaDm@g@uCcCbFqIvA_Cz@yApCaFj@eA\\k@@SNi@AMCUW[MEc@?s@Jg@\\q@GkAcA{EqEw@w@IRRRcAxBOPODJr@Dr@d@j@|CzC}C{Ce@k@Es@Ks@NENQbAyBJJj@h@nAhAfE|DNp@n_arEjfqcJVTNp@Kb@E`@AZB`@l@r@`@LNBDMr@mAv@uA@SNi@ASCOGIKOECYEc@BYDWHQLIHKA_@AKE{GmG}@}@IRRRTTr@n@dEzD~@z@Np@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uAL?NOdA}ANe@@GfB|B|AjBj@_AhAiBzCpGc@p@cAxAiF|H}BdDmD_FsDaFvB_EjBcD@SNi@ASCOGIKOMESUQYHeCNwFJwESKiGkDcBaAwAw@|AkHbDjBrAr@`CrAQ|ICjB[|LCp@M^U^SJSPU^Q`@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uA@SNi@ASCOGIKOMESUQYHeCZoMiDiBwEoCwAw@|AkHbDjBrAr@`CrAQ|ICjB[tLAj@CTGPEHSZKDQL_@h@Yx@G^Ax@@Pd@l@JFl@NrAeC\\k@J?BA|@mAb@}@BMlD}FXe@eAfBaCzDE@ID[b@SRi@EW[ME[c@EID{@RaI^uPVaHLmEJFPRT\\jBvCn@`AhBuClEbIcAlB}@hBGG_BsAuD{C}BeBUOOvDSrK]rNCp@M^U^SJSPU^Q`@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uAL?NOdA}ANe@@GfB|B|AjBj@_AhAiBnDmF~NgUvBcDd@u@MQsDoEyCiEi@s@mA{AqBhDqBjDgAdBo@bAzArCcAlB}@hBGGiB{AkDsCpEcHlEbIcAlB}@hBGGuBeB_DiCoA}@cAw@OvDQ|ICjB[fMEn@MZSZKDQL_@h@Yx@K|@@Z@Pd@l@JFNF\\Ff@_Aj@eA\\k@J?BAX]b@o@b@}@BMxFmJtEmHfB{Cn@wAfAiB|B{DbC~ExBjEjBtDcCfDeDyGsCmFi@eA|B{D|D~HtAnCtApC_@f@wCdEmI~L}@tAeCmEc@w@`AwA~AaCdDfGjBlD|@bBdDwE|B{CIQcF_KcBiD|BoDtAnCtApC_@f@wCdEiA`BcDzEjBlD|@bBdDwEuAkC_GwK~FcJtAnCtApCfB|Cn@nAxrbrE|cqcJsAiCiA_C_C`DpD~G`BxCdAfBkAbBgJlMaDhE_DbEgCnDsCvD_BvBw@pAeCdDWXyFxHgEzFiDtEwC|DaDnEYd@gCpDpCnE|DhFvB`CyChDGR[n@{@|AeC~DgAzAwBoBg@c@T[~@{AT_@x@mAdAcArBqBdIcLDCJEFQjBeCb@q@lEeGbLwOpBoCR]uDwF_CmDcBcCoEiFiDgDeFcE{BcBWIK@q@?k@GI@UBWKeBs@iIkDmAg@KQa@USC}JcEmD{AwAg@u@WK^Q@_@l@IDO@MAgAgAe@_@i@g@wDcD_Ak@iHsDc@U?CKMm@[}@aA_@]]M_Bo@w@MYSw@y@e@k@uAmBoCqD_AkA_AqAYe@AMDWFOCi@pDwGt@aBdCiGjAyCrAeDj@sA`@O|A{CnB{Dh@_AJc@jBkDTa@PSTMVERBPHNRFLDZATERKRONKD[@GA',
      'total_distance': 48772,
      'total_duration': 11892,
      'id': 'f97ccf1a-8fd4-4434-a6ed-d29608867d01',
      'timestamp': '2024-09-07T13:06:33.073Z'
    },
    'optimalRouteAll': {
      'overview_polyline': 'rp~qEvzncJo@E_@UeCsBUc@Qg@Kg@E_@Ak@@a@Hi@V{@fByE`@qAVoA\\qBZeDF}@HI@AN_@Pi@Ta@`@m@NGl@e@j@u@P]AYIa@W[OKIAIA[FULiAnAMTCV?PLd@Ez@UnB@VG|@[dDu@`Ea@pAgBxEWz@Ih@?lAPfAf@jAdCrB^TxCbCnApARVnAhAhHxGr@h@^Pn@LZPVPbA`B|@~@J^vBlBxDlDn@l@@JP\\HPj@fA@H@L@LLVRLV@PGr@Rz@p@vCjCxCjCj@^l@n@j@d@zErEjAhAvGfGNp@GVG^Ax@@Pd@l@JFl@NrAeC\\k@J?BA|@mAb@}@BMxFmJ`DaFzCgFrDdHhM|Un@jAO\\cAxAABiA|AbAhBbD`F~AaCz@iAcCiEoAwBeDeG}BmE{@_BcDzEjBlDfFjJ_F~GiA|AnAzBJJf@|@rA`CBFDG|@mAdAuAvAsBrAaB~AaCz@iAzDxGh@|@wCdFWXaCbE_DoFwAaCMYkBeDEUuAuBoC{EkEcI{B`Dc@p@|@pAvB`DpC{DuAgCqAcC{B`Dc@p@|@pAvB`DpDvFnAzBJJf@|@rA`CxApCJZXj@hByCnAuBdByCpAzBp@jAQPg@|@_BlCU_@kB_Dw@uAyB{D{@{AGYaBcCgDeG~CqEvAhCtCfFV`@{CfEsBrCY\\lAvBp@nAd@o@tAkBLOIQkAqB]o@GYaBcCgDeG~CqEvAhCtCfFV`@{CfEq@cAo@_AyB|Cc@f@yBxCCAu@eAcAqA{@gAvCgEpC{DwAiCoAaCiA~AuArB~A~B|CtEhBtCFNz@xAV\\gCjDIFyAiC]c@y@gAaBuBvCgEPXtArBhAhBnAzBJJoBlCa@d@uCzDfC`EdDxFjDdGLTdAiBh@}@PYaAeBcC~DwBvDh@~@NVlA|BnAtBt@tAhK{QrBwDiGoK_DoFwAaCMYkBeDEUuAuBsDsGgDkG{B`Dc@p@|@pA`@l@zzarE`|qcJ|AyBPXhCxDTb@IFeChDq@}@gCcDvCgEPXhCxDrAdC\\d@gCjD_DbEbHhLP^lBdDhCnEyB|DaC`D{AtBkA`BiGjIeBbCzCnDbAyAhA_Bf@k@p@{@fAyAj@}@r@aArBmCgAmBeEsHw@s@sE}DmB}AzB{CdB}BrB_D~B{CLSKQc@{@iDiGmEhGiA|AkAaBg@s@{@mA|BgDnC}DmDuEKQ}@pAqEvGkElGyBbDyCeCm@e@xBiDvBaDlAdAfB|AdFlEz@gA{DcFmD_FxBmDfA_BbA}AdBkCdBxBrAbBOTm@`A{DzF}BdDmD_FsDaFq@y@iCxE|CfClHfGoDhFcAxAKI{DaDm@g@uCcCtBsDlB}CdAz@lB|ArEzDRNyB~CyBbDyCeC}AmAsCcCtBsDtDeGbAaBh@cA`CiEv@uA@SNi@ASCOGIKOECYEc@BYDWHQL_@h@Yx@G^Ax@JdAG^a@v@gClE_BxCo@dAgB|DeD}COMpB{DjDhDj@d@dE}Gz@yApCaFj@eA\\k@@SNi@AMCUW[MEc@?s@Jg@\\U^Q`@Kb@E`@AZB`@Hj@C^MV{@xAiCxEsAcArAbAn@h@rCyEpCaFj@eA\\k@@SNi@AMCUW[MEc@?s@Jg@\\U^Q`@Kb@E`@AZB`@Hj@C^MV{@xAp@x@h@cA`CiEv@uAL?d@o@n@}@Ne@@GfB|B|AjBj@_AhAiBzCpGc@p@cAxAm@`A{DzF}BdDmD_FsDaFh@cA`CiEv@uA@SNi@ASCOGIKOECYEc@BYDWHQLIHKA_@AKE{GmG}@}@IRRRmAfCUHHZDp@@XLRpBpBvBtBwBuBqBqBMSAYEq@I[TIlAgCTTxFjF~@z@Np@Kb@E`@AZB`@l@r@`@LNBDMr@mAv@uAL?NObAtAhy`rEdkqcJ}C{Ce@k@Es@Ks@NENQbAyBJJj@h@vGfGNp@GVG^Ax@@Pd@l@JFl@NrAeC\\k@@SNi@AMCUKQOK[Eg@B]HSJSPg@CUI{GoGw@w@IR^^zBrBnDfDVTNp@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uA@SNi@ASCOGIKOME[Cs@HWHQLIHKA_@Aa@YcIwHuDqDyBuBcBmAiHuGg@kACi@b@iCAWjAoDvBcGHSbCxAfDjB|ChBhEdCbDjBrAr@`CrAQ|ICjB[tLAj@CTGPEHSZKDQL_@h@Yx@G^Ax@@Pd@l@JFl@NrAeC\\k@J?BA|@mAb@}@BMSHa@l@KFE?a@EGIKOECYEc@BYDWHQLIHKA_@AKE{GmG}@}@IRRRTTr@n@dEzD~@z@Np@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uAL?NOdA}ANe@@GfB|B|AjBj@_AhAiBzCpGc@p@cAxAiF|H}BdDmD_FsDaFvB_EjBcD@SNi@ASCOGIKOMESUQYHeCZoMiDiBuCeByCaB|AkHrAt@xBnAjDlB]`QUzIGl@]l@g@\\U^Q`@Kb@E`@AZB`@l@r@`@LNBDMr@mAv@uA@SNi@ASCOGIKOECGASUQYHeCNwFJwESKaH{DcDiB|AkHrAt@xBnAjDlBSrK]rNCp@M^U^SJSPU^Q`@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uA@SNi@ASCOGIKOMESUQYHeCZoMiDiBkC}AcDiB|AkHrAt@xBnAjDlBQ|Io@]qF}CcDiB|AkHrAt@xBnAjDlBUhM[fMEn@MZSZKDQL_@h@Yx@K|@@Z@Pd@l@JFNF\\Ff@_Aj@eA\\k@@SNi@AMCUW[ME[c@EID{@RaIJwESKaH{DcDiB|AkHrAt@xBnAjDlBSrK]rNCp@M^U^SJSPU^Q`@Kb@E`@@|@l@r@HDVFNBDMr@mAv@uAL?NOdA}ANe@@G`C{Dj@aAk@`AaCzDE@IDGDa@l@IBe@EKQOKIC[c@EID{@RaIP}HLwFNsDT{HRNn@~@jCbEgBlCoA}@cAw@OvDQ|ICjB[tLAj@CTGPEHSZKDQL_@h@Yx@G^Ax@@Pd@l@JFl@NrAeC\\k@@SNi@AMCUKQOKIC[c@EID{@RaI^uPVaHLmEJFPRT\\jBvCn@`AgBlC}BeBUOOvDSrKIlDUzIGl@]l@g@\\U^Q`@Kb@E`@AZB`@l@r@`@LNBDMr@mAv@uAL?d@o@n@}@Ne@@G`C{DfAkBABgEbHdEhFbDgFhrarE`ypcJyFlJKBOL_@j@K@a@EGIKOMESUQYHeCZoMR}INsDT{HRNRVfDjFhBuCpBnDzArCm@jAsAjCmAcAo@i@_DiCfBmChBuCpBnDzArCm@jAsAjCWWeBuA_DiCoA}@cAw@OvDQ|ICjB[tLAj@CTGPEHSZKDQL_@h@Yx@G^Ax@@Pd@l@JFl@NrAeC\\k@J?BA|@mAb@}@BMxFmJt@kAu@jAyFlJKBOL_@j@K@a@EGIKOMESUQYHeCZoMR}INsDT{HRNRVfDjFhBuCpBnDzArCm@jAsAjCgB{AUQ_DiCfBmChBuCpBnDzArCm@jAsAjCZq@[p@gB{AuD{C}BeBUOOvDSrKIlDUzIGl@]l@g@\\U^Q`@Kb@E`@AZB`@l@r@`@LNBDMr@mAv@uAL?d@o@n@}@Ne@@G`C{DhG_KiG~JaCzDfB|B|AjBj@_AhAiBlBuCmBoDaAgBpCmEl@}@zAiC`@s@r@rAdAtBx@zAhDlGcDzE}CvEiDeGfF}HzEqHsCmFi@eA|B{D|D~HtAnCtApC_@f@wCdEmI~L}@tAeCmEc@w@`AwA~AaCdDfGjBlD|@bBdDwEuAkCuAiCiDmG`AyAdC}Dv@kAtAnCtApC_@f@wCdEiA`BiDmGt@iAjAiB|BoDtAnCtApC_@f@cB~BaAoBcBiD|BoDtAnCtApC_@f@cB~BeDyG|BoDjD`HfB|C~@lBHRhA_Bx@iApBoCqBoAA]Ku@[gAUQMCQOO`@k@z@yClEx@vA~pbrEzxpcJuApBMYwAoCs@dAiA`BcDzE}CvEiDeGfF}H`HuKv@kA~@jBjBtDvClFXp@j@vAHVELk@nC[xASp@w@pDo@kAeBaDoBuDiAwBcDzEZj@nA`C|@bBdDwE|B{ChCiDj@vAHVELk@nC[xAKYk@eAm@mAKOhCiDj@vAHVELk@nC[xAKYk@eAy@}AsAqC_C`DtAjCbDdG~AnC_I|KmCpDgHnJgGpIsBlCqApBkBdCWXcIvK{GdJwC|DmD|EYd@g@p@_B~BpCnE|DhFvB`CyChDGR[n@{@|AkDrFa@f@wBoBg@c@T[~@{AT_@x@mA`D{CVYnCyDzDmFJEFQjBeC`DqEbJeM`GgIR]eBkCwDwFqAoB}@mAsDgEqDqDeFcE}AkA]WWIe@@W?k@GI@UBWKeBs@wKsEKQa@USC}JcEmD{AwAg@u@WK^K?E@_@l@IDO@MAQOu@w@e@_@uBoBqBaBi@[uBiAgFiCCIk@]WSoAqAk@SqAi@w@MYSw@y@QUy@eA_FwG_@c@s@aA_@i@GYDWFOCi@pDwGTg@tAcDnF_Nj@sA`@O|A{CxC{FJc@|@eBbAgBPSTMVERBPHNRLh@ATERKRONYHUC',
      'total_distance': 80583,
      'total_duration': 19952,
      'id': '8e34a704-6962-43b0-ad1b-d0bf627d10e7',
      'timestamp': '2024-09-07T13:06:33.077Z'
    }
  }
}