import { Link } from 'react-router-dom'
import '../styles/shared.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="nav-logo">
                    <span className="logo-icon">⚡</span>
                    <span>Content<span className="logo-accent">Studio</span> AI</span>
                </div>
                <div className="footer-links">
                    <Link to="/home">Features</Link>
                    <Link to="/about">About</Link>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/login">Login</Link>
                </div>
                <p className="footer-copy">© 2026 Content Studio AI. All rights reserved.</p>
            </div>
        </footer>
    )
}
