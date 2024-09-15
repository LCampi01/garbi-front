import {
  Box, Divider
} from '@mui/material';
import {
  BreadcrumbsComponent
} from '../../components/BreadcrumbsComponent';

const PerfilPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '16px 32px',
        }}
      >
        <BreadcrumbsComponent
          title={'Perfil'}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default PerfilPage;
