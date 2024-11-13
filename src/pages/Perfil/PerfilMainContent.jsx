import {
  useEffect, useState 
} from 'react';
import {
  Avatar, Box, Typography, Divider, IconButton 
} from '@mui/material';
import {
  AccessTime, Email, Phone, Work, Edit, Lock 
} from '@mui/icons-material';
import {
  useEmployees 
} from '../../api/hooks/useEmployees/useEmployees';
import {
  ModalChangePassword 
} from '../../modales/ModalChangePassword/ModalChangePassword';


export default function PerfilMainContent() {
  const {
    modifyEmployee: {
      modifyEmployee 
    },
    fetchEmployee: {
      fetchEmployee 
    },
  } = useEmployees();

  const user = JSON.parse(localStorage.getItem('user'));
  const id = user.id;

  const [selectedImage, setSelectedImage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userWorkingShift, setUserWorkingShift] = useState('');
  const [userCompanyEmail, setUserCompanyEmail] = useState('');
  const [userCompanyPhone, setUserCompanyPhone] = useState('');
  const [passwordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [userPersonalEmail, setUserPersonalEmail] = useState('');

  const handlePasswordChange = () => {
    setIsPasswordModalOpen(false); 
  };

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const fetchedEmployee = await fetchEmployee(id);
        if (fetchedEmployee) {
          setSelectedImage(fetchedEmployee.imageUrl);
          setUserRole(fetchedEmployee.role);
          setUserWorkingShift(fetchedEmployee.workingShift);
          setUserCompanyEmail(fetchedEmployee.companyEmail);
          setUserCompanyPhone(fetchedEmployee.companyPhone);
          setUserPersonalEmail(fetchedEmployee.personalEmail);

        }
      } catch (error) {
        console.error('Error al obtener la información del empleado:', error);
      }
    };

    getEmployee();
  }, []); 

  const userProperties = {
    Cargo: userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase(),
    Turno: userWorkingShift.charAt(0).toUpperCase() + userWorkingShift.slice(1).toLowerCase(),
    'Mail de la empresa': userCompanyEmail,
    'Teléfono de la empresa': userCompanyPhone,
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const uploadImageToBackend = async (base64Image) => {
    try {
      const payload = {
        image: base64Image 
      };
      const response = await modifyEmployee(id, payload);
      if (response && response.image) {
        setSelectedImage(response.image);
      }
    } catch (error) {
      console.error('Error en la carga de la imagen:', error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setSelectedImage(base64); 
      await uploadImageToBackend(base64); 
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={selectedImage}
          sx={{
            width: 150,
            height: 150,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Edit
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            cursor: 'pointer',
            color: '#12422C',
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: 0.5,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            fontSize: 30,
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
          onClick={() => document.getElementById('profile-image-upload').click()}
        />
        <input
          accept='image/*'
          style={{
            display: 'none' 
          }}
          id='profile-image-upload'
          type='file'
          onChange={handleImageChange}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 3 
        }}
      >
        <Typography
          sx={{
            fontSize: '22px',
            fontWeight: 500,
            letterSpacing: '0.5px',
            color: '#333',
          }}
        >
          {user.name} {user.surname}
        </Typography>
        <Divider
          sx={{
            width: '40%',
            borderBottomWidth: 2,
            marginTop: 1,
            borderColor: '#12422C' 
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: 3,
          width: '40%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: '#fff',
          padding: 2,
          borderRadius: 2,
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
        }}
      >
        {Object.entries(userProperties).map(([key, value]) => (
          <Box
            key={key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 1,
              borderRadius: 1,
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            {key === 'Cargo' && <Work
              sx={{
                marginRight: 1,
                color: '#12422C' 
              }}
            />}
            {key === 'Turno' && <AccessTime
              sx={{
                marginRight: 1,
                color: '#12422C' 
              }}
            />}
            {key === 'Mail de la empresa' && <Email
              sx={{
                marginRight: 1,
                color: '#12422C' 
              }}
            />}
            {key === 'Teléfono de la empresa' && <Phone
              sx={{
                marginRight: 1,
                color: '#12422C' 
              }}
            />}
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 400,
                letterSpacing: '0.3px',
                color: '#555' 
              }}
            >
              {key}: {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 2,
          cursor: 'pointer',
          color: '#12422C',
          '&:hover': {
            color: '#0c3d28',
          },
        }}
        onClick={() => setIsPasswordModalOpen(true)}
      >
        <IconButton
          sx={{
            color: 'inherit' 
          }}
        >
          <Lock />
        </IconButton>
        <Typography
          variant='body1'
          sx={{
            fontWeight: 500 
          }}
        >
          Cambiar contraseña
        </Typography>
      </Box>
      
      <ModalChangePassword
        title='Cambiar contraseña'
        description='Cambie aquí la contraseña'
        open={passwordModalOpen}
        handleClose={handlePasswordChange}
        emailProp={userPersonalEmail}
      />
    </Box>
  );
}
