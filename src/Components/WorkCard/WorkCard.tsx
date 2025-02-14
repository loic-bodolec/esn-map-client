import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Work } from '../../types/Work';
import './WorkCard.scss';
interface WorkCardProps {
  work: Work;
  userRole: string | undefined;
  onEdit: (work: Work) => void;
  onDelete: (work: Work) => void;
}

const WorkCard: React.FC<WorkCardProps> = ({ work, userRole, onEdit, onDelete }) => {
  return (
    <Card className='work-card'>
      <CardContent className='work-card-content'>
        <Typography variant='h5'>{work.workName}</Typography>
      </CardContent>

      {userRole === 'admin' && (
        <CardActions className='work-card-actions'>
          <IconButton edge='end' aria-label='edit' onClick={() => onEdit(work)}>
            <EditIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete' onClick={() => onDelete(work)}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default WorkCard;
