import './UpdateUserModal.scss';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { ValidationError } from 'yup';
import { UpdatedUser, User } from '../../types/User';

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUpdate: (updatedUser: UpdatedUser) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ open, onClose, user, onUpdate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [jobError, setJobError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [isPasswordModified, setIsPasswordModified] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setJob(user.job);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  // Function to reset form fields
  const resetFormFields = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setFirstname('');
    setLastname('');
    setJob('');
    setEmail('');
    setRole('user');
    setShowPassword(false);
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setUsernameError('');
    setFirstnameError('');
    setLastnameError('');
    setJobError('');
    setRoleError('');
    setIsPasswordModified(false);
  };

  // Validation schema
  const validationSchema = yup.object().shape({
    username: yup.string().required("Nom d'utilisateur est requis"),
    password: yup.string().when('isPasswordModified', {
      is: true,
      then: (schema) =>
        schema.matches(
          /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[\W_])(?=\S{8,30}$).+/,
          'Ton mot de passe doit être entre 8 et 30 caractères (au moins 1 majuscule, au moins 2 chiffres, au moins 1 symbole et sans espace)!',
        ),
    }),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Les mots de passe ne correspondent pas'),
    firstname: yup.string().required('Prénom est requis'),
    lastname: yup.string().required('Nom est requis'),
    job: yup.string().required('Emploi est requis'),
    email: yup.string().email("Format de l'email invalide").required('Email est requis'),
    role: yup.string().oneOf(['admin', 'user'], 'Rôle invalide').required('Rôle est requis'),
    isPasswordModified: yup.boolean().default(false),
  });

  // Handler for form submission
  const handleSubmit = useCallback(async () => {
    try {
      await validationSchema.validate(
        {
          username,
          password,
          confirmPassword,
          firstname,
          lastname,
          job,
          email,
          role,
          isPasswordModified,
        },
        { abortEarly: false },
      );

      if (!user) {
        console.error('User is null');
        return;
      }

      const updatedUser: UpdatedUser = {
        id: user.id,
        username,
        password,
        firstname,
        lastname,
        job,
        email,
        role,
      };

      onUpdate(updatedUser);
      onClose();
    } catch (errors) {
      if (errors instanceof ValidationError) {
        errors.inner.forEach((error) => {
          switch (error.path) {
            case 'username':
              setUsernameError(error.message);
              break;
            case 'password':
              setPasswordError(error.message);
              break;
            case 'confirmPassword':
              setConfirmPasswordError(error.message);
              break;
            case 'firstname':
              setFirstnameError(error.message);
              break;
            case 'lastname':
              setLastnameError(error.message);
              break;
            case 'job':
              setJobError(error.message);
              break;
            case 'email':
              setEmailError(error.message);
              break;
            case 'role':
              setRoleError(error.message);
              break;
            default:
              break;
          }
        });
      }
    }
  }, [
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
    job,
    email,
    role,
    isPasswordModified,
    onUpdate,
    onClose,
    user,
    validationSchema,
  ]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
    setIsPasswordModified(true);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError('');
  };

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(e.target.value);
    setFirstnameError('');
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(e.target.value);
    setLastnameError('');
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value);
    setJobError('');
  };

  const handleRoleChange = (e: SelectChangeEvent<'admin' | 'user'>) => {
    setRole(e.target.value as 'admin' | 'user');
    setRoleError('');
  };

  const handleClose = () => {
    resetFormFields();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className='modal-box'>
        <Typography variant='h6' className='modal-title'>
          Mettre à jour l'utilisateur
        </Typography>
        <TextField
          label="Nom de l'utilisateur"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
          className='modal-field'
          error={!!usernameError}
          helperText={usernameError}
        />
        <TextField
          label='Mot de passe'
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          className='modal-field'
          error={!!passwordError}
          helperText={passwordError}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClickShowPassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label='Confirmer le mot de passe'
          type={showPassword ? 'text' : 'password'}
          fullWidth
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className='modal-field'
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleClickShowPassword} edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label='Prénom'
          fullWidth
          value={firstname}
          onChange={handleFirstnameChange}
          className='modal-field'
          error={!!firstnameError}
          helperText={firstnameError}
        />
        <TextField
          label='Nom'
          fullWidth
          value={lastname}
          onChange={handleLastnameChange}
          className='modal-field'
          error={!!lastnameError}
          helperText={lastnameError}
        />
        <TextField
          label='Emploi'
          fullWidth
          value={job}
          onChange={handleJobChange}
          className='modal-field'
          error={!!jobError}
          helperText={jobError}
        />
        <TextField
          label='Email'
          fullWidth
          value={email}
          onChange={handleEmailChange}
          className='modal-field'
          error={!!emailError}
          helperText={emailError}
        />
        <FormControl fullWidth className='modal-field' error={!!roleError}>
          <InputLabel id='role-label'>Rôle</InputLabel>
          <Select labelId='role-label' value={role} onChange={handleRoleChange} label='Rôle'>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </Select>
          {roleError && <Typography color='error'>{roleError}</Typography>}
        </FormControl>
        <Box className='modal-buttons'>
          <Button variant='contained' color='secondary' onClick={handleClose}>
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

export default UpdateUserModal;
