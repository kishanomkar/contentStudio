import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas.jsx'
import Navbar2 from '../components/Navbar2.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/shared.css'
import '../styles/faq.css'

const FAQ_ITEMS = [
    { cat: 'general', q: 'What is Content Studio AI?', a: 'Content Studio AI is an all-in-one AI platform for content creators. It combines predictive recommendations, video production, engagement automation, brand deal intelligence, and analytics into a single workspace — so you can grow faster with less effort.' },
    { cat: 'general', q: 'Who is Content Studio AI for?', a: "It's built for individual creators, brand teams, agencies, and media companies publishing on YouTube, TikTok, Instagram, LinkedIn, X, and more. Whether you have 1K or 10M followers — our platform scales with you." },
    { cat: 'features', q: 'How does the 1-Click Video Factory work?', a: 'You upload or connect your long-form video. Our AI automatically finds the best moments, clips them, adds subtitles in 40+ languages, adjusts aspect ratios (9:16, 4:5, 16:9), generates thumbnails, and exports everything — ready to post on 10+ platforms in minutes.' },
    { cat: 'features', q: 'What platforms does the engagement automation support?', a: 'We currently support YouTube, TikTok, Instagram, LinkedIn, X (Twitter), Facebook, and Twitch.' },
    { cat: 'pricing', q: 'Is there a free plan?', a: 'Yes. We offer a generous free tier with 5 video exports/month, basic analytics, and limited AI generations.' },
    { cat: 'pricing', q: 'Can I cancel anytime?', a: 'Absolutely. No lock-ins, no cancellation fees.' },
    { cat: 'technical', q: 'Is my data safe?', a: 'Your content is encrypted at rest and in transit (AES-256, TLS 1.3).' },
]

const CATS = [
    { id: 'all', label: 'All' },
    { id: 'general', label: 'General' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'technical', label: 'Technical' },
]

export default function FAQPage() {

    const [activecat, setActiveCat] = useState('all')
    const [search, setSearch] = useState('')
    const [openIndex, setOpenIndex] = useState(null)

    /* DARK MODE LOADER */
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark'
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

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
        }, { threshold: 0.1 })

        els.forEach(el => {
            el.style.opacity = '0'
            el.style.transform = 'translateY(28px)'
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
            io.observe(el)
        })

        return () => io.disconnect()
    }, [])

    const visibleItems = FAQ_ITEMS.filter(item => {
        const catMatch = activecat === 'all' || item.cat === activecat
        const searchMatch =
            search.length === 0 ||
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())

        return catMatch && searchMatch
    })

    const toggleItem = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <>
            <ParticleCanvas />

            <div className="ambient-orb orb-1" />
            <div className="ambient-orb orb-2" />

            <Navbar2 />

            <div className="page-header">
                <div className="page-header-badge">✦ Help Center</div>
                <h1>Frequently Asked <br /><span className="gradient-text">Questions</span></h1>
                <p>Everything you need to know about Content Studio AI.</p>
            </div>

            <main className="page-content">

                <div className="faq-search reveal">
                    <span className="faq-search-icon">🔍</span>
                    <input
                        type="text"
                        className="faq-search-input"
                        placeholder="Search questions…"
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value)
                            setActiveCat('all')
                        }}
                    />
                </div>

                <div className="faq-cats reveal">
                    {CATS.map(c => (
                        <button
                            key={c.id}
                            className={`faq-cat${activecat === c.id ? ' active' : ''}`}
                            onClick={() => {
                                setActiveCat(c.id)
                                setSearch('')
                            }}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>

                <div className="faq-list">
                    {visibleItems.map((item, i) => (
                        <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
                            <button className="faq-q" onClick={() => toggleItem(i)}>
                                <span>{item.q}</span>
                                <span className="faq-chevron">{openIndex === i ? '×' : '+'}</span>
                            </button>
                            <div className="faq-a">
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="faq-cta reveal">
                    <h3>Still have questions?</h3>
                    <p>Our team usually responds within 2 hours.</p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#" className="btn-primary">Chat with us</a>
                        <Link to="/about" className="btn-ghost">Learn more about us</Link>
                    </div>
                </div>

            </main>

            <Footer />
        </>
    )
}