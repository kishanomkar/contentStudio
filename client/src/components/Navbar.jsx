import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/shared.css'

const SunIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
)

const MoonIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
)

export default function Navbar() {
    const { pathname } = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)
    const [darkMode, setDarkMode] = useState(true)
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)

    const isActive = (path) => pathname === path ? 'active' : ''

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    useEffect(() => { setMenuOpen(false) }, [pathname])

    useEffect(() => {
        if (!menuOpen) return
        const handleClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [menuOpen])

    return (
        <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`} id="nav" ref={navRef}>
            <div className="nav-inner">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">⚡</span>
                    <span>Content<span className="logo-accent">Studio</span> AI</span>
                </Link>

                {/* Desktop links */}
                <ul className="nav-links nav-links-desktop">
                    <li><Link to="/home" className={isActive('/home')}>Features</Link></li>
                    <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                    <li><Link to="/faq" className={isActive('/faq')}>FAQ</Link></li>
                    <li>
                        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
                            {darkMode ? <SunIcon /> : <MoonIcon />}
                        </button>
                    </li>
                    <li><Link to="/email-agent-service" className={`nav-cta ${isActive('/email-agent-service')}`}>Login</Link></li>
                </ul>

                {/* Mobile controls */}
                <div className="nav-mobile-controls">
                    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
                        {darkMode ? <SunIcon /> : <MoonIcon />}
                    </button>
                    <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                <ul>
                    <li><Link to="/home" className={isActive('/home')}>Features</Link></li>
                    <li><Link to="/about" className={isActive('/about')}>About</Link></li>
                    <li><Link to="/faq" className={isActive('/faq')}>FAQ</Link></li>
                    <li><Link to="/login" className="nav-cta">Login</Link></li>
                </ul>
            </div>
        </nav>
    )
}
