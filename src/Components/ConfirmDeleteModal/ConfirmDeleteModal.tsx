import { Alert, Box, Button, Modal, Typography } from '@mui/material';
import { Client } from '../../types/Client';
import { Consultant } from '../../types/Consultant';
import { Techno } from '../../types/Techno';
import { User } from '../../types/User';
import { Work } from '../../types/Work';
import './ConfirmDeleteModal.scss';

interface ConfirmDeleteModalProps {
  open: boolean;
  entityToDelete: Client | Consultant | Techno | Work | User | null;
  onClose: () => void;
  onDelete: () => void;
  errorMessage?: string | null;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  entityToDelete,
  onClose,
  onDelete,
  errorMessage,
}) => {
  const getEntityName = (): string => {
    if (entityToDelete) {
      if ('technoName' in entityToDelete) {
        return entityToDelete.technoName;
      } else if ('workName' in entityToDelete) {
        return entityToDelete.workName;
      } else if ('name' in entityToDelete) {
        return entityToDelete.name;
      } else if ('username' in entityToDelete) {
        return entityToDelete.username;
      } else if ('firstname' in entityToDelete && 'lastname' in entityToDelete) {
        return `${entityToDelete.firstname} ${entityToDelete.lastname}`;
      }
    }
    return '';
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='confirm-modal-box'>
        <Typography variant='h6' className='confirm-modal-title'>
          Confirmer la suppression
        </Typography>
        <Typography className='confirm-modal-text'>
          Êtes-vous sûr de vouloir supprimer {getEntityName()} ?
        </Typography>
        {errorMessage && (
          <Alert severity='error' className='confirm-modal-error'>
            {errorMessage}
          </Alert>
        )}
        <Box className='confirm-modal-buttons'>
          <Button variant='contained' color='secondary' onClick={onClose}>
            Annuler
          </Button>
          <Button variant='contained' color='primary' onClick={onDelete}>
            Supprimer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
