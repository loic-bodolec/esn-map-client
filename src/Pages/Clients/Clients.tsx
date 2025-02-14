import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClientCard from '../../Components/ClientCard/ClientCard';
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal/ConfirmDeleteModal';
import NewClientModal from '../../Components/NewClientModal/NewClientModal';
import UpdateClientModal from '../../Components/UpdateClientModal/UpdateClientModal';
import { addClient, getClients, modifyClient, removeClient } from '../../store/clientsSlice';
import { getExpertises } from '../../store/expertisesSlice';
import { getJobs } from '../../store/jobsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { Client, NewClient, UpdatedClient } from '../../types/Client';
import './Clients.scss';

const Clients: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, status, error } = useSelector((state: RootState) => state.clients);
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const { expertises } = useSelector((state: RootState) => state.expertises);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  // State for managing modals
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);

  // State for filters
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  const [selectedExpertiseIds, setSelectedExpertiseIds] = useState<number[]>([]);

  // Temporary state for filters
  const [tempJobIds, setTempJobIds] = useState<number[]>([]);
  const [tempExpertiseIds, setTempExpertiseIds] = useState<number[]>([]);

  // Fetch jobs and expertises when the component mounts
  useEffect(() => {
    dispatch(getJobs());
    dispatch(getExpertises());
  }, [dispatch]);

  // Fetch clients when filters change
  useEffect(() => {
    dispatch(getClients({ jobIds: selectedJobIds, expertiseIds: selectedExpertiseIds }));
  }, [dispatch, selectedJobIds, selectedExpertiseIds]);

  // Handlers for opening and closing modals
  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleOpenUpdateModal = useCallback((client: Client) => {
    setClientToUpdate(client);
    setUpdateModalOpen(true);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setUpdateModalOpen(false);
    setClientToUpdate(null);
  }, []);

  const handleOpenConfirmModal = useCallback((client: Client) => {
    setClientToDelete(client);
    setConfirmModalOpen(true);
  }, []);

  const handleCloseConfirmModal = useCallback(() => {
    setConfirmModalOpen(false);
    setClientToDelete(null);
  }, []);

  // Handlers for CRUD operations
  const handleDeleteClient = useCallback(async () => {
    if (clientToDelete) {
      dispatch(removeClient(clientToDelete.id));
      handleCloseConfirmModal();
    }
  }, [clientToDelete, dispatch, handleCloseConfirmModal]);

  const handleUpdateClient = useCallback(
    async (updatedClient: UpdatedClient) => {
      dispatch(modifyClient(updatedClient));
      handleCloseUpdateModal();
    },
    [dispatch, handleCloseUpdateModal],
  );

  const handleCreateClient = async (newClient: NewClient) => {
    dispatch(addClient(newClient));
    handleCloseModal();
  };

  // Handlers for filters
  const handleTempJobChange = (event: SelectChangeEvent<number[]>) => {
    setTempJobIds(event.target.value as number[]);
  };

  const handleTempExpertiseChange = (event: SelectChangeEvent<number[]>) => {
    setTempExpertiseIds(event.target.value as number[]);
  };

  const handleApplyFilters = () => {
    setSelectedJobIds(tempJobIds);
    setSelectedExpertiseIds(tempExpertiseIds);
  };

  const handleResetFilters = () => {
    setTempJobIds([]);
    setTempExpertiseIds([]);
    setSelectedJobIds([]);
    setSelectedExpertiseIds([]);
  };

  // Memoized list of jobs and expertises to avoid unnecessary re-renders
  const memoizedJobs = useMemo(() => {
    return jobs.map((job) => (
      <MenuItem key={job.id} value={job.id}>
        {job.jobName}
      </MenuItem>
    ));
  }, [jobs]);

  const memoizedExpertises = useMemo(() => {
    return expertises.map((expertise) => (
      <MenuItem key={expertise.id} value={expertise.id}>
        {expertise.expertiseName}
      </MenuItem>
    ));
  }, [expertises]);

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color='error'>{error}</Typography>;
  }

  return (
    <Box className='clients-container'>
      <Typography variant='h4' className='clients-title'>
        Clients
      </Typography>
      <Box className='client-filters'>
        <FormControl variant='outlined' className='form-control'>
          <InputLabel id='job-select-label'>Métiers</InputLabel>
          <Select
            labelId='job-select-label'
            multiple
            value={tempJobIds}
            onChange={handleTempJobChange}
            label='Jobs'
            renderValue={(selected) =>
              selected.map((id) => jobs.find((job) => job.id === id)?.jobName).join(', ')
            }
          >
            {memoizedJobs}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className='form-control'>
          <InputLabel id='expertise-select-label'>Expertises</InputLabel>
          <Select
            labelId='expertise-select-label'
            multiple
            value={tempExpertiseIds}
            onChange={handleTempExpertiseChange}
            label='Expertises'
            renderValue={(selected) =>
              selected
                .map((id) => expertises.find((exp) => exp.id === id)?.expertiseName)
                .join(', ')
            }
          >
            {memoizedExpertises}
          </Select>
        </FormControl>
      </Box>
      <Box className='client-filters-buttons'>
        <Button variant='contained' color='primary' onClick={handleApplyFilters}>
          Appliquer
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleResetFilters}>
          Réinitialisation
        </Button>
      </Box>
      <List className='clients-list'>
        {clients.map((client) => (
          <ListItem key={client.id} sx={{ px: 0 }}>
            <ClientCard
              client={client}
              userRole={userRole}
              onEdit={handleOpenUpdateModal}
              onDelete={handleOpenConfirmModal}
            />
          </ListItem>
        ))}
      </List>
      {userRole === 'admin' && (
        <Button
          variant='contained'
          color='primary'
          className='clients-button'
          onClick={handleOpenModal}
        >
          Créer un client
        </Button>
      )}
      <NewClientModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateClient} />
      <UpdateClientModal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        client={clientToUpdate}
        onUpdate={handleUpdateClient}
      />
      <ConfirmDeleteModal
        open={confirmModalOpen}
        entityToDelete={clientToDelete}
        onClose={handleCloseConfirmModal}
        onDelete={handleDeleteClient}
      />
    </Box>
  );
};

export default memo(Clients);
