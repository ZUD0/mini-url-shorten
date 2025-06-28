import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Typography, Box, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import ShortenForm from './components/ShortenForm';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import BulkShorten from './components/BulkShorten';
import BrandedDomain from './components/BrandedDomain';
import './App.css';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [shortenedUrls, setShortenedUrls] = useState([]); // Mock state for URLs

  useEffect(() => {
    // No need to set user here since AuthContext handles it
  }, []);

  const addShortenedUrl = (url) => {
    setShortenedUrls([...shortenedUrls, { ...url, id: Date.now() }]);
  };

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header user={user} setShowAuthModal={setShowAuthModal} />
        {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
          <Container maxWidth="md">
            <Routes>
              <Route path="/" element={
                <Box textAlign="center">
                  <Typography variant="h3" color="primary" gutterBottom>
                    The Original URL Shortener
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Create shorter URLs with our service.
                  </Typography>
                  <ShortenForm addShortenedUrl={addShortenedUrl} user={user} />
                  {user && (
                    <Typography mt={4}>
                      Want more?{' '}
                      <Link to="/dashboard" style={{ color: '#1976d2', textDecoration: 'underline' }}>
                        Track analytics, use branded domains, and manage links
                      </Link>
                    </Typography>
                  )}
                </Box>
              } />
              <Route path="/dashboard" element={user ? <Dashboard shortenedUrls={shortenedUrls} setShortenedUrls={setShortenedUrls} user={user} /> : <Navigate to="/" />} />
              <Route path="/analytics/:id" element={user ? <Analytics shortenedUrls={shortenedUrls} /> : <Navigate to="/" />} />
              <Route path="/bulk" element={user ? <BulkShorten addShortenedUrl={addShortenedUrl} user={user} /> : <Navigate to="/" />} />
              <Route path="/branded" element={user ? <BrandedDomain user={user} /> : <Navigate to="/" />} />
            </Routes>
          </Container>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}

export default App;