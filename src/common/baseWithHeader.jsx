import {
  Box 
} from '@mui/material';
import {
  Outlet 
} from 'react-router-dom';
import {
  Header 
} from '../components/Header/Header';
import {
  HEIGHT_HEADER 
} from '../config';

const BaseWithHeader = ({
  logoOnly, redirectLogo
}) => {
  return (
    <Box>
      <Header
        logoOnly={logoOnly}
        redirectLogo={redirectLogo}
      />
      <Box
        marginTop={'64px'}
        minHeight={`calc(100vh - ${HEIGHT_HEADER})`}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default BaseWithHeader;
