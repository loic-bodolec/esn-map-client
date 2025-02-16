import './NewConsultantModal.scss';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useFetchClientsQuery } from '../../store/api/clientsApi';
import { useFetchTechnosQuery } from '../../store/api/technosApi';
import { useFetchWorksQuery } from '../../store/api/worksApi';
import { NewConsultant } from '../../types/Consultant';

interface NewConsultantModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (consultant: NewConsultant) => void;
}

const NewConsultantModal: React.FC<NewConsultantModalProps> = ({ open, onClose, onCreate }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [technoIds, setTechnoIds] = useState<number[]>([]);
  const [clientId, setClientId] = useState<number | null>(null);
  const [workId, setWorkId] = useState<number | null>(null);

  const { data: technos = [] } = useFetchTechnosQuery();
  const { data: clients = [] } = useFetchClientsQuery({});
  const { data: works = [] } = useFetchWorksQuery();

  useEffect(() => {
    if (open) {
      // Reset form fields when the modal opens
      setFirstname('');
      setLastname('');
      setTechnoIds([]);
      setClientId(null);
      setWorkId(null);
    }
  }, [open]);

  const handleFirstnameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
  }, []);

  const handleLastnameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
  }, []);

  const handleTechnoIdsChange = useCallback((e: SelectChangeEvent<number[]>) => {
    setTechnoIds(e.target.value as number[]);
  }, []);

  const handleClientIdChange = useCallback((e: SelectChangeEvent<number>) => {
    setClientId(e.target.value as number);
  }, []);

  const handleWorkIdChange = useCallback((e: SelectChangeEvent<number>) => {
    setWorkId(e.target.value as number);
  }, []);

  const handleSubmit = useCallback(() => {
    const newConsultant: NewConsultant = {
      firstname,
      lastname,
      technoIds,
      clientId: clientId ?? undefined,
      workId: workId ?? undefined,
    };

    onCreate(newConsultant);
  }, [firstname, lastname, technoIds, clientId, workId, onCreate]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Créer un consultant
        </Typography>
        <TextField
          label='Prénom'
          fullWidth
          value={firstname}
          onChange={handleFirstnameChange}
          className='modal-field'
        />
        <TextField
          label='Nom'
          fullWidth
          value={lastname}
          onChange={handleLastnameChange}
          className='modal-field'
        />
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Technologies</InputLabel>
          <Select multiple value={technoIds} onChange={handleTechnoIdsChange}>
            {technos.map((techno) => (
              <MenuItem key={techno.id} value={techno.id}>
                {techno.technoName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Client</InputLabel>
          <Select value={clientId ?? undefined} onChange={handleClientIdChange}>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Emploi</InputLabel>
          <Select value={workId ?? undefined} onChange={handleWorkIdChange}>
            {works.map((work) => (
              <MenuItem key={work.id} value={work.id}>
                {work.workName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default NewConsultantModal;
