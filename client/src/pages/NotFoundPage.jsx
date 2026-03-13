import { Link } from 'react-router-dom'
import Navbar2 from '../components/Navbar2.jsx'
import '../styles/shared.css'

export default function NotFoundPage() {
    return (
        <>
            <Navbar2 />
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    fontSize: '7rem',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #6366f1, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-4px',
                    lineHeight: 1,
                    marginBottom: '1rem'
                }}>404</div>
                <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '0.5rem'
                }}>🔭</div>
                <h1 style={{
                    fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                    fontWeight: 700,
                    marginBottom: '0.8rem',
                    letterSpacing: '-0.5px'
                }}>Page not found</h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    maxWidth: '380px',
                    lineHeight: 1.7,
                    marginBottom: '2rem'
                }}>
                    Looks like this page drifted into deep space. Let's get you back to the studio.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link to="/home" className="btn-primary">
                        Go Home →
                    </Link>
                    <Link to="/" className="btn-ghost">
                        Landing Page
                    </Link>
                </div>
            </div>
        </>
    )
}
