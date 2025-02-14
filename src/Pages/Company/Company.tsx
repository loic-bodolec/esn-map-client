import { Box, Typography } from '@mui/material';
import './Company.scss';

const Company: React.FC = () => {
  return (
    <Box className='company-container'>
      <img src='/images/logo-codeforge.webp' alt='Company Logo' className='company-logo' />
      <Typography variant='h4' gutterBottom className='company-title'>
        CodeForge
      </Typography>
      <Typography variant='body1' className='company-body'>
        CodeForge est une entreprise de services numériques (ESN) spécialisée dans le développement
        de solutions digitales innovantes. Nous offrons une gamme complète de services, allant de la
        conception et du développement de logiciels à la gestion de projets et au conseil en
        technologies de l&apos;information.
      </Typography>
      <Typography variant='body1' className='company-body'>
        Notre mission est de fournir des solutions technologiques de haute qualité qui répondent aux
        besoins spécifiques de nos clients. Nous nous engageons à accompagner nos clients tout au
        long de leur transformation digitale, en leur offrant des services personnalisés et adaptés
        à leurs enjeux.
      </Typography>
      <Typography variant='body1' className='company-body'>
        Grâce à notre expertise et à notre approche centrée sur le client, nous sommes en mesure de
        proposer des solutions sur mesure qui permettent à nos clients de se démarquer dans un
        environnement numérique en constante évolution.
      </Typography>
    </Box>
  );
};

export default Company;
