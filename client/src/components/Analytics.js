import React from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, CardContent, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Analytics({ shortenedUrls }) {
  const { id } = useParams();
  const url = shortenedUrls.find((u) => u.id === parseInt(id));

  if (!url) return <Typography>URL not found.</Typography>;

  // Mock analytics data
  const data = {
    labels: ['India', 'USA', 'UK'],
    datasets: [
      {
        label: 'Clicks by Country',
        data: [50, 30, 20],
        backgroundColor: 'rgba(25, 118, 210, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: `Analytics for ${url.shortUrl}` } },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>Link Analytics</Typography>
        <Typography><strong>Short URL:</strong> {url.shortUrl}</Typography>
        <Typography><strong>Original URL:</strong> {url.longUrl}</Typography>
        <Typography><strong>Total Clicks:</strong> {url.clicks}</Typography>
        <Box mt={4}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Analytics;