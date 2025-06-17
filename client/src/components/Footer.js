import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
      <Typography variant="body2">© 2025 TinyURL Clone. All rights reserved.</Typography>
      <Box sx={{ mt: 1 }}>
        <Link to="/" style={{ color: '#1976d2', marginRight: 8 }}>Terms of Service</Link>
        <Link to="/" style={{ color: '#1976d2', marginRight: 8 }}>Privacy Policy</Link>
        <Link to="/" style={{ color: '#1976d2' }}>Cookies</Link>
      </Box>
    </Box>
  );
}

export default Footer;
