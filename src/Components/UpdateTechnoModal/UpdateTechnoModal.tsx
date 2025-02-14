import './UpdateTechnoModal.scss';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Techno, UpdatedTechno } from '../../types/Techno';

interface UpdateTechnoModalProps {
  open: boolean;
  onClose: () => void;
  techno: Techno | null;
  onUpdate: (techno: UpdatedTechno) => void;
}

const UpdateTechnoModal: React.FC<UpdateTechnoModalProps> = ({
  open,
  onClose,
  techno,
  onUpdate,
}) => {
  const [technoName, setTechnoName] = useState('');

  useEffect(() => {
    if (techno) {
      setTechnoName(techno.technoName);
    }
  }, [techno]);

  const handleSubmit = () => {
    if (techno) {
      const updatedTechno: UpdatedTechno = {
        id: techno.id,
        technoName,
      };

      onUpdate(updatedTechno);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Mettre à jour la technologie
        </Typography>
        <TextField
          label='Nom'
          fullWidth
          value={technoName}
          onChange={(e) => setTechnoName(e.target.value)}
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

export default UpdateTechnoModal;
