import React, { useEffect, useState } from 'react'
import '../../LandingPage/login.css'
import '../../LandingPage/shared.css'

const Login = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    import('../../LandingPage/shared.js')
  }, [])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const btn = e.target.querySelector('.auth-submit')
    if (btn) {
      const text = btn.querySelector('.auth-submit-text')
      if (text) text.textContent = 'Signing in…'
      btn.disabled = true
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  }

  const handleSignupSubmit = (e) => {
    e.preventDefault()
    const btn = e.target.querySelector('.auth-submit')
    if (btn) {
      const text = btn.querySelector('.auth-submit-text')
      if (text) text.textContent = 'Creating account…'
      btn.disabled = true
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  }

  const handlePasswordChange = (e) => {
    const v = e.target.value
    let score = 0
    if (v.length >= 8) score++
    if (/[A-Z]/.test(v)) score++
    if (/[0-9]/.test(v)) score++
    if (/[^A-Za-z0-9]/.test(v)) score++
    setPasswordStrength(score)
  }

  const handleSocialClick = () => {
    window.location.href = '/'
  }

  return (
    <>
      <canvas id="bg-canvas"></canvas>
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <span className="logo-icon">⚡</span>
            <span>Content<span className="logo-accent">Studio</span> AI</span>
          </a>
          <ul className="nav-links">
            <li><a href="/">Features</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
      </nav>

      {/* SPLIT LAYOUT */}
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
                <div className="lsp-av" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>K</div>
                <div className="lsp-av" style={{ background: 'linear-gradient(135deg,#ec4899,#f472b6)' }}>S</div>
                <div className="lsp-av" style={{ background: 'linear-gradient(135deg,#10b981,#34d399)' }}>M</div>
                <div className="lsp-av" style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)' }}>R</div>
              </div>
              <p>Join <strong>50,000+</strong> creators already growing with AI</p>
            </div>

            {/* Floating feature hints */}
            <div className="ll-feature-cards">
              <div className="ll-feat-card">
                <span>🎬</span>
                <div>
                  <strong>1-Click Video Factory</strong>
                  <span>10+ platform outputs</span>
                </div>
              </div>
              <div className="ll-feat-card">
                <span>📊</span>
                <div>
                  <strong>Live Analytics</strong>
                  <span>Real-time dashboard</span>
                </div>
              </div>
              <div className="ll-feat-card">
                <span>💰</span>
                <div>
                  <strong>Brand Deals</strong>
                  <span>Auto-negotiation AI</span>
                </div>
              </div>
            </div>
          </div>

          {/* decorative orbs inside left panel */}
          <div className="ll-orb ll-orb-1"></div>
          <div className="ll-orb ll-orb-2"></div>
        </div>

        {/* RIGHT: Auth Form */}
        <div className="login-right">
          <div className="auth-card">
            {/* Tabs */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button 
                className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Create Account
              </button>
            </div>

            {/* LOGIN FORM */}
            {activeTab === 'login' && (
              <form className="auth-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrap">
                    <span className="input-icon">✉</span>
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Password
                    <a href="#" className="forgot-link">Forgot password?</a>
                  </label>
                  <div className="input-wrap">
                    <span className="input-icon">🔒</span>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••" 
                      required
                      autoComplete="current-password"
                    />
                    <button 
                      type="button" 
                      className="toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                      title="Show/hide password"
                    >
                      👁
                    </button>
                  </div>
                </div>

                <button type="submit" className="auth-submit">
                  <span className="auth-submit-text">Sign In</span>
                  <span className="auth-submit-arrow">→</span>
                  <div className="auth-btn-shimmer"></div>
                </button>

                <div className="auth-divider"><span>or continue with</span></div>

                <div className="social-btns">
                  <button type="button" className="social-btn" onClick={handleSocialClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button type="button" className="social-btn" onClick={handleSocialClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.29 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>
            )}

            {/* SIGNUP FORM */}
            {activeTab === 'signup' && (
              <form className="auth-form" onSubmit={handleSignupSubmit}>
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
                    <input 
                      type="password" 
                      placeholder="Min. 8 characters" 
                      required
                      onChange={handlePasswordChange}
                    />
                  </div>
                  {passwordStrength > 0 && (
                    <div 
                      className="pw-strength"
                      style={{
                        width: ['25%', '50%', '75%', '100%'][passwordStrength - 1] || '10%',
                        backgroundColor: ['#ef4444', '#f59e0b', '#eab308', '#10b981'][passwordStrength - 1] || '#ef4444',
                        height: '4px',
                        borderRadius: '2px',
                        marginTop: '8px',
                        transition: 'all 0.3s ease'
                      }}
                    ></div>
                  )}
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
                  <div className="auth-btn-shimmer"></div>
                </button>

                <div className="auth-divider"><span>or sign up with</span></div>

                <div className="social-btns">
                  <button type="button" className="social-btn" onClick={handleSocialClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button type="button" className="social-btn" onClick={handleSocialClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.29 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </>
  )
}

export default Login
