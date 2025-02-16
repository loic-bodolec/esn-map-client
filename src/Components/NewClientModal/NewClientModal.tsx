import './NewClientModal.scss';
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
import { useCallback, useMemo, useState } from 'react';
import { useFetchExpertisesQuery } from '../../store/api/expertisesApi';
import { useFetchJobsQuery } from '../../store/api/jobsApi';
import { NewClient } from '../../types/Client';

interface NewClientModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newClient: NewClient) => void;
}

const NewClientModal: React.FC<NewClientModalProps> = ({ open, onClose, onCreate }) => {
  const { data: expertises = [] } = useFetchExpertisesQuery();
  const { data: jobs = [] } = useFetchJobsQuery();

  // State for form fields
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<string | undefined>(undefined);
  const [longitude, setLongitude] = useState<string | undefined>(undefined);
  const [logo, setLogo] = useState<string | null>(null);
  const [link, setLink] = useState<string | null>(null);
  const [expertiseIds, setExpertiseIds] = useState<number[]>([]);
  const [jobIds, setJobIds] = useState<number[]>([]);

  // Handler for form submission
  const handleSubmit = useCallback(async () => {
    const newClient: NewClient = {
      name,
      activity,
      address,
      latitude,
      longitude,
      logo,
      link,
      expertiseIds,
      jobIds,
    };

    try {
      onCreate(newClient);
      // Reset form fields
      setName('');
      setActivity('');
      setAddress('');
      setLatitude(undefined);
      setLongitude(undefined);
      setLogo(null);
      setLink(null);
      setExpertiseIds([]);
      setJobIds([]);
      onClose();
    } catch (error) {
      console.error('Failed to create client', error);
    }
  }, [
    name,
    activity,
    address,
    latitude,
    longitude,
    logo,
    link,
    expertiseIds,
    jobIds,
    onCreate,
    onClose,
  ]);

  // Memoized list of expertises to avoid unnecessary re-renders
  const memoizedExpertises = useMemo(() => {
    return expertises.map((expertise) => (
      <MenuItem key={expertise.id} value={expertise.id}>
        {expertise.expertiseName}
      </MenuItem>
    ));
  }, [expertises]);

  // Memoized list of jobs to avoid unnecessary re-renders
  const memoizedJobs = useMemo(() => {
    return jobs.map((job) => (
      <MenuItem key={job.id} value={job.id}>
        {job.jobName}
      </MenuItem>
    ));
  }, [jobs]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Créer un nouveau client
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
        <TextField
          label='Adresse'
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className='modal-field'
        />
        <FormControl fullWidth className='modal-field'>
          <InputLabel id='expertise-label'>Expertises</InputLabel>
          <Select
            labelId='expertise-label'
            multiple
            value={expertiseIds}
            onChange={(e) => setExpertiseIds(e.target.value as number[])}
            renderValue={(selected) =>
              selected
                .map((id) => expertises.find((exp) => exp.id === id)?.expertiseName)
                .join(', ')
            }
          >
            {memoizedExpertises}
          </Select>
        </FormControl>
        <FormControl fullWidth className='modal-field'>
          <InputLabel id='job-label'>Métiers</InputLabel>
          <Select
            labelId='job-label'
            multiple
            value={jobIds}
            onChange={(e) => setJobIds(e.target.value as number[])}
            renderValue={(selected) =>
              selected.map((id) => jobs.find((job) => job.id === id)?.jobName).join(', ')
            }
          >
            {memoizedJobs}
          </Select>
        </FormControl>
        <TextField
          label='Latitude'
          fullWidth
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Longitude'
          fullWidth
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Logo'
          fullWidth
          value={logo ?? ''}
          onChange={(e) => setLogo(e.target.value)}
          className='modal-field'
        />
        <TextField
          label='Lien'
          fullWidth
          value={link ?? ''}
          onChange={(e) => setLink(e.target.value)}
          className='modal-field'
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

export default NewClientModal;
