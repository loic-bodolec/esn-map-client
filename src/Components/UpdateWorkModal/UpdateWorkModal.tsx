import './UpdateWorkModal.scss';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { UpdatedWork, Work } from '../../types/Work';

interface UpdateWorkModalProps {
  open: boolean;
  onClose: () => void;
  work: Work | null;
  onUpdate: (work: UpdatedWork) => void;
}

const UpdateWorkModal: React.FC<UpdateWorkModalProps> = ({ open, onClose, work, onUpdate }) => {
  const [workName, setWorkName] = useState('');

  useEffect(() => {
    if (work) {
      setWorkName(work.workName);
    }
  }, [work]);

  const handleSubmit = () => {
    if (work) {
      const updatedWork: UpdatedWork = {
        id: work.id,
        workName,
      };

      onUpdate(updatedWork);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Mettre à jour l'emploi
        </Typography>
        <TextField
          label='Nom'
          fullWidth
          value={workName}
          onChange={(e) => setWorkName(e.target.value)}
          className='modal-field'
        />
        <Box className='modal-buttons'>
          <Button variant='contained' color='secondary' onClick={onClose}>
            Annuler
          </Button>
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Mettre à jour
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateWorkModal;
