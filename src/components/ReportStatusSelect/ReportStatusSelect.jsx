import {
  useEffect,
  useState
} from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  styled
} from '@mui/system';
import {
  reportStates
} from '../../enums/reportStates';
import {
  useReports
} from '../../api/hooks/useReports/useReports';
import {
  ModalReportResolved
} from '../../modales/ModalReportResolved/ModalReportResolved';
import {
  ResolveReportForm
} from '../../forms/ResolveReport/ResolveReportForm';


const SmallKeyboardArrowDownIcon = (color) =>
  styled(KeyboardArrowDownIcon)(({
    _
  }) => ({
    fontSize: '16px',
    color: color + '!important',
  }));

const SmallCircularProgress = (color) =>
  styled(CircularProgress)(({
    _ 
  }) => ({
    color: `${color} !important`,
    width: '12px !important', // Tamaño reducido
    height: '12px !important', // Tamaño reducido
  }));

export const ReportStatusSelect = ({
  reportId, reportState, onAvatarUpdate = null, onUpdate
}) => {
  const [selectedValue, setSelectedValue] = useState(reportState);
  const [newSelectedValue, setNewSelectedValue] = useState(reportState);
  const [openModalReportResolved, setOpenModalReportResolved] = useState(false);
  const [modalReportResolvedTitle, setModalReportResolvedTitle] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedReportStatus, setSelectedReportStatus] = useState(null);
  const [statusUpdated, setStatusUpdated] = useState(false);

  const {
    reviewReport: {
      reviewReport,
      isReviewReportLoading
    },
  } = useReports();

  useEffect(() => {
    if (statusUpdated) {
      setSelectedValue(newSelectedValue);
    }
  }, [statusUpdated]);

  const handleOpenModalReportResolved = (title, reportStatus) => {
    setStatusUpdated(false);
    setSelectedReportId(reportId);
    setSelectedReportStatus(reportStatus);
    setModalReportResolvedTitle(title);
    setOpenModalReportResolved(true);
  };

  const handleCloseModalReportResolved = () => setOpenModalReportResolved(false);
  const handleStatusUpdated = () => setStatusUpdated(true);


  const handleChange = async (event) => {
    const newValue = event.target.value;
    setNewSelectedValue(newValue);

    if (newValue === reportStates.RECHAZADO.text) {
      handleOpenModalReportResolved('Cambiar a Rechazado', reportStates.RECHAZADO.text);
    } else if (newValue === reportStates.RESUELTO.text) {
      handleOpenModalReportResolved('Cambiar a Resuelto', reportStates.RESUELTO.text);
    } else if (newValue === reportStates['EN REVISIÓN'].text) {
      setSelectedValue(newValue);

      const user = JSON.parse(localStorage.getItem('user'));

      try {
        const reviewReportBody = {
          email: user.personalEmail,
          managerId: user.id,
        }

        const response = await reviewReport(reportId, reviewReportBody);

        if (onUpdate) {
          onUpdate()
        }
        //TODO later: validar que la respuesta sea la esperada, y sino tirar error.
        if (onAvatarUpdate) {
          onAvatarUpdate(reportId, {
            name: user.name,
            surname: user.surname,
            profilePicture: user.profilePicture
          });
        }

      } catch (error) {
        console.error('Error submitting form', error);
      }
    }
  };

  return (
    <>
      <FormControl
        size='small'
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          '& .MuiOutlinedInput-root': {
            '& .MuiSvgIcon-root': {
              right: '20px',
            },
            '& fieldset': {
              borderColor: reportStates[selectedValue].color,
            },
            '&:hover fieldset': {
              borderColor: reportStates[selectedValue].color,
            },
            '&.Mui-focused fieldset': {
              borderColor: reportStates[selectedValue].color,
            },
          },
        }}
      >
        <Select
          value={selectedValue}
          onChange={handleChange}
          IconComponent={
            isReviewReportLoading ?
              SmallCircularProgress(reportStates[selectedValue].colorText) :
              SmallKeyboardArrowDownIcon(reportStates[selectedValue].colorText)
          }
          sx={{
            height: '30px',
            color: reportStates[selectedValue].colorText,
            fontSize: '13px',
            fontWeight: 500,
            lineHeight: '22px',
            textAlign: 'center',
          }}
        >
          <MenuItem
            value='NUEVO'
            sx={{
              color: selectedValue === reportStates.NUEVO.text ? reportStates['NUEVO'].colorText : 'inherit',
            }}
          >
            NUEVO
          </MenuItem>
          <MenuItem
            value='EN REVISIÓN'
            sx={{
              color: selectedValue === reportStates['EN REVISIÓN'].text ? reportStates['EN REVISIÓN'].colorText : 'inherit',
            }}
          >
            EN REVISIÓN
          </MenuItem>
          <MenuItem
            value='RECHAZADO'
            sx={{
              color: selectedValue === reportStates.RECHAZADO.text ? reportStates['RECHAZADO'].colorText : 'inherit',
            }}
          >
            RECHAZADO
          </MenuItem>
          <MenuItem
            value='RESUELTO'
            sx={{
              color: selectedValue === reportStates.RESUELTO.text ? reportStates['RESUELTO'].colorText : 'inherit',
            }}
          >
            RESUELTO
          </MenuItem>
        </Select>
      </FormControl>

      {openModalReportResolved && (
        <ModalReportResolved
          title={modalReportResolvedTitle}
          open={openModalReportResolved}
          handleClose={handleCloseModalReportResolved}
          form={<ResolveReportForm
            handleClose={handleCloseModalReportResolved}
            reportId={selectedReportId}
            reportStatus={selectedReportStatus}
            statusUpdated={handleStatusUpdated}
            onUpdate={onUpdate}
          />}
        />
      )}
    </>
  );
};