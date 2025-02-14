import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import logo from '../../assets/logo-codeforge.webp';
import './Login.scss';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(credentials));
    if (login.fulfilled.match(result)) {
      navigate('/carte');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box className='login-container'>
      <img src={logo} alt='Company Logo' className='company-logo' />
      <Typography variant='h4' className='login-title'>
        Bienvenue sur CodeForge
      </Typography>
      <Typography className='login-description'>
        Veuillez vous connecter pour accéder à la carte et gérer vos clients.
      </Typography>
      <form onSubmit={handleSubmit} className='login-form'>
        <TextField
          label="Nom d'utilisateur"
          name='username'
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          fullWidth
          required
          slotProps={{
            input: {
              inputProps: { 'data-testid': 'username-input' },
            },
          }}
        />
        <TextField
          label='Mot de passe'
          name='password'
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          fullWidth
          required
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                    data-testid='toggle-password-visibility'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              inputProps: { 'data-testid': 'password-input' },
            },
          }}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className='login-button'
          disabled={status === 'loading'}
          data-testid='submit-button'
        >
          {status === 'loading' ? 'Connexion...' : 'Se connecter'}
        </Button>
        {error && typeof error === 'string' && (
          <Typography color='error' data-testid='error-message'>
            {error}
          </Typography>
        )}
      </form>
      <Typography variant='body2' sx={{ marginTop: '2rem', textAlign: 'center' }}>
        Si vous n'avez pas de compte, veuillez contacter l'administrateur du site.
      </Typography>
    </Box>
  );
};

export default Login;
