import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ThumbnailGenerator from './pages/ThumbnailGenerator'
import Text2Speech from './pages/Text2Speech'

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
            </ul>
          </div>
        </nav>
        <main className="pt-4">
          <Routes>
            <Route path="/" element={<ThumbnailGenerator />} />
            <Route path="/thumbnail" element={<ThumbnailGenerator />} />
            <Route path="/text-to-speech" element={<Text2Speech />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App