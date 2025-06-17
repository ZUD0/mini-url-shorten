import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Alert, Typography, Box } from '@mui/material';

function AuthModal({ setShowAuthModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setShowAuthModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setShowAuthModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog open={true} onClose={() => setShowAuthModal(false)}>
      <DialogTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleAuth}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              color="primary"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;