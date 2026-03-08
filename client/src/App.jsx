import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import { emailAPI } from './services/api';
import YoutubeProcessor from './pages/Youtube';

function AppContent() {
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
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path='/email-agent-service' element={<Login />} />
        <Route path='/youtube-processor' element={<YoutubeProcessor />} />
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
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
