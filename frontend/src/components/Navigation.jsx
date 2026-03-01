import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
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
  )
}

export default Navigation
