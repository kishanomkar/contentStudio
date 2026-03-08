import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from 'react-router-dom'
import ThumbnailGenerator from './pages/ThumbnailGenerator'
import Text2Speech from './pages/Text2Speech'
import Text2Video from './pages/Text2Vid'
import Speech2Text from './pages/SpeechToText'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950">
        <nav className="bg-slate-900 border-b border-slate-700 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Content Studio</h1>
            <ul className="flex gap-6">
              <li>
                <Link 
                  to="/" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Thumbnail Generator
                </Link>
              </li>
              <li>
                <Link 
                  to="/text-to-speech" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Text to Speech
                </Link>
              </li>
              <li>
                <Link 
                  to="/text-to-video" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Text to Video
                </Link>
              </li>
              <li>
                <Link 
                  to="/speech-to-text" 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Speech to Text
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="pt-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/thumbnail" element={<ThumbnailGenerator />} />
            <Route path="/text-to-speech" element={<Text2Speech />} />
            <Route path="/text-to-video" element={<Text2Video />} />
            <Route path="/speech-to-text" element={<Speech2Text />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App