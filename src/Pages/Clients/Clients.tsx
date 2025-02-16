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
import { memo, useCallback, useMemo, useState } from 'react';
import ClientCard from '../../Components/ClientCard/ClientCard';
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal/ConfirmDeleteModal';
import NewClientModal from '../../Components/NewClientModal/NewClientModal';
import UpdateClientModal from '../../Components/UpdateClientModal/UpdateClientModal';
import {
  useFetchClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from '../../api/clientsApi';
import { useFetchExpertisesQuery } from '../../api/expertisesApi';
import { useFetchJobsQuery } from '../../api/jobsApi';
import { RootState } from '../../store/store';
import { Client, NewClient, UpdatedClient } from '../../types/Client';
import './Clients.scss';
import { useSelector } from 'react-redux';

const Clients: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  // State for filters
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  const [selectedExpertiseIds, setSelectedExpertiseIds] = useState<number[]>([]);

  const {
    data: clients = [],
    error: clientsError,
    isLoading: clientsLoading,
  } = useFetchClientsQuery({ jobIds: selectedJobIds, expertiseIds: selectedExpertiseIds });
  const { data: jobs = [] } = useFetchJobsQuery();
  const { data: expertises = [] } = useFetchExpertisesQuery();
  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  // State for managing modals
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);

  // Temporary state for filters
  const [tempJobIds, setTempJobIds] = useState<number[]>([]);
  const [tempExpertiseIds, setTempExpertiseIds] = useState<number[]>([]);

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
      await deleteClient(clientToDelete.id);
      handleCloseConfirmModal();
    }
  }, [clientToDelete, deleteClient, handleCloseConfirmModal]);

  const handleUpdateClient = useCallback(
    async (updatedClient: UpdatedClient) => {
      await updateClient(updatedClient);
      handleCloseUpdateModal();
    },
    [updateClient, handleCloseUpdateModal],
  );

  const handleCreateClient = async (newClient: NewClient) => {
    await createClient(newClient);
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

  if (clientsLoading) {
    return <CircularProgress />;
  }

  if (clientsError) {
    return <Typography color='error'>{JSON.stringify(clientsError)}</Typography>;
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
