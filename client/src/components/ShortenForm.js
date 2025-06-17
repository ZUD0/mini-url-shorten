import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Checkbox, FormControlLabel, Typography, Alert } from '@mui/material';

function ShortenForm({ addShortenedUrl, user }) {
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      setError('You must agree to the terms.');
      return;
    }
    if (!longUrl) {
      setError('Please enter a long URL.');
      return;
    }
    if (!user) {
      setError('Please sign in to shorten URLs.');
      navigate('/');
      return;
    }
    // Mock API call
    const shortUrl = `tinyurl.com/${alias || Math.random().toString(36).slice(2, 9)}`;
    addShortenedUrl({ longUrl, shortUrl, alias, clicks: 0 });
    setLongUrl('');
    setAlias('');
    setAgree(false);
    setError('');
    navigate('/dashboard');
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter long link here"
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="https://example.com/long-url"
          />
          <TextField
            label="Customize your link (tinyurl.com/)"
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Enter alias"
          />
          <FormControlLabel
            control={<Checkbox checked={agree} onChange={() => setAgree(!agree)} />}
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Link to="/" style={{ color: '#1976d2' }}>Terms of Service</Link>,{' '}
                <Link to="/" style={{ color: '#1976d2' }}>Privacy Policy</Link>, and{' '}
                <Link to="/" style={{ color: '#1976d2' }}>Cookies</Link>.
              </Typography>
            }
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Shorten URL
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ShortenForm;