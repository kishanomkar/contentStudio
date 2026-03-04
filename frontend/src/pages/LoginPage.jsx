import { useState } from 'react'
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas.jsx'
import Navbar from '../components/Navbar.jsx'
import '../styles/shared.css'
import '../styles/login.css'

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
)

const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.29 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
)

export default function LoginPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [showPw, setShowPw] = useState(false)

    return (
        <>
            <ParticleCanvas />
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
            <Navbar />

            <div className="login-layout">

                {/* LEFT: Visual Panel */}
                <div className="login-left">
                    <div className="ll-content">
                        <div className="ll-badge">✦ Welcome back</div>
                        <h2 className="ll-title">Your studio<br />awaits.</h2>
                        <p className="ll-sub">Everything you created is right where you left it.</p>

                        {/* Social proof */}
                        <div className="ll-social-proof">
                            <div className="lsp-avatars">
                                {[
                                    ['K', 'linear-gradient(135deg,#6366f1,#8b5cf6)'],
                                    ['S', 'linear-gradient(135deg,#ec4899,#f472b6)'],
                                    ['M', 'linear-gradient(135deg,#10b981,#34d399)'],
                                    ['R', 'linear-gradient(135deg,#f59e0b,#fbbf24)'],
                                ].map(([letter, bg], i) => (
                                    <div key={i} className="lsp-av" style={{ background: bg }}>{letter}</div>
                                ))}
                            </div>
                            <p>Join <strong>50,000+</strong> creators already growing with AI</p>
                        </div>

                        {/* Feature hints */}
                        <div className="ll-feature-cards">
                            {[
                                { icon: '🎬', title: '1-Click Video Factory', sub: '10+ platform outputs' },
                                { icon: '📊', title: 'Live Analytics', sub: 'Real-time dashboard' },
                                { icon: '💰', title: 'Brand Deals', sub: 'Auto-negotiation AI' },
                            ].map((f, i) => (
                                <div key={i} className="ll-feat-card">
                                    <span>{f.icon}</span>
                                    <div>
                                        <strong>{f.title}</strong>
                                        <span>{f.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ll-orb ll-orb-1" />
                    <div className="ll-orb ll-orb-2" />
                </div>

                {/* RIGHT: Auth Form */}
                <div className="login-right">
                    <div className="auth-card">

                        {/* Tabs */}
                        <div className="auth-tabs">
                            <button
                                className={`auth-tab${activeTab === 'login' ? ' active' : ''}`}
                                onClick={() => setActiveTab('login')}
                            >Sign In</button>
                            <button
                                className={`auth-tab${activeTab === 'signup' ? ' active' : ''}`}
                                onClick={() => setActiveTab('signup')}
                            >Create Account</button>
                            <div
                                className="auth-tab-indicator"
                                style={{ transform: activeTab === 'signup' ? 'translateX(100%)' : 'translateX(0)' }}
                            />
                        </div>

                        {/* LOGIN FORM */}
                        {activeTab === 'login' && (
                            <form className="auth-form" id="loginForm" onSubmit={e => e.preventDefault()}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <div className="input-wrap">
                                        <span className="input-icon">✉</span>
                                        <input type="email" id="loginEmail" placeholder="you@example.com" required autoComplete="email" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Password
                                        <a href="#" className="forgot-link">Forgot password?</a>
                                    </label>
                                    <div className="input-wrap">
                                        <span className="input-icon">🔒</span>
                                        <input type={showPw ? 'text' : 'password'} id="loginPassword" placeholder="••••••••" required autoComplete="current-password" />
                                        <button type="button" className="toggle-pw" onClick={() => setShowPw(v => !v)} title="Show/hide password">
                                            {showPw ? '🙈' : '👁'}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="auth-submit" id="loginSubmit">
                                    <span className="auth-submit-text">Sign In</span>
                                    <span className="auth-submit-arrow">→</span>
                                    <div className="auth-btn-shimmer" />
                                </button>
                                <div className="auth-divider"><span>or continue with</span></div>
                                <div className="social-btns">
                                    <button type="button" className="social-btn" id="googleBtn"><GoogleIcon /> Google</button>
                                    <button type="button" className="social-btn" id="githubBtn"><GithubIcon /> GitHub</button>
                                </div>
                            </form>
                        )}

                        {/* SIGNUP FORM */}
                        {activeTab === 'signup' && (
                            <form className="auth-form" id="signupForm" onSubmit={e => e.preventDefault()}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">👤</span>
                                            <input type="text" placeholder="Jane" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <div className="input-wrap">
                                            <span className="input-icon">👤</span>
                                            <input type="text" placeholder="Doe" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <div className="input-wrap">
                                        <span className="input-icon">✉</span>
                                        <input type="email" placeholder="you@example.com" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <div className="input-wrap">
                                        <span className="input-icon">🔒</span>
                                        <input type="password" placeholder="Min. 8 characters" required />
                                    </div>
                                </div>
                                <div className="form-group form-checkbox">
                                    <label className="checkbox-label">
                                        <input type="checkbox" required />
                                        <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
                                    </label>
                                </div>
                                <button type="submit" className="auth-submit">
                                    <span className="auth-submit-text">Create Account</span>
                                    <span className="auth-submit-arrow">→</span>
                                    <div className="auth-btn-shimmer" />
                                </button>
                                <div className="auth-divider"><span>or sign up with</span></div>
                                <div className="social-btns">
                                    <button type="button" className="social-btn"><GoogleIcon /> Google</button>
                                    <button type="button" className="social-btn"><GithubIcon /> GitHub</button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}
