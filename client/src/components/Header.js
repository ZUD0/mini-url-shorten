import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton } from '@mui/material';
import { auth } from '../firebase';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function Header({ user, setShowAuthModal }) {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useContext(ThemeContext);

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  const username = user?.email ? user.email.split('@')[0] : 'User';

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          TinyURL
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Avatar src={user.photoURL || ''} alt={username} sx={{ width: 40, height: 40, borderRadius: '50%', mr: 2 }} />
              <Typography variant="body1" sx={{ mr: 2 }}>{username}</Typography>
              <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
              <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </>
          ) : (
            <Button color="inherit" onClick={() => setShowAuthModal(true)}>Sign In</Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;