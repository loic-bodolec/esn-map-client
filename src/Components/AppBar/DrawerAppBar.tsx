import './DrawerAppBar.scss';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import logo from '../../assets/logo-codeforge.webp';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store/store';

interface DrawerAppBarProps {
  readonly window?: () => Window;
}

const navItems = [
  { name: 'CARTE', path: '/carte' },
  {
    name: 'A PROPOS',
    subMenu: [
      { name: 'La société', path: '/societe' },
      { name: 'Nos forgerons', path: '/consultants' },
      { name: 'Nos clients', path: '/clients' },
      { name: 'Les utilisateurs', path: '/utilisateurs' },
    ],
  },
];

const DrawerAppBar: React.FC<DrawerAppBarProps> = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSubMenu = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/connexion');
  };

  const drawer = (
    <Box className='drawer'>
      <IconButton onClick={handleDrawerToggle} className='close-icon'>
        <CloseIcon fontSize='small' />
      </IconButton>
      <Typography variant='h6' className='title'>
        CodeForge
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <div key={item.name}>
            {item.subMenu ? (
              <Accordion className='accordion'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List component='div' disablePadding>
                    {item.subMenu.map((subItem) => (
                      <ListItem
                        key={subItem.name}
                        onClick={handleSubMenuClick}
                        className='menu-item'
                      >
                        <Typography>
                          <Link
                            to={subItem.path}
                            className={`link ${location.pathname === subItem.path ? 'active' : ''}`}
                          >
                            {subItem.name}
                          </Link>
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <ListItemButton
                component={Link}
                to={item.path}
                className={`list-item-button ${location.pathname === item.path ? 'active' : ''}`}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            )}
          </div>
        ))}
      </List>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleLogout}
        className='logout-button'
      >
        Déconnexion
      </Button>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className='drawer-app-bar'>
      <CssBaseline />
      <AppBar component='nav' className='app-bar'>
        <Toolbar className='toolbar'>
          <Box className='navbar'>
            <Link to='/carte' className='logo'>
              <img src={logo} alt='Company Logo' />
            </Link>
            <Typography variant='h6' className='username'>
              {user?.username} ({user?.role})
            </Typography>
          </Box>
          <Box className='toolbar-buttons'>
            {navItems.map((item) =>
              item.subMenu ? (
                <Fragment key={item.name}>
                  <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleOpenSubMenu}
                    className='menu-button'
                  >
                    {item.name}
                  </Button>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseSubMenu}
                  >
                    {item.subMenu.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        onClick={handleCloseSubMenu}
                        className='menu-item'
                      >
                        <Link
                          to={subItem.path}
                          className={`link ${location.pathname === subItem.path ? 'active' : ''}`}
                        >
                          {subItem.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Fragment>
              ) : (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  className={`menu-button ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.name}
                </Button>
              ),
            )}
            <Button
              variant='contained'
              color='secondary'
              onClick={handleLogout}
              className='logout-button'
            >
              Déconnexion
            </Button>
          </Box>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='end'
            onClick={handleDrawerToggle}
            className='menu-icon'
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          anchor='right'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile?
          }}
          classes={{ paper: 'drawer-paper' }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export default DrawerAppBar;
