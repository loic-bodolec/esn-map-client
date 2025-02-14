import './NewTechnoModal.scss';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { NewTechno } from '../../types/Techno';

interface NewTechnoModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newTechno: NewTechno) => void;
}

const NewTechnoModal: React.FC<NewTechnoModalProps> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    if (!name.trim()) {
      setError('Le nom de la technologie ne peut pas être vide');
      return;
    }

    const newTechno: NewTechno = {
      technoName: name,
    };

    try {
      onCreate(newTechno);
      setName('');
      setError(null);
      onClose();
    } catch (error) {
      console.error('Failed to create techno', error);
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
          Créer une nouvelle technologie
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

export default NewTechnoModal;
