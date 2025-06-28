import React, { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Alert, Typography } from '@mui/material';

function BulkShorten({ addShortenedUrl, user }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in.');
      navigate('/');
      return;
    }
    if (!file) {
      setError('Please upload a CSV file.');
      return;
    }
    Papa.parse(file, {
      complete: (result) => {
        result.data.forEach((row) => {
          if (row[0]) { // Assume first column is long URL
            const shortUrl = `tinyurl.com/${Math.random().toString(36).slice(2, 9)}`;
            addShortenedUrl({ longUrl: row[0], shortUrl, alias: '', clicks: 0 });
          }
        });
        navigate('/dashboard');
      },
      header: false,
    });
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Bulk Shorten URLs</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Upload CSV (long URLs in first column)"
            type="file"
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: '.csv' }}
            onChange={(e) => setFile(e.target.files[0])}
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
            Shorten URLs
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default BulkShorten;