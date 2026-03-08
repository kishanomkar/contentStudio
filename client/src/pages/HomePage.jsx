import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import NeuralCanvas from '../components/NeuralCanvas.jsx'
import BrainCanvas from '../components/BrainCanvas.jsx'
import Navbar from '../components/Navbar.jsx'
import WaitlistModal from '../components/WaitlistModal.jsx'
import '../styles/homepage.css'
import '../styles/shared.css'

// Stats counter hook
function useCounter(target, duration = 1800, suffix = '') {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer.disconnect()
            const start = performance.now()
            const tick = (now) => {
                const elapsed = now - start
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setCount(Math.floor(eased * target))
                if (progress < 1) requestAnimationFrame(tick)
                else setCount(target)
            }
            requestAnimationFrame(tick)
        }, { threshold: 0.3 })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, duration])
    return [count, ref]
}

export default function HomePage() {
    const heroScrollRef = useRef(null)
    const [showWaitlist, setShowWaitlist] = useState(false)

    // Stat counters
    const [creators, creatorsRef] = useCounter(12000)
    const [deals, dealsRef] = useCounter(2400000)
    const [videos, videosRef] = useCounter(850000)
    const [revenue, revenueRef] = useCounter(4800000)

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
                if (entries[0].isIntersecting) ctaBtn.style.animation = 'ctaPulse 2.5s ease-in-out infinite'
            }, { threshold: 0.5 })
            ctaObs.observe(ctaBtn)
        }
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
            {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}
            <div className="scroll-progress" id="scrollProgress" />
            <NeuralCanvas />
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
            <div className="ambient-orb orb-3" />
            <Navbar />

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
                        <button className="btn-primary" onClick={() => setShowWaitlist(true)}>Join Waitlist <span className="btn-arrow">→</span></button>
                        <a href="#features" className="btn-ghost">See Features ↓</a>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#ec4899' }}>Powered By ContentStudio  </Link>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#10b981' }}>Powered By ContentStudio  </Link>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#f59e0b' }}>Powered By ContentStudio  </Link>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#818cf8' }}>Powered By ContentStudio  </Link>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#3b82f6' }}>Powered By ContentStudio  </Link>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#a78bfa' }}>Powered By ContentStudio  </Link>
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
                            <Link to="/login" className="feature-cta" style={{ '--clr': '#14b8a6' }}>Powered By ContentStudio  </Link>
                        </div>
                    </div>
                </section>

            </div>

            {/* STATS SECTION */}
            <section className="stats-section reveal-section">
                <h2 className="stats-section-title">Trusted by <span style={{ background: 'linear-gradient(135deg,#818cf8,#ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Creators Worldwide</span></h2>
                <div className="stats-grid">
                    <div className="stat-card" ref={creatorsRef}>
                        <span className="stat-value">{creators.toLocaleString()}+</span>
                        <div className="stat-label">Active Creators</div>
                    </div>
                    <div className="stat-card" ref={dealsRef}>
                        <span className="stat-value">${(deals / 1000000).toFixed(1)}M+</span>
                        <div className="stat-label">Brand Deals Closed</div>
                    </div>
                    <div className="stat-card" ref={videosRef}>
                        <span className="stat-value">{(videos / 1000).toFixed(0)}K+</span>
                        <div className="stat-label">Videos Produced</div>
                    </div>
                    <div className="stat-card" ref={revenueRef}>
                        <span className="stat-value">${(revenue / 1000000).toFixed(1)}M+</span>
                        <div className="stat-label">Creator Revenue Generated</div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="testimonials-section reveal-section">
                <div className="testimonials-header">
                    <h2>What Creators Are <span style={{ background: 'linear-gradient(135deg,#818cf8,#ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Saying</span></h2>
                    <p>Real results from real creators using Content Studio AI.</p>
                </div>
                <div className="marquee-outer">
                    <div className="marquee-track">
                        {[
                            { name: 'Alex Johnson', role: 'YouTube Creator · 2.1M subs', quote: 'Content Studio AI 10×\'d my shorts output. What used to take 3 hours takes 15 minutes now.', initials: 'AJ', color: '#6366f1' },
                            { name: 'Sara Patel', role: 'TikTok Creator · 890K followers', quote: 'The brand deal AI negotiated a $6k sponsorship up to $11k. Paid for itself in one deal.', initials: 'SP', color: '#ec4899' },
                            { name: 'Mike Chen', role: 'Podcast Host · Top 1%', quote: 'Auto-scheduling and community replies mean I spend zero time on admin. Pure creation now.', initials: 'MC', color: '#10b981' },
                            { name: 'Priya Sharma', role: 'Instagram · 1.4M', quote: 'The predictive content engine is scary good. I\'ve had 4 viral posts in a row following its recommendations.', initials: 'PS', color: '#f59e0b' },
                            { name: 'Jordan Lee', role: 'LinkedIn Creator · B2B', quote: 'Finally an AI tool that understands professional content. My engagement is up 340%.', initials: 'JL', color: '#3b82f6' },
                            { name: 'Maya Torres', role: 'Multi-Platform Creator', quote: 'From 50K to 500K followers in 8 months. The growth analytics coach knew exactly what to optimize.', initials: 'MT', color: '#8b5cf6' },
                            { name: 'Chris Park', role: 'YouTube · Tech Niche', quote: 'The thumbnail AI alone is worth the price. My CTR went from 4% to 11% in 3 weeks.', initials: 'CP', color: '#14b8a6' },
                            { name: 'Lisa Wang', role: 'Pinterest & YouTube', quote: 'Multi-modal generation saves me $3,000/month on graphic designers. Incredible value.', initials: 'LW', color: '#f472b6' },
                        ].concat([
                            { name: 'Alex Johnson', role: 'YouTube Creator · 2.1M subs', quote: 'Content Studio AI 10×\'d my shorts output. What used to take 3 hours takes 15 minutes now.', initials: 'AJ', color: '#6366f1' },
                            { name: 'Sara Patel', role: 'TikTok Creator · 890K followers', quote: 'The brand deal AI negotiated a $6k sponsorship up to $11k. Paid for itself in one deal.', initials: 'SP', color: '#ec4899' },
                            { name: 'Mike Chen', role: 'Podcast Host · Top 1%', quote: 'Auto-scheduling and community replies mean I spend zero time on admin. Pure creation now.', initials: 'MC', color: '#10b981' },
                            { name: 'Priya Sharma', role: 'Instagram · 1.4M', quote: 'The predictive content engine is scary good. I\'ve had 4 viral posts in a row following its recommendations.', initials: 'PS', color: '#f59e0b' },
                            { name: 'Jordan Lee', role: 'LinkedIn Creator · B2B', quote: 'Finally an AI tool that understands professional content. My engagement is up 340%.', initials: 'JL', color: '#3b82f6' },
                            { name: 'Maya Torres', role: 'Multi-Platform Creator', quote: 'From 50K to 500K followers in 8 months. The growth analytics coach knew exactly what to optimize.', initials: 'MT', color: '#8b5cf6' },
                            { name: 'Chris Park', role: 'YouTube · Tech Niche', quote: 'The thumbnail AI alone is worth the price. My CTR went from 4% to 11% in 3 weeks.', initials: 'CP', color: '#14b8a6' },
                            { name: 'Lisa Wang', role: 'Pinterest & YouTube', quote: 'Multi-modal generation saves me $3,000/month on graphic designers. Incredible value.', initials: 'LW', color: '#f472b6' },
                        ]).map((t, i) => (
                            <div key={i} className="tcard">
                                <div className="tcard-stars">★★★★★</div>
                                <p className="tcard-quote">"{t.quote}"</p>
                                <div className="tcard-author">
                                    <div className="tcard-avatar" style={{ background: `${t.color}22`, color: t.color }}>{t.initials}</div>
                                    <div>
                                        <div className="tcard-name">{t.name}</div>
                                        <div className="tcard-role">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING */}
            <section className="pricing-section reveal-section">
                <div className="pricing-section-header">
                    <div className="section-badge">✦ Simple Pricing</div>
                    <h2>Choose Your <span style={{ background: 'linear-gradient(135deg,#818cf8,#ec4899)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Growth Plan</span></h2>
                    <p>Start free. Scale when you're ready. No hidden fees, ever.</p>
                </div>
                <div className="pricing-grid">
                    {/* FREE */}
                    <div className="pricing-card">
                        <div className="pricing-tier">Starter</div>
                        <div className="pricing-price">Free</div>
                        <p className="pricing-desc">Perfect for creators just getting started. No credit card required.</p>
                        <ul className="pricing-features">
                            <li><span className="pf-icon">✓</span> 5 AI video clips/month</li>
                            <li><span className="pf-icon">✓</span> Basic analytics dashboard</li>
                            <li><span className="pf-icon">✓</span> 1 platform scheduler</li>
                            <li><span className="pf-icon">✓</span> AI comment categorization</li>
                            <li className="disabled"><span className="pf-icon">✕</span> Brand deal negotiation</li>
                            <li className="disabled"><span className="pf-icon">✕</span> Predictive recommendations</li>
                        </ul>
                        <button className="pricing-btn outline" onClick={() => setShowWaitlist(true)}>Get Started Free</button>
                    </div>
                    {/* PRO */}
                    <div className="pricing-card featured">
                        <div className="pricing-badge">⚡ Most Popular</div>
                        <div className="pricing-tier">Pro Creator</div>
                        <div className="pricing-price"><sup>$</sup>49<span className="per">/mo</span></div>
                        <p className="pricing-desc">For serious creators ready to scale their content and revenue.</p>
                        <ul className="pricing-features">
                            <li><span className="pf-icon">✓</span> Unlimited AI video clips</li>
                            <li><span className="pf-icon">✓</span> Full analytics + AI coach</li>
                            <li><span className="pf-icon">✓</span> 6-platform scheduler</li>
                            <li><span className="pf-icon">✓</span> Brand deal intelligence</li>
                            <li><span className="pf-icon">✓</span> Predictive content engine</li>
                            <li><span className="pf-icon">✓</span> Priority support</li>
                        </ul>
                        <button className="pricing-btn solid" onClick={() => setShowWaitlist(true)}>Start Pro — $49/mo →</button>
                    </div>
                    {/* AGENCY */}
                    <div className="pricing-card">
                        <div className="pricing-tier">Agency</div>
                        <div className="pricing-price"><sup>$</sup>149<span className="per">/mo</span></div>
                        <p className="pricing-desc">For agencies and teams managing multiple creator brands.</p>
                        <ul className="pricing-features">
                            <li><span className="pf-icon">✓</span> Everything in Pro</li>
                            <li><span className="pf-icon">✓</span> Up to 10 creator accounts</li>
                            <li><span className="pf-icon">✓</span> Team collaboration tools</li>
                            <li><span className="pf-icon">✓</span> White-label exports</li>
                            <li><span className="pf-icon">✓</span> Dedicated account manager</li>
                            <li><span className="pf-icon">✓</span> Custom integrations</li>
                        </ul>
                        <button className="pricing-btn outline" onClick={() => setShowWaitlist(true)}>Contact Sales →</button>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="final-cta reveal-section">
                <div className="cta-inner">
                    <div className="cta-glow" />
                    <div className="cta-badge">✦ Join the Creator Revolution</div>
                    <h2 className="cta-title">Stop Managing Tools.<br /><span className="hero-gradient">Start Owning the System.</span></h2>
                    <p className="cta-sub">Content Studio AI brings every lever of creator growth under one roof — so you can focus on what matters.</p>
                    <button className="btn-primary large" id="ctaBtn" onClick={() => setShowWaitlist(true)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'var(--font)' }}>Join the Waitlist <span className="btn-arrow">→</span></button>
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
