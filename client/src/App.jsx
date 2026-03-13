import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ProtectedRoute from './components/ProtectedRoute';
import { emailAPI } from './services/api';
import YoutubeProcessor from './pages/Youtube';
import SpeechToText from './pages/SpeechToText';
import Text2Speech from './pages/Text2Speech';
import Text2Vid from './pages/Text2Vid';
import ThumbnailGenerator from './pages/ThumbnailGenerator';
// import Navbar from './components/Navbar';
import Login from './pages/Login';
import Navbar2 from './components/Navbar2';
function AppContent() {
  const { pathname } = useLocation();
  const showNavbar = pathname !== '/login';

  // Fetch emails on app load
  useEffect(() => {
    const fetchInitialEmails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) { 
          await emailAPI.fetchEmails();
        }
      } catch (error) {
        console.error('Failed to fetch initial emails:', error);
      }
    };

    fetchInitialEmails();
  }, []);

  return (
    <>
      {showNavbar && <Navbar2 />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path='/youtube-processor' element={<YoutubeProcessor />} />
        <Route path='/speech-to-text' element={<SpeechToText />} />
        <Route path='/text-to-speech' element={<Text2Speech />} />
        <Route path='/text-to-video' element={<Text2Vid />} />
        <Route path='/thumbnail-generator' element={<ThumbnailGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
     
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}
