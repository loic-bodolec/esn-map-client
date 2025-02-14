import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActions, CardContent, Typography, IconButton, Chip } from '@mui/material';
import { Client } from '../../types/Client';
import './ClientCard.scss';

interface ClientCardProps {
  client: Client;
  userRole: string | undefined;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, userRole, onEdit, onDelete }) => {
  return (
    <Card className='client-card'>
      <CardContent className='client-card-content'>
        <Typography variant='h5' className='client-card-title' style={{ fontWeight: 600 }}>
          {client.name}
        </Typography>
        <Typography
          component='span'
          variant='body2'
          color='textPrimary'
          className='client-card-activity'
          style={{ marginBottom: '0.5rem', fontWeight: 600 }}
        >
          {client.activity}
        </Typography>
        <Typography
          component='span'
          variant='body2'
          color='textPrimary'
          className='client-card-address'
        >
          {client.address}
        </Typography>
        {client.link && (
          <Typography
            component='span'
            variant='body2'
            color='textPrimary'
            className='client-card-link'
            style={{ marginTop: '0.5rem' }}
          >
            <a
              href={client.link}
              target='_blank'
              rel='noopener noreferrer'
              className='client-card-link'
            >
              {client.link}
            </a>
          </Typography>
        )}
        <div className='client-card-jobs'>
          <Typography component='span' variant='body2' color='textPrimary'>
            Métiers :
          </Typography>
          {client.jobs.map((job) => (
            <Chip key={job.id} label={job.jobName} className='job-chip' color='success' />
          ))}
        </div>
        <div className='client-card-expertises'>
          <Typography component='span' variant='body2' color='textPrimary'>
            Expertises :
          </Typography>
          {client.expertises.map((expertise) => (
            <Chip
              key={expertise.id}
              label={expertise.expertiseName}
              className='expertise-chip'
              color='primary'
            />
          ))}
        </div>
      </CardContent>

      {userRole === 'admin' && (
        <CardActions className='client-card-actions'>
          <IconButton edge='end' aria-label='edit' onClick={() => onEdit(client)}>
            <EditIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete' onClick={() => onDelete(client)}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ClientCard;
