import './UpdateClientModal.scss';
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
import { useFetchExpertisesQuery } from '../../api/expertisesApi';
import { useFetchJobsQuery } from '../../api/jobsApi';
import { Client, UpdatedClient } from '../../types/Client';

interface UpdateClientModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
  onUpdate: (client: UpdatedClient) => void;
}

const UpdateClientModal: React.FC<UpdateClientModalProps> = ({
  open,
  onClose,
  client,
  onUpdate,
}) => {
  const { data: expertises = [] } = useFetchExpertisesQuery();
  const { data: jobs = [] } = useFetchJobsQuery();

  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [expertiseIds, setExpertiseIds] = useState<number[]>([]);
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [logo, setLogo] = useState('');
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    if (client) {
      setName(client.name);
      setActivity(client.activity);
      setExpertiseIds(client.expertises.map((expertise) => expertise.id));
      setJobIds(client.jobs.map((job) => job.id));
      setAddress(client.address);
      setLatitude(client.latitude.toString());
      setLongitude(client.longitude.toString());
      setLogo(client.logo ?? '');
      setLink(client.link ?? '');
    }
  }, [client]);

  const handleSubmit = () => {
    if (client) {
      const updatedClient: UpdatedClient = {
        id: client.id,
        name,
        activity,
        expertiseIds,
        jobIds,
        address,
        latitude,
        longitude,
        logo,
        link,
      };

      onUpdate(updatedClient);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Mettre à jour le client
        </Typography>
        <TextField
          label='Nom'
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Activité'
          fullWidth
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className='modal-field'
        />
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Expertises</InputLabel>
          <Select
            multiple
            value={expertiseIds}
            onChange={(e) => setExpertiseIds(e.target.value as number[])}
          >
            {expertises.map((expertise) => (
              <MenuItem key={expertise.id} value={expertise.id}>
                {expertise.expertiseName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth className='modal-field'>
          <InputLabel>Métiers</InputLabel>
          <Select multiple value={jobIds} onChange={(e) => setJobIds(e.target.value as number[])}>
            {jobs.map((job) => (
              <MenuItem key={job.id} value={job.id}>
                {job.jobName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Adresse'
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Latitude'
          fullWidth
          type='text'
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Longitude'
          fullWidth
          type='text'
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Logo'
          fullWidth
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Lien'
          fullWidth
          value={link}
          onChange={(e) => setLink(e.target.value)}
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

export default UpdateClientModal;
