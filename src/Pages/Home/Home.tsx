import { Box } from '@mui/material';
import MapComponent from '../../Components/MapComponant/MapComponant';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <Box className='home-container'>
      <MapComponent />
    </Box>
  );
};

export default Home;
