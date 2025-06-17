import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, FormControl, InputLabel, Select, MenuItem, Button, Alert, Typography } from '@mui/material';

function BrandedDomain({ user }) {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mockDomains = ['tinyurl.com', 'yourbrand.link', 'mycompany.co'];

  const handleAddDomain = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in.');
      navigate('/');
      return;
    }
    if (!domain) {
      setError('Please select a domain.');
      return;
    }
    // Mock domain addition
    alert(`Domain ${domain} added! (Mock implementation)`);
    setDomain('');
    setError('');
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Branded Domains</Typography>
        <form onSubmit={handleAddDomain}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select or Enter Domain</InputLabel>
            <Select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            >
              <MenuItem value="">Choose a domain</MenuItem>
              {mockDomains.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Domain
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default BrandedDomain;