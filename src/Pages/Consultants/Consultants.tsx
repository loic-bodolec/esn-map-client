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
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal/ConfirmDeleteModal';
import ConsultantCard from '../../Components/ConsultantCard/ConsultantCard';
import NewConsultantModal from '../../Components/NewConsultantModal/NewConsultantModal';
import NewTechnoModal from '../../Components/NewTechnoModal/NewTechnoModal';
import NewWorkModal from '../../Components/NewWorkModal/NewWorkModal';
import TechnoCard from '../../Components/TechnoCard/TechnoCard';
import UpdateConsultantModal from '../../Components/UpdateConsultantModal/UpdateConsultantModal';
import UpdateTechnoModal from '../../Components/UpdateTechnoModal/UpdateTechnoModal';
import UpdateWorkModal from '../../Components/UpdateWorkModal/UpdateWorkModal';
import WorkCard from '../../Components/WorkCard/WorkCard';
import { getClients } from '../../store/clientsSlice';
import {
  addConsultant,
  getConsultants,
  modifyConsultant,
  removeConsultant,
} from '../../store/consultantsSlice';
import { AppDispatch, RootState } from '../../store/store';
import { addTechno, getTechnos, modifyTechno, removeTechno } from '../../store/technosSlice';
import { addWork, getWorks, modifyWork, removeWork } from '../../store/worksSlice';
import { Consultant, NewConsultant, UpdatedConsultant } from '../../types/Consultant';
import { NewTechno, Techno, UpdatedTechno } from '../../types/Techno';
import { NewWork, UpdatedWork, Work } from '../../types/Work';
import './Consultants.scss';

