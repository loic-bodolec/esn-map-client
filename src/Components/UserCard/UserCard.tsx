import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { User } from '../../types/User';
import './UserCard.scss';

interface UserCardProps {
  user: User;
  userRole: string | undefined;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, userRole, onEdit, onDelete }) => {
  return (
    <Card className='user-card'>
      <CardContent className='user-card-content'>
        <Typography variant='h5'>
          {user.firstname} {user.lastname}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {user.username}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {user.job}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {user.email}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {user.role}
        </Typography>
      </CardContent>

      {userRole === 'admin' && (
        <CardActions className='user-card-actions'>
          <IconButton edge='end' aria-label='edit' onClick={() => onEdit(user)}>
            <EditIcon />
          </IconButton>
          <IconButton edge='end' aria-label='delete' onClick={() => onDelete(user)}>
            <CloseIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default UserCard;
