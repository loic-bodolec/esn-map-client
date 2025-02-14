import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import './ProtectedLayout.scss';
import DrawerAppBar from '../AppBar/DrawerAppBar';
import Footer from '../Footer/Footer';

const ProtectedLayout: React.FC = () => {
  return (
    <Box className='protected-layout'>
      <DrawerAppBar />
      <Box component='main' className='main-content'>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default ProtectedLayout;
