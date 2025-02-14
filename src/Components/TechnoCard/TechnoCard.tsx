import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Techno } from '../../types/Techno';
import './TechnoCard.scss';

interface TechnoCardProps {
  techno: Techno;
  userRole: string | undefined;
  onEdit: (techno: Techno) => void;
  onDelete: (techno: Techno) => void;
}

const TechnoCard: React.FC<TechnoCardProps> = ({ techno, userRole, onEdit, onDelete }) => {
  return (
    <Card className='techno-card'>
      <CardContent>
        <Typography variant='h5'>{techno.technoName}</Typography>
      </CardContent>

      {userRole === 'admin' && (
        <CardActions className='techno-card-actions'>
          <IconButton edge='end' aria-label='edit' onClick={() => onEdit(techno)}>
            <EditIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete' onClick={() => onDelete(techno)}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default TechnoCard;
