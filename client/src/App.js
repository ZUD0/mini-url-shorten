import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ShortenForm from './components/ShortenForm';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import BulkShorten from './components/BulkShorten';
import BrandedDomain from './components/BrandedDomain';
import './App.css';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState([]); // Mock state for URLs

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const addShortenedUrl = (url) => {
    setShortenedUrls([...shortenedUrls, { ...url, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} setShowAuthModal={setShowAuthModal} />
        {showAuthModal && <AuthModal setShowAuthModal={setShowAuthModal} />}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">The Original URL Shortener</h1>
                <p className="text-lg mb-6">Create shorter URLs with our service.</p>
                <ShortenForm addShortenedUrl={addShortenedUrl} user={user} />
                <p className="mt-6">
                  Want more?{' '}
                  <Link to="/dashboard" className="text-blue-600 hover:underline">
                    Track analytics, use branded domains, and manage links
                  </Link>
                  .
                </p>
              </div>
            </Route>
            <Route path="/dashboard">
              <Dashboard shortenedUrls={shortenedUrls} setShortenedUrls={setShortenedUrls} user={user} />
            </Route>
            <Route path="/analytics/:id">
              <Analytics shortenedUrls={shortenedUrls} />
            </Route>
            <Route path="/bulk">
              <BulkShorten addShortenedUrl={addShortenedUrl} user={user} />
            </Route>
            <Route path="/branded">
              <BrandedDomain user={user} />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;