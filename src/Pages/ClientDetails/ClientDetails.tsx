import { Box, CircularProgress, List, ListItem, Typography, Link, Chip } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ConsultantCard from '../../Components/ConsultantCard/ConsultantCard';
import { getClientById } from '../../store/clientsSlice';
import { AppDispatch, RootState } from '../../store/store';
import './ClientDetails.scss';

const ClientDetails: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { clientDetails, status, error } = useSelector((state: RootState) => state.clients);

  useEffect(() => {
    if (clientId) {
      dispatch(getClientById(Number(clientId)));
    }
  }, [clientId, dispatch]);

  if (status === 'loading') {
    return (
      <Box className='loading-container'>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box className='error-container'>
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  if (!clientDetails) {
    return null;
  }

  return (
    <Box className='client-details-container'>
      <Typography variant='h4' className='client-name'>
        {clientDetails.name}
      </Typography>
      <Typography variant='body1' className='client-address'>
        {clientDetails.address}
      </Typography>
      {clientDetails.link && (
        <Typography variant='body1' className='client-link'>
          <Link href={clientDetails.link} target='_blank' rel='noopener noreferrer'>
            Site web
          </Link>
        </Typography>
      )}
      <Typography variant='body1' className='client-activity' style={{ marginTop: '1rem' }}>
        Activité : {clientDetails.activity}
      </Typography>
      <Box className='client-jobs'>
        <Typography variant='body1'>Métiers :</Typography>
        {clientDetails.jobs.map((job) => (
          <Chip key={job.id} label={job.jobName} className='job-chip' color='success' />
        ))}
      </Box>
      <Box className='client-expertises'>
        <Typography variant='body1'>Expertises :</Typography>
        {clientDetails.expertises.map((expertise) => (
          <Chip
            key={expertise.id}
            label={expertise.expertiseName}
            className='expertise-chip'
            color='primary'
          />
        ))}
      </Box>
      <Box className='client-consultants'>
        <Typography variant='body1'>Consultants :</Typography>
        <List className='consultants-list'>
          {clientDetails.consultants?.map((consultant) => (
            <ListItem key={consultant.id} className='consultant-item'>
              <ConsultantCard consultant={consultant} showDetails={false} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ClientDetails;
