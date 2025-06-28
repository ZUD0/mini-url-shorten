import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the current theme

function Footer() {
  const theme = useTheme(); // Get the current theme

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5', // Dynamic background based on mode
        color: theme.palette.text.primary, // Dynamic text color
        borderTop: `1px solid ${theme.palette.divider}`, // Optional: Subtle border
      }}
    >
      <Typography variant="body2">© 2025 minyURL Clone. All rights reserved.</Typography>
      <Box sx={{ mt: 1 }}>
        <Link to="/" style={{ color: theme.palette.text.primary, marginRight: 8 }}>Terms of Service</Link>
        <Link to="/" style={{ color: theme.palette.text.primary, marginRight: 8 }}>Privacy Policy</Link>
        <Link to="/" style={{ color: theme.palette.text.primary }}>Cookies</Link>
      </Box>
    </Box>
  );
}

export default Footer;