const Consultants: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const {
    consultants,
    status: consultantsStatus,
    error: consultantsError,
  } = useSelector((state: RootState) => state.consultants);
  const {
    technos,
    status: technosStatus,
    error: technosError,
  } = useSelector((state: RootState) => state.technos);
  const {
    works,
    status: worksStatus,
    error: worksError,
  } = useSelector((state: RootState) => state.works);
  const { clients } = useSelector((state: RootState) => state.clients);

  // State for filters
  const [selectedTechnoIds, setSelectedTechnoIds] = useState<number[]>([]);
  const [selectedWorkIds, setSelectedWorkIds] = useState<number[]>([]);
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);

  // Temporary state for filters
  const [tempTechnoIds, setTempTechnoIds] = useState<number[]>([]);
  const [tempWorkIds, setTempWorkIds] = useState<number[]>([]);
  const [tempClientIds, setTempClientIds] = useState<number[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [technoModalOpen, setTechnoModalOpen] = useState(false);
  const [updateTechnoModalOpen, setUpdateTechnoModalOpen] = useState(false);
  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [updateWorkModalOpen, setUpdateWorkModalOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<Consultant | Techno | Work | null>(null);
  const [consultantToUpdate, setConsultantToUpdate] = useState<Consultant | null>(null);
  const [technoToUpdate, setTechnoToUpdate] = useState<Techno | null>(null);
  const [workToUpdate, setWorkToUpdate] = useState<Work | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getConsultants({}));
    dispatch(getTechnos());
    dispatch(getWorks());
    dispatch(getClients({}));
  }, [dispatch]);

  // Fetch consultants when filters change
  useEffect(() => {
    dispatch(
      getConsultants({
        technoIds: selectedTechnoIds,
        workIds: selectedWorkIds,
        clientIds: selectedClientIds,
      }),
    );
  }, [dispatch, selectedTechnoIds, selectedWorkIds, selectedClientIds]);

  // Handlers for filters
  const handleTempTechnoChange = (event: SelectChangeEvent<number[]>) => {
    setTempTechnoIds(event.target.value as number[]);
  };

  const handleTempWorkChange = (event: SelectChangeEvent<number[]>) => {
    setTempWorkIds(event.target.value as number[]);
  };

  const handleTempClientChange = (event: SelectChangeEvent<number[]>) => {
    setTempClientIds(event.target.value as number[]);
  };

  const handleApplyFilters = () => {
    setSelectedTechnoIds(tempTechnoIds);
    setSelectedWorkIds(tempWorkIds);
    setSelectedClientIds(tempClientIds);
  };

  const handleResetFilters = () => {
    setTempTechnoIds([]);
    setTempWorkIds([]);
    setTempClientIds([]);
    setSelectedTechnoIds([]);
    setSelectedWorkIds([]);
    setSelectedClientIds([]);
  };

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleOpenUpdateModal = useCallback((consultant: Consultant) => {
    setConsultantToUpdate(consultant);
    setUpdateModalOpen(true);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setUpdateModalOpen(false);
    setConsultantToUpdate(null);
  }, []);

  const handleOpenConfirmModal = useCallback((entity: Consultant | Techno | Work) => {
    setEntityToDelete(entity);
    setConfirmModalOpen(true);
  }, []);

  const handleCloseConfirmModal = useCallback(() => {
    setConfirmModalOpen(false);
    setEntityToDelete(null);
    setDeleteError(null);
  }, []);

  const handleOpenTechnoModal = useCallback(() => {
    setTechnoModalOpen(true);
  }, []);

  const handleCloseTechnoModal = useCallback(() => {
    setTechnoModalOpen(false);
  }, []);

  const handleOpenUpdateTechnoModal = useCallback((techno: Techno) => {
    setTechnoToUpdate(techno);
    setUpdateTechnoModalOpen(true);
  }, []);

  const handleCloseUpdateTechnoModal = useCallback(() => {
    setUpdateTechnoModalOpen(false);
    setTechnoToUpdate(null);
  }, []);

  const handleOpenWorkModal = useCallback(() => {
    setWorkModalOpen(true);
  }, []);

  const handleCloseWorkModal = useCallback(() => {
    setWorkModalOpen(false);
  }, []);

  const handleOpenUpdateWorkModal = useCallback((work: Work) => {
    setWorkToUpdate(work);
    setUpdateWorkModalOpen(true);
  }, []);

  const handleCloseUpdateWorkModal = useCallback(() => {
    setUpdateWorkModalOpen(false);
    setWorkToUpdate(null);
  }, []);

  const handleDeleteEntity = useCallback(async () => {
    if (entityToDelete) {
      try {
        if ('firstname' in entityToDelete) {
          await dispatch(removeConsultant(entityToDelete.id)).unwrap();
        } else if ('technoName' in entityToDelete) {
          await dispatch(removeTechno(entityToDelete.id)).unwrap();
        } else if ('workName' in entityToDelete) {
          await dispatch(removeWork(entityToDelete.id)).unwrap();
        }
        dispatch(getConsultants({})); // Re-fetch consultants after deletion
        handleCloseConfirmModal();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setDeleteError(error.message || 'Erreur lors de la suppression.');
        } else {
          setDeleteError('Erreur lors de la suppression.');
        }
      }
    }
  }, [entityToDelete, dispatch, handleCloseConfirmModal]);

  const handleUpdateConsultant = useCallback(
    async (updatedConsultant: UpdatedConsultant) => {
      dispatch(modifyConsultant(updatedConsultant));
      handleCloseUpdateModal();
    },
    [dispatch, handleCloseUpdateModal],
  );

  const handleUpdateTechno = async (updatedTechno: UpdatedTechno) => {
    await dispatch(modifyTechno(updatedTechno));
    dispatch(getConsultants({})); // Re-fetch consultants after updating a techno
    handleCloseUpdateTechnoModal();
  };

  const handleUpdateWork = async (updatedWork: UpdatedWork) => {
    await dispatch(modifyWork(updatedWork));
    dispatch(getConsultants({})); // Re-fetch consultants after updating a work
    handleCloseUpdateWorkModal();
  };

  const handleCreateConsultant = async (newConsultant: NewConsultant) => {
    dispatch(addConsultant(newConsultant));
    handleCloseModal();
  };

  const handleCreateTechno = async (newTechno: NewTechno) => {
    dispatch(addTechno(newTechno));
    handleCloseTechnoModal();
  };

  const handleCreateWork = async (newWork: NewWork) => {
    dispatch(addWork(newWork));
    handleCloseWorkModal();
  };

  const renderLoadingOrError = () => {
    if (
      consultantsStatus === 'loading' ||
      technosStatus === 'loading' ||
      worksStatus === 'loading'
    ) {
      return <CircularProgress />;
    }

    if (consultantsStatus === 'failed') {
      return <Typography color='error'>{consultantsError}</Typography>;
    }

    if (technosStatus === 'failed') {
      return <Typography color='error'>{technosError}</Typography>;
    }

    if (worksStatus === 'failed') {
      return <Typography color='error'>{worksError}</Typography>;
    }

    return null;
  };

  // Memoized list of technos, works, and clients to avoid unnecessary re-renders
  const memoizedTechnos = useMemo(() => {
    return technos.map((techno) => (
      <MenuItem key={techno.id} value={techno.id}>
        {techno.technoName}
      </MenuItem>
    ));
  }, [technos]);

  const memoizedWorks = useMemo(() => {
    return works.map((work) => (
      <MenuItem key={work.id} value={work.id}>
        {work.workName}
      </MenuItem>
    ));
  }, [works]);

  const memoizedClients = useMemo(() => {
    return clients.map((client) => (
      <MenuItem key={client.id} value={client.id}>
        {client.name}
      </MenuItem>
    ));
  }, [clients]);

  const loadingOrError = renderLoadingOrError();
  if (loadingOrError) {
    return loadingOrError;
  }

  return (
    <Box className='consultants-container'>
      <Typography variant='h4' className='consultants-title'>
        Consultants
      </Typography>
      <Box className='consultant-filters'>
        <FormControl variant='outlined' className='form-control'>
          <InputLabel id='techno-select-label'>Technologies</InputLabel>
          <Select
            labelId='techno-select-label'
            multiple
            value={tempTechnoIds}
            onChange={handleTempTechnoChange}
            label='Technologies'
            renderValue={(selected) =>
              selected
                .map((id) => technos.find((techno) => techno.id === id)?.technoName)
                .join(', ')
            }
          >
            {memoizedTechnos}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className='form-control'>
          <InputLabel id='work-select-label'>Emplois</InputLabel>
          <Select
            labelId='work-select-label'
            multiple
            value={tempWorkIds}
            onChange={handleTempWorkChange}
            label='Emplois'
            renderValue={(selected) =>
              selected.map((id) => works.find((work) => work.id === id)?.workName).join(', ')
            }
          >
            {memoizedWorks}
          </Select>
        </FormControl>
        <FormControl variant='outlined' className='form-control'>
          <InputLabel id='client-select-label'>Clients</InputLabel>
          <Select
            labelId='client-select-label'
            multiple
            value={tempClientIds}
            onChange={handleTempClientChange}
            label='Clients'
            renderValue={(selected) =>
              selected.map((id) => clients.find((client) => client.id === id)?.name).join(', ')
            }
          >
            {memoizedClients}
          </Select>
        </FormControl>
      </Box>
      <Box className='consultant-filters-buttons'>
        <Button variant='contained' color='primary' onClick={handleApplyFilters}>
          Appliquer
        </Button>
        <Button variant='outlined' color='secondary' onClick={handleResetFilters}>
          Réinitialisation
        </Button>
      </Box>
      <List className='consultants-list'>
        {consultants.map((consultant) => (
          <ListItem key={consultant.id}>
            <ConsultantCard
              consultant={consultant}
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
          className='consultants-button'
          onClick={handleOpenModal}
        >
          Créer un consultant
        </Button>
      )}
      <Box className='technos-container'>
        <Typography variant='h4' className='technos-title'>
          Technologies
        </Typography>
        <List className='technos-list'>
          {technos.map((techno) => (
            <ListItem key={techno.id}>
              <TechnoCard
                techno={techno}
                userRole={userRole}
                onEdit={handleOpenUpdateTechnoModal}
                onDelete={handleOpenConfirmModal}
              />
            </ListItem>
          ))}
        </List>
        {userRole === 'admin' && (
          <Button
            variant='contained'
            color='primary'
            className='consultants-button'
            onClick={handleOpenTechnoModal}
          >
            Créer une technologie
          </Button>
        )}
      </Box>
      <Box className='works-container'>
        <Typography variant='h4' className='works-title'>
          Emplois
        </Typography>
        <List className='works-list'>
          {works.map((work) => (
            <ListItem key={work.id}>
              <WorkCard
                work={work}
                userRole={userRole}
                onEdit={handleOpenUpdateWorkModal}
                onDelete={handleOpenConfirmModal}
              />
            </ListItem>
          ))}
        </List>
        {userRole === 'admin' && (
          <Button
            variant='contained'
            color='primary'
            className='consultants-button'
            onClick={handleOpenWorkModal}
          >
            Créer un emploi
          </Button>
        )}
      </Box>
      <NewConsultantModal
        open={modalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateConsultant}
      />
      <UpdateConsultantModal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        consultant={consultantToUpdate}
        onUpdate={handleUpdateConsultant}
      />
      <UpdateTechnoModal
        open={updateTechnoModalOpen}
        onClose={handleCloseUpdateTechnoModal}
        techno={technoToUpdate}
        onUpdate={handleUpdateTechno}
      />
      <UpdateWorkModal
        open={updateWorkModalOpen}
        onClose={handleCloseUpdateWorkModal}
        work={workToUpdate}
        onUpdate={handleUpdateWork}
      />
      <ConfirmDeleteModal
        open={confirmModalOpen}
        entityToDelete={entityToDelete}
        onClose={handleCloseConfirmModal}
        onDelete={handleDeleteEntity}
        errorMessage={deleteError}
      />
      <NewTechnoModal
        open={technoModalOpen}
        onClose={handleCloseTechnoModal}
        onCreate={handleCreateTechno}
      />
      <NewWorkModal
        open={workModalOpen}
        onClose={handleCloseWorkModal}
        onCreate={handleCreateWork}
      />
    </Box>
  );
};

export default memo(Consultants);
