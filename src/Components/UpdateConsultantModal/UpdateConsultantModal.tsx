import './UpdateConsultantModal.scss';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchClients } from '../../api/clients';
import { fetchTechnos } from '../../api/technos';
import { fetchWorks } from '../../api/works';
import { Consultant, UpdatedConsultant } from '../../types/Consultant';

interface UpdateConsultantModalProps {
  open: boolean;
  onClose: () => void;
  consultant: Consultant | null;
  onUpdate: (consultant: UpdatedConsultant) => void;
}

const UpdateConsultantModal: React.FC<UpdateConsultantModalProps> = ({
  open,
  onClose,
  consultant,
  onUpdate,
}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [technoIds, setTechnoIds] = useState<number[]>([]);
  const [clientId, setClientId] = useState<number>(0);
  const [workId, setWorkId] = useState<number>(0);
  const [technos, setTechnos] = useState<{ id: number; technoName: string }[]>([]);
  const [clients, setClients] = useState<{ id: number; name: string }[]>([]);
  const [works, setWorks] = useState<{ id: number; workName: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [technosData, clientsData, worksData] = await Promise.all([
        fetchTechnos(),
        fetchClients({}),
        fetchWorks(),
      ]);
      setTechnos(technosData);
      setClients(clientsData);
      setWorks(worksData);
    };

    if (open) {
      fetchData();
      if (consultant) {
        setFirstname(consultant.firstname);
        setLastname(consultant.lastname);
        setTechnoIds(consultant.technos.map((techno) => techno.id));
        setClientId(consultant.client.id);
        setWorkId(consultant.work.id);
      }
    }
  }, [open, consultant]);

  const handleSubmit = () => {
    if (consultant) {
      const updatedConsultant: UpdatedConsultant = {
        id: consultant.id,
        firstname,
        lastname,
        technoIds,
        clientId,
        workId,
      };

      onUpdate(updatedConsultant);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Mettre à jour le consultant
        </Typography>
        <TextField
          label='Prénom'
          fullWidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Nom'
          fullWidth
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className='modal-field'
        />
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Technologies</InputLabel>
          <Select
            multiple
            value={technoIds}
            onChange={(e) => setTechnoIds(e.target.value as number[])}
          >
            {technos.map((techno) => (
              <MenuItem key={techno.id} value={techno.id}>
                {techno.technoName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Client</InputLabel>
          <Select
            value={clientId ?? undefined}
            onChange={(e) => setClientId(e.target.value as number)}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Emploi</InputLabel>
          <Select value={workId ?? undefined} onChange={(e) => setWorkId(e.target.value as number)}>
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
            Mettre à jour
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateConsultantModal;
