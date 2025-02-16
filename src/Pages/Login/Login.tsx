import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/authApi';
import logo from '../../assets/logo-codeforge.webp';
import './Login.scss';

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(credentials).unwrap();
      // Stockez le token et l'utilisateur dans le sessionStorage
      sessionStorage.setItem(
        'user',
        JSON.stringify({ username: result.username, role: result.role }),
      );
      sessionStorage.setItem('token', result.token);
      navigate('/carte');
    } catch (err) {
      console.error('Failed to login:', err);
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
          disabled={isLoading}
          data-testid='submit-button'
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </Button>
        {error && 'data' in error && typeof error.data === 'string' && (
          <Typography color='error' data-testid='error-message'>
            {error.data}
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
