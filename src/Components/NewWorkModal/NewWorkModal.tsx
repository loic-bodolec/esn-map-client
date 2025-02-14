import './NewWorkModal.scss';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { NewWork } from '../../types/Work';

interface NewWorkModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newWork: NewWork) => void;
}

const NewWorkModal: React.FC<NewWorkModalProps> = ({ open, onClose, onCreate }) => {
  // State for form fields
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Handler for form submission
  const handleSubmit = useCallback(async () => {
    if (!name.trim()) {
      setError("Le nom de l'emploi ne peut pas être vide");
      return;
    }

    const newWork: NewWork = {
      workName: name,
    };

    try {
      onCreate(newWork);
      // Reset form fields
      setName('');
      setError(null);
      onClose();
    } catch (error) {
      console.error('Failed to create work', error);
    }
  }, [name, onCreate, onClose]);

  useEffect(() => {
    if (!open) {
      setError(null);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Créer un nouvel emploi
        </Typography>
        <TextField
          label='Nom'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='modal-field'
          error={!!error}
          helperText={error}
        />
        <Box className='modal-buttons'>
          <Button variant='contained' color='secondary' onClick={onClose}>
            Annuler
          </Button>
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Créer
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewWorkModal;
