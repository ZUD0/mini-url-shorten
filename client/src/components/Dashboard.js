import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Box } from '@mui/material';

function Dashboard({ shortenedUrls, setShortenedUrls, user }) {
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleDelete = (id) => {
    setShortenedUrls(shortenedUrls.filter((url) => url.id !== id));
  };

  const handleEdit = (id, newAlias) => {
    setShortenedUrls(
      shortenedUrls.map((url) =>
        url.id === id ? { ...url, alias: newAlias, shortUrl: `tinyurl.com/${newAlias}` } : url
      )
    );
  };

  const columns = [
    { field: 'shortUrl', headerName: 'Short URL', width: 200, renderCell: (params) => (
      <a href={params.value} style={{ color: '#1976d2' }}>{params.value}</a>
    )},
    { field: 'longUrl', headerName: 'Original URL', width: 300 },
    { field: 'clicks', headerName: 'Clicks', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Link to={`/analytics/${params.row.id}`} style={{ color: '#1976d2', marginRight: 8 }}>Analytics</Link>
          <Button
            size="small"
            onClick={() => handleEdit(params.row.id, prompt('New alias:', params.row.alias))}
            color="success"
          >
            Edit
          </Button>
          <Button
            size="small"
            onClick={() => handleDelete(params.row.id)}
            color="error"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const rows = shortenedUrls.map((url) => ({
    id: url.id,
    shortUrl: url.shortUrl,
    longUrl: url.longUrl,
    clicks: url.clicks,
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>My URLs</Typography>
      {shortenedUrls.length === 0 ? (
        <Typography>
          No URLs shortened yet. <Link to="/" style={{ color: '#1976d2' }}>Shorten one now</Link>.
        </Typography>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      )}
    </Box>
  );
}

export default Dashboard;