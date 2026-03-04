import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import NeuralCanvas from '../components/NeuralCanvas.jsx'
import BrainCanvas from '../components/BrainCanvas.jsx'
import '../styles/homepage.css'

export default function HomePage() {
    const navRef = useRef(null)
    const heroScrollRef = useRef(null)

    useEffect(() => {
        // Scroll progress bar
        const progressBar = document.getElementById('scrollProgress')
        const onScroll = () => {
            const scrolled = window.scrollY
            const max = document.documentElement.scrollHeight - window.innerHeight
            if (progressBar) progressBar.style.width = `${(scrolled / max) * 100}%`

            // hero scroll hide
            const hs = heroScrollRef.current
            if (hs) {
                hs.style.opacity = window.scrollY > 100 ? '0' : '1'
                hs.style.pointerEvents = window.scrollY > 100 ? 'none' : 'auto'
            }

            // nav shadow
            const nav = navRef.current
            if (nav) {
                nav.style.background = window.scrollY > 20
                    ? 'rgba(7,10,18,0.9)'
                    : 'rgba(7,10,18,0.65)'
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        // Reveal sections
        const revealSections = document.querySelectorAll('.reveal-section')
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('in-view')
            })
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
        revealSections.forEach(s => observer.observe(s))

        // CTA pulse
        const ctaBtn = document.getElementById('ctaBtn')
        let ctaObs
        if (ctaBtn) {
            ctaObs = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    ctaBtn.style.animation = 'ctaPulse 2.5s ease-in-out infinite'
                }
            }, { threshold: 0.5 })
            ctaObs.observe(ctaBtn)
        }

        // Inject CTA keyframe
        const style = document.createElement('style')
        style.id = 'cta-pulse-style'
        style.textContent = `@keyframes ctaPulse{0%,100%{box-shadow:0 0 0 0 rgba(99,102,241,0.5)}50%{box-shadow:0 0 0 16px rgba(99,102,241,0)}}`
        document.head.appendChild(style)

        return () => {
            window.removeEventListener('scroll', onScroll)
            observer.disconnect()
            ctaObs?.disconnect()
            document.getElementById('cta-pulse-style')?.remove()
        }
    }, [])

    return (
        <>
            <div className="scroll-progress" id="scrollProgress" />
            <NeuralCanvas />
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
            <div className="ambient-orb orb-3" />

            {/* NAV */}
            <nav className="nav" id="nav" ref={navRef}>
                <div className="nav-inner">
                    <Link to="/" className="nav-logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">Content<span className="logo-accent">Studio</span> AI</span>
                    </Link>
                    <ul className="nav-links">
                        <li><Link to="/home" className="active">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/login" className="nav-cta">Login</Link></li>
                    </ul>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero" id="hero">
                <div className="hero-content">
                    <div className="hero-badge animate-in" style={{ '--delay': '0.1s' }}>✦ AI-Powered Creator OS</div>
                    <h1 className="hero-title animate-in" style={{ '--delay': '0.25s' }}>
                        The AI Operating System<br />
                        <span className="hero-gradient">for Modern Creators</span>
                    </h1>
                    <p className="hero-sub animate-in" style={{ '--delay': '0.45s' }}>
                        Produce, Automate, Monetize, and Scale —<br className="hide-mobile" /> All From One Dashboard.
                    </p>
                    <div className="hero-actions animate-in" style={{ '--delay': '0.6s' }}>
                        <Link to="/login" className="btn-primary">Start Free <span className="btn-arrow">→</span></Link>
                        <a href="#" className="btn-ghost">Watch Demo ↗</a>
                    </div>
                </div>
                <div className="hero-scroll" id="heroScroll" ref={heroScrollRef}>
                    <span>Scroll to explore</span>
                    <div className="scroll-arrow">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* FEATURES WRAPPER */}
            <div className="features-wrapper" id="features">

                {/* 1 — Video Production Studio */}
                <section className="feature-section reveal-section" data-color="#ec4899">
                    <div className="feature-grid">
                        <div className="feature-visual reveal-left">
                            <div className="mock-dashboard" style={{ '--accent': '#ec4899' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Video Studio — 1-Click Factory</span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-timeline">
                                        <div className="tl-track">
                                            <div className="tl-clip" style={{ width: '60%', background: 'linear-gradient(90deg,#ec4899,#f472b6)' }} />
                                            <div className="tl-clip" style={{ width: '30%', left: '65%', background: 'rgba(236,72,153,0.3)' }} />
                                        </div>
                                        <div className="tl-track">
                                            <div className="tl-clip" style={{ width: '40%', background: 'rgba(236,72,153,0.2)' }} />
                                            <div className="tl-clip" style={{ width: '50%', left: '45%', background: 'rgba(236,72,153,0.35)' }} />
                                        </div>
                                        <div className="tl-track">
                                            <div className="tl-clip" style={{ width: '100%', background: 'linear-gradient(90deg,rgba(236,72,153,0.15),rgba(236,72,153,0.4))' }} />
                                        </div>
                                    </div>
                                    <div className="mock-stats-row">
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#ec4899' }}>10×</span><span className="ms-lbl">Output</span></div>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#f472b6' }}>Auto</span><span className="ms-lbl">Subtitles</span></div>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#ec4899' }}>9:16</span><span className="ms-lbl">Ready</span></div>
                                    </div>
                                    <div className="mock-progress-bar">
                                        <div className="pb-label">AI Processing…</div>
                                        <div className="pb-track">
                                            <div className="pb-fill" style={{ width: '72%', background: 'linear-gradient(90deg,#ec4899,#f472b6)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-content reveal-right">
                            <div className="feature-label" style={{ color: '#ec4899' }}>1-Click Factory</div>
                            <h2 className="feature-title">Video Production <span style={{ color: '#ec4899' }}>Studio</span></h2>
                            <p className="feature-desc">Turn long-form content into 10+ platform-ready shorts with one click. Let AI handle every frame.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>✂</span>Auto Subtitles — multilingual</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>🔊</span>Text-to-Speech with natural AI voices</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>🖼</span>AI Thumbnail Generation</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>✂</span>Podcast / Long-Video Clipping</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(236,72,153,0.15)', color: '#ec4899' }}>📐</span>Auto Aspect Ratio Adjustment (9:16, 4:5, 16:9)</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#ec4899' }}>Get Started →</Link>
                        </div>
                    </div>
                </section>

                {/* 2 — Engagement & Community Automation */}
                <section className="feature-section reveal-section" data-color="#10b981">
                    <div className="feature-grid reverse">
                        <div className="feature-content reveal-left">
                            <div className="feature-label" style={{ color: '#10b981' }}>Automation</div>
                            <h2 className="feature-title">Engagement &amp; Community <span style={{ color: '#10b981' }}>Automation</span></h2>
                            <p className="feature-desc">Never miss a comment. AI categorizes, auto-replies, and manages your community 24/7 across every platform.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>🏷</span>Comment Categorization</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>💬</span>Contextual Auto-Replies</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>📅</span>Optimal Multi-Platform Posting Scheduler</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>📈</span>Trend Detection Engine</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#10b981' }}>Get Started →</Link>
                        </div>
                        <div className="feature-visual reveal-right">
                            <div className="mock-dashboard" style={{ '--accent': '#10b981' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Community Hub</span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-comments">
                                        {[
                                            { av: 'A', name: '@alexj', msg: 'This is exactly what I needed!', tag: '✦ Auto-replied' },
                                            { av: 'S', name: '@sara_creates', msg: 'How do I get started?', tag: '✦ Auto-replied' },
                                            { av: 'M', name: '@mike99', msg: 'Great content as always 🔥', tag: '✦ Positive — Liked' },
                                        ].map((c, i) => (
                                            <div key={i} className="mock-comment">
                                                <span className="mc-avatar" style={{ background: '#10b98130' }}>{c.av}</span>
                                                <div className="mc-text">
                                                    <div className="mc-name">{c.name}</div>
                                                    <div className="mc-msg">{c.msg}</div>
                                                    <div className="mc-tag" style={{ color: '#10b981' }}>{c.tag}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mock-stats-row" style={{ marginTop: '1rem' }}>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#10b981' }}>24/7</span><span className="ms-lbl">Active</span></div>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#34d399' }}>98%</span><span className="ms-lbl">Response</span></div>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#10b981' }}>6</span><span className="ms-lbl">Platforms</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 — Brand Deal Intelligence */}
                <section className="feature-section reveal-section" data-color="#f59e0b">
                    <div className="feature-grid">
                        <div className="feature-visual reveal-left">
                            <div className="mock-dashboard" style={{ '--accent': '#f59e0b' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Deal Intelligence</span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-email-list">
                                        {[
                                            { dot: '#f59e0b', from: 'Nike x Creator', val: '$4,200', vc: '#f59e0b' },
                                            { dot: '#fbbf24', from: 'Spotify Podcast', val: '$2,800', vc: '#fbbf24' },
                                            { dot: '#f59e0b', from: 'Skillshare', val: '$1,500', vc: '#f59e0b' },
                                        ].map((e, i) => (
                                            <div key={i} className="mock-email">
                                                <span className="me-dot" style={{ background: e.dot }} />
                                                <span className="me-from">{e.from}</span>
                                                <span className="me-val" style={{ color: e.vc }}>{e.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mock-counter-offer">
                                        <div className="co-label" style={{ color: '#f59e0b' }}>AI Counter-Offer Generated</div>
                                        <div className="co-val">Nike → <span style={{ color: '#fbbf24' }}>$6,100</span> <span className="co-tag">+45%</span></div>
                                    </div>
                                    <div className="mock-stats-row">
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#f59e0b' }}>3×</span><span className="ms-lbl">Deal Value</span></div>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#fbbf24' }}>$8.2k</span><span className="ms-lbl">Avg. Deal</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-content reveal-right">
                            <div className="feature-label" style={{ color: '#f59e0b' }}>Intelligence</div>
                            <h2 className="feature-title">Brand Deal <span style={{ color: '#f59e0b' }}>Intelligence</span></h2>
                            <p className="feature-desc">Stop leaving money on the table. AI scans your sponsor emails and auto-negotiates better deals.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>📧</span>Scans Sponsor Emails</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>💰</span>Industry Benchmark Pricing by Niche</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>📋</span>Track Deal History</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>🎯</span>Sponsorship Insertion Point Optimization</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>🤝</span>Auto-Generates Counter-Offer Negotiation Replies</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#f59e0b' }}>Get Started →</Link>
                        </div>
                    </div>
                </section>

                {/* 4 — Predictive Content Recommendations */}
                <section className="feature-section reveal-section" data-color="#6366f1">
                    <div className="feature-grid reverse">
                        <div className="feature-content reveal-left">
                            <div className="feature-label" style={{ color: '#818cf8' }}>Predictions</div>
                            <h2 className="feature-title">Predictive Content <span style={{ color: '#818cf8' }}>Recommendations</span></h2>
                            <p className="feature-desc">AI analyzes your past performance and prescribes exactly what to create next — before trends peak.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>📊</span>Past Performance Data Analysis</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>🖼</span>Title &amp; Thumbnail Prescription</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>🔮</span>Future Post Performance Prediction</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>🏆</span>Competitor Benchmarking</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#818cf8' }}>Get Started →</Link>
                        </div>
                        <div className="feature-visual reveal-right">
                            <div className="mock-dashboard" style={{ '--accent': '#6366f1' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Content Predictions</span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-chart">
                                        <div className="chart-bars">
                                            {[
                                                { h: '40%', bg: 'rgba(99,102,241,0.3)', label: 'Mon' },
                                                { h: '65%', bg: 'rgba(99,102,241,0.5)', label: 'Tue' },
                                                { h: '50%', bg: 'rgba(99,102,241,0.3)', label: 'Wed' },
                                                { h: '80%', bg: 'linear-gradient(to top,#6366f1,#818cf8)', label: 'Thu' },
                                                { h: '70%', bg: 'rgba(99,102,241,0.5)', label: 'Fri' },
                                                { h: '90%', bg: 'linear-gradient(to top,#818cf8,#a78bfa)', label: 'Sat', predicted: true },
                                                { h: '95%', bg: 'linear-gradient(to top,#8b5cf6,#a78bfa)', label: 'Sun', predicted: true },
                                            ].map((b, i) => (
                                                <div key={i} className={`chart-bar${b.predicted ? ' predicted' : ''}`} style={{ height: b.h, background: b.bg }}>
                                                    <span>{b.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mock-reco">
                                        <div className="mr-label" style={{ color: '#818cf8' }}>✦ AI Recommends</div>
                                        <div className="mr-val">"Post Saturday 9am — 94% viral score"</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5 — Analytics & Growth Dashboard */}
                <section className="feature-section reveal-section" data-color="#3b82f6">
                    <div className="feature-grid">
                        <div className="feature-visual reveal-left">
                            <div className="mock-dashboard" style={{ '--accent': '#3b82f6' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Growth Analytics</span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-kpis">
                                        <div className="kpi" style={{ '--kc': '#3b82f6' }}><span className="kpi-val">+127%</span><span className="kpi-lbl">MoM Growth</span></div>
                                        <div className="kpi" style={{ '--kc': '#60a5fa' }}><span className="kpi-val">4.2M</span><span className="kpi-lbl">Impressions</span></div>
                                        <div className="kpi" style={{ '--kc': '#3b82f6' }}><span className="kpi-val">$18k</span><span className="kpi-lbl">Revenue</span></div>
                                        <div className="kpi" style={{ '--kc': '#60a5fa' }}><span className="kpi-val">8.4%</span><span className="kpi-lbl">Eng. Rate</span></div>
                                    </div>
                                    <div className="mock-line-chart">
                                        <svg viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <defs>
                                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path d="M0,50 L20,42 L40,38 L60,30 L80,25 L100,18 L120,12 L140,8 L160,4 L180,2" stroke="#3b82f6" strokeWidth="2" fill="none" />
                                            <path d="M0,50 L20,42 L40,38 L60,30 L80,25 L100,18 L120,12 L140,8 L160,4 L180,2 L180,60 L0,60Z" fill="url(#lineGrad)" />
                                        </svg>
                                    </div>
                                    <div className="mock-ai-coach">
                                        <span style={{ color: '#60a5fa' }}>🤖 AI Coach:</span> "Post 2× this week — your momentum window is open."
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-content reveal-right">
                            <div className="feature-label" style={{ color: '#3b82f6' }}>Analytics</div>
                            <h2 className="feature-title">Analytics &amp; Growth <span style={{ color: '#3b82f6' }}>Dashboard</span></h2>
                            <p className="feature-desc">Real-time ROI tracking, engagement trends, and a personal AI analytics coach with predictive growth insights.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>📈</span>Real-Time ROI</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>👥</span>Engagement Trends &amp; Demographics</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>🤖</span>Personal Analytics Coach Predictions</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#3b82f6' }}>Get Started →</Link>
                        </div>
                    </div>
                </section>

                {/* 6 — Advanced Content Intelligence */}
                <section className="feature-section reveal-section" data-color="#8b5cf6">
                    <div className="feature-grid reverse">
                        <div className="feature-content reveal-left">
                            <div className="feature-label" style={{ color: '#a78bfa' }}>Advanced AI</div>
                            <h2 className="feature-title">Advanced Content <span style={{ color: '#a78bfa' }}>Intelligence</span></h2>
                            <p className="feature-desc">Viral hooks, cross-platform optimization, audience segmentation, and monetization tools — all in one suite.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>🔥</span>Viral Hooks Generator</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>👤</span>Audience Segmenter</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>⏱</span>24-Hour Trend Forecaster</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>💎</span>Monetization Maximizer</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>🌐</span>Cross-Platform Optimizer</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#a78bfa' }}>Get Started →</Link>
                        </div>
                        <div className="feature-visual reveal-right">
                            <div className="mock-dashboard" style={{ '--accent': '#8b5cf6' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Content Intelligence</span>
                                </div>
                                <div className="mock-body brain-vis">
                                    <BrainCanvas />
                                    <div className="brain-labels">
                                        <span style={{ color: '#a78bfa' }}>Viral Score: <b>94%</b></span>
                                        <span style={{ color: '#8b5cf6' }}>Trend Fit: <b>↑ High</b></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7 — Creator OS Infrastructure */}
                <section className="feature-section reveal-section" data-color="#14b8a6">
                    <div className="feature-grid">
                        <div className="feature-visual reveal-left">
                            <div className="mock-dashboard" style={{ '--accent': '#14b8a6' }}>
                                <div className="mock-header">
                                    <div className="mock-dots"><span /><span /><span /></div>
                                    <span className="mock-title">Creator OS Control Panel</span>
                                </div>
                                <div className="mock-body">
                                    <div className="mock-os-grid">
                                        {[
                                            ['🔍', 'SEO Engine'], ['👥', 'Team Collab'], ['🎨', 'Multi-Modal Gen'],
                                            ['🤖', 'Platform Export'], ['▶', 'Live Demo'], ['🔗', 'Integrations'],
                                        ].map(([icon, label], i) => (
                                            <div key={i} className="os-item" style={{ '--ic': '#14b8a6' }}><span>{icon}</span> {label}</div>
                                        ))}
                                    </div>
                                    <div className="mock-stats-row" style={{ marginTop: '1rem' }}>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#14b8a6' }}>1-Click</span><span className="ms-lbl">Export</span></div>
                                        <div className="mock-stat"><span className="ms-val" style={{ color: '#2dd4bf' }}>∞</span><span className="ms-lbl">Platforms</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feature-content reveal-right">
                            <div className="feature-label" style={{ color: '#14b8a6' }}>Infrastructure</div>
                            <h2 className="feature-title">Creator OS <span style={{ color: '#14b8a6' }}>Infrastructure Layer</span></h2>
                            <p className="feature-desc">The backbone powering everything. From SEO to team collaboration, live demos to platform-wide automation.</p>
                            <ul className="feature-list">
                                <li><span className="fl-icon" style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6' }}>🔍</span>SEO Optimization Engine</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6' }}>👥</span>Real-Time Team Collaboration &amp; Version Control</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6' }}>🎨</span>Multi-Modal Generation (Image / Graphics / Music)</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6' }}>🚀</span>One-Click Platform Export &amp; Automation</li>
                                <li><span className="fl-icon" style={{ background: 'rgba(20,184,166,0.15)', color: '#14b8a6' }}>▶</span>Live Demo Capability</li>
                            </ul>
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#14b8a6' }}>Get Started →</Link>
                        </div>
                    </div>
                </section>

            </div>

            {/* FINAL CTA */}
            <section className="final-cta reveal-section">
                <div className="cta-inner">
                    <div className="cta-glow" />
                    <div className="cta-badge">✦ Join the Creator Revolution</div>
                    <h2 className="cta-title">Stop Managing Tools.<br /><span className="hero-gradient">Start Owning the System.</span></h2>
                    <p className="cta-sub">Content Studio AI brings every lever of creator growth under one roof — so you can focus on what matters.</p>
                    <Link to="/login" className="btn-primary large" id="ctaBtn">Content Studio AI <span className="btn-arrow">→</span></Link>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="nav-logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">Content<span className="logo-accent">Studio</span> AI</span>
                    </div>
                    <p className="footer-copy">© 2026 Content Studio AI. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}
