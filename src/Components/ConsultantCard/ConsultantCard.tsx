import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActions, CardContent, Chip, IconButton, Typography } from '@mui/material';
import { Consultant } from '../../types/Consultant';
import './ConsultantCard.scss';

interface ConsultantCardProps {
  consultant: Consultant;
  userRole?: string;
  onEdit?: (consultant: Consultant) => void;
  onDelete?: (consultant: Consultant) => void;
  showDetails?: boolean;
}

const ConsultantCard: React.FC<ConsultantCardProps> = ({
  consultant,
  userRole,
  onEdit,
  onDelete,
  showDetails = true,
}) => {
  return (
    <Card className='consultant-card'>
      <CardContent className='consultant-card-content'>
        <Typography variant='h5' className='consultant-card-title'>
          {consultant.firstname} {consultant.lastname}
        </Typography>
        <Typography
          component='span'
          variant='body2'
          color='textPrimary'
          className='consultant-card-work'
        >
          {consultant.work.workName}
        </Typography>
        {showDetails && (
          <>
            <Typography
              component='span'
              variant='body2'
              color='textPrimary'
              className='consultant-card-client'
            >
              {consultant.client.name}
            </Typography>
            <div className='consultant-card-technos'>
              {consultant.technos.map((techno) => (
                <Chip
                  key={techno.id}
                  label={techno.technoName}
                  className='consultant-techno-chip'
                />
              ))}
            </div>
          </>
        )}
      </CardContent>

      {userRole === 'admin' && (
        <CardActions className='consultant-card-actions'>
          <IconButton edge='end' aria-label='edit' onClick={() => onEdit && onEdit(consultant)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => onDelete && onDelete(consultant)}
          >
            <CloseIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default ConsultantCard;
