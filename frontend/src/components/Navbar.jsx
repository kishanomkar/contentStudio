import { Link, useLocation } from 'react-router-dom'
import '../styles/shared.css'

export default function Navbar() {
    const { pathname } = useLocation()

    const isActive = (path) => pathname === path ? 'active' : ''

    return (
        <nav className="nav" id="nav">
            <div className="nav-inner">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">⚡</span>
                    <span>Content<span className="logo-accent">Studio</span> AI</span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/home" className={isActive('/home')}>Features</Link></li>
                    <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                    <li><Link to="/faq" className={isActive('/faq')}>FAQ</Link></li>
                    <li><Link to="/login" className={`nav-cta ${isActive('/login')}`}>Login</Link></li>
                </ul>
            </div>
        </nav>
    )
}
