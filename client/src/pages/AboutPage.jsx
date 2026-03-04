import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/shared.css'
import '../styles/about.css'

export default function AboutPage() {
    useEffect(() => {
        const els = document.querySelectorAll('.reveal')
        if (!els.length) return
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1'
                        entry.target.style.transform = 'translateY(0)'
                    }, i * 60)
                    io.unobserve(entry.target)
                }
            })
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

        els.forEach(el => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(28px)'
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
            io.observe(el)
        })

        return () => io.disconnect()
    }, [])

    return (
        <>
            <ParticleCanvas />
            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />
            <Navbar />

            <div className="page-header">
                <div className="page-header-badge">✦ Our Story</div>
                <h1>Built by creators, <br /><span className="gradient-text">for creators.</span></h1>
                <p>We got tired of juggling 12 different tools. So we built one that does it all — with AI at the core.</p>
            </div>

            <main className="page-content">

                {/* MISSION */}
                <section className="about-mission reveal">
                    <div className="mission-text">
                        <div className="section-label">MISSION</div>
                        <h2 className="about-h2">Content creation shouldn't <span className="gradient-text">be this hard.</span></h2>
                        <p>The average creator spends 6+ hours a week on repetitive, non-creative work. Editing subtitles, replying to comments, pitching sponsors, analyzing analytics — all separately. We believe that time should go back to creating.</p>
                        <p>Content Studio AI automates everything that isn't creation, so you can focus on what actually matters: your ideas.</p>
                        <div className="mission-actions">
                            <Link to="/home" className="btn-primary">See Features →</Link>
                            <Link to="/faq" className="btn-ghost">Read FAQ</Link>
                        </div>
                    </div>
                    <div className="mission-visual">
                        <div className="stat-stack">
                            <div className="big-stat"><span className="stat-num">10×</span><span className="stat-desc">More content output per week</span></div>
                            <div className="big-stat"><span className="stat-num">6hrs</span><span className="stat-desc">Saved per creator per week</span></div>
                            <div className="big-stat"><span className="stat-num">40%</span><span className="stat-desc">Average growth increase</span></div>
                        </div>
                    </div>
                </section>

                {/* VALUES */}
                <section className="about-values">
                    <div className="section-label reveal">VALUES</div>
                    <h2 className="about-h2 reveal">What we stand for</h2>
                    <div className="values-grid">
                        {[
                            { color: '#6366f1', icon: '🎯', title: 'Creator First', desc: "Every decision starts with one question: does this make the creator's life easier?" },
                            { color: '#ec4899', icon: '⚡', title: 'Speed of Thought', desc: "If it's not instant, it's friction. We obsess over making everything fast." },
                            { color: '#10b981', icon: '🔒', title: 'Privacy by Design', desc: 'Your data, your content, your analytics — never sold, never shared.' },
                            { color: '#f59e0b', icon: '🌍', title: 'Globally Inclusive', desc: 'Multi-language support, multi-platform, multi-format. Built for every creator everywhere.' },
                        ].map((v, i) => (
                            <div key={i} className="value-card reveal" style={{ '--vc-color': v.color }}>
                                <div className="vc-icon">{v.icon}</div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* TEAM */}
                <section className="about-team">
                    <div className="section-label reveal">TEAM</div>
                    <h2 className="about-h2 reveal">The people behind the platform</h2>
                    <div className="team-grid">
                        {[
                            { initials: 'PG', gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)', name: 'Prince Gupta', role: 'Co-founder & CEO', bio: 'AI Engineer. Frontend developer, backend developer.' },
                            { initials: 'KO', gradient: 'linear-gradient(135deg,#ec4899,#f472b6)', name: 'Kishan Omkar', role: 'Co-founder & CTO', bio: 'Ex-Meta ML Engineer. Multimodal AI specialist.' },
                            { initials: 'NP', gradient: 'linear-gradient(135deg,#10b981,#34d399)', name: 'Netra Pandey', role: 'Head of Product', bio: 'Built creator tools at TikTok & Spotify.' },
                            { initials: 'KSR', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)', name: 'Karan Singh Rathore', role: 'Head of Design', bio: 'Award-winning UX designer. Previously Figma.' },
                        ].map((m, i) => (
                            <div key={i} className="team-card reveal">
                                <div className="team-avatar" style={{ background: m.gradient }}>{m.initials}</div>
                                <div className="team-info">
                                    <h4>{m.name}</h4>
                                    <span>{m.role}</span>
                                    <p>{m.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </>
    )
}
