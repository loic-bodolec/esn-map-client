import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DivIcon, LatLngExpression } from 'leaflet';
import { useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { useFetchClientsQuery } from '../../store/api/clientsApi';
import { useFetchExpertisesQuery } from '../../store/api/expertisesApi';
import { useFetchJobsQuery } from '../../store/api/jobsApi';
import './MapComponant.scss';

// Create a new marker icon
const createCustomMarkerIcon = (name: string, iconUrl?: string) =>
  new DivIcon({
    className: 'custom-icon',
    html: iconUrl
      ? `
        <div style="padding: 1px; background: white; border-radius: 50%;">
          <img src="${iconUrl}" alt="Custom Icon" style="border-radius: 50%; width: 50px; height: 50px;" />
        </div>
      `
      : `
      <div style="display: inline-block; padding: 6px; background: #007BFF; border-radius: 10%; text-align: center, font-size: 1.2rem; color: white; font-weight: bold; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);">
      ${name}
    </div>
      `,
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });

const MapComponent: React.FC = () => {
  const [selectedJobIds, setSelectedJobIds] = useState<number[]>([]);
  const [selectedExpertiseIds, setSelectedExpertiseIds] = useState<number[]>([]);

  // Temporary state for filters
  const [tempJobIds, setTempJobIds] = useState<number[]>([]);
  const [tempExpertiseIds, setTempExpertiseIds] = useState<number[]>([]);

  const { data: jobs = [] } = useFetchJobsQuery();
  const { data: expertises = [] } = useFetchExpertisesQuery();
  const {
    data: clients = [],
    error,
    isLoading,
  } = useFetchClientsQuery({
    jobIds: selectedJobIds,
    expertiseIds: selectedExpertiseIds,
  });

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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color='error'>{JSON.stringify(error)}</Typography>;
  }

  return (
    <Box className='map-container'>
      <Box className='map-filters'>
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
        <Box className='map-filters-buttons'>
          <Button variant='contained' color='primary' onClick={handleApplyFilters}>
            Appliquer
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleResetFilters}>
            Réinitialisation
          </Button>
        </Box>
      </Box>

      <MapContainer
        data-testid='mapContainer'
        center={[47.21225, -1.55127] as LatLngExpression}
        zoom={13}
        className='map'
        placeholder={<div style={{ height: '80vh' }}>Chargement de la carte...</div>}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`}
          id='mapbox/streets-v11'
        />
        {clients.map((client) => (
          <Marker
            key={client.id}
            position={[Number(client.latitude), Number(client.longitude)] as LatLngExpression}
            icon={createCustomMarkerIcon(client.name, client.logo ?? undefined)}
          >
            <Popup>
              <div className='popup-content'>
                <h3 className='popup-title'>{client.name}</h3>
                <p className='popup-address'>{client.address}</p>
                {client.link && (
                  <p className='popup-link'>
                    <a href={client.link} target='_blank' rel='noopener noreferrer'>
                      Site web
                    </a>
                  </p>
                )}
                {client.activity && <p className='popup-activity'>Activité : {client.activity}</p>}
                {client.jobs && (
                  <p className='popup-jobs'>
                    Métiers :{' '}
                    {client.jobs.map((job: { jobName: string }) => job.jobName).join(', ')}
                  </p>
                )}
                {client.expertises && (
                  <p className='popup-expertises'>
                    Expertises :{' '}
                    {client.expertises
                      .map((expertise: { expertiseName: string }) => expertise.expertiseName)
                      .join(', ')}
                  </p>
                )}
                <Button
                  className='popup-details-button'
                  variant='outlined'
                  component={Link}
                  size='small'
                  to={`/client-details/${client.id}`}
                >
                  Détails
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
