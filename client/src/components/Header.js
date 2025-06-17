import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { auth } from '../firebase';

function Header({ user, setShowAuthModal }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          TinyURL
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/dashboard">My URLs</Button>
          <Button color="inherit" component={Link} to="/bulk">Bulk Shorten</Button>
          <Button color="inherit" component={Link} to="/branded">Branded Domains</Button>
          {user ? (
            <>
              <Typography variant="body1" component="span" sx={{ mr: 2 }}>{user.email}</Typography>
              <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
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