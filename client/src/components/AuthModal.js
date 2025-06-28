import React, { useState, useContext } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Alert, Typography, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function AuthModal({ setShowAuthModal }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
      }
      setShowAuthModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      setShowAuthModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={() => setShowAuthModal(false)}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(10, 25, 47, 0.85)', // Dark blue with transparency for frosted effect
          backdropFilter: 'blur(10px)', // Apply blur for frosted glass effect
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)', // Enhanced shadow for contrast
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ color: '#10b981', fontWeight: 'bold', textAlign: 'center' }}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleAuth}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white' }, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.15)', color: 'white' }, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#b71c1c' }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: '#10b981', '&:hover': { backgroundColor: '#0f9a76' }, borderRadius: 1 }}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2, borderRadius: 1, backgroundColor: 'rgba(220, 53, 69, 0.9)', '&:hover': { backgroundColor: 'rgba(220, 53, 69, 1)' } }}
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </form>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="text.secondary" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', p: 1, borderRadius: 1, color: 'white' }}>
            {isSignUp ? 'Already have an account?' : 'Need an account?'}{' '}
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              color="primary"
              sx={{ textTransform: 'none', color: '#10b981' }}
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

