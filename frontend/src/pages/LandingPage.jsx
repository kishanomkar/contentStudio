import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas.jsx'
import '../styles/landing.css'

export default function LandingPage() {
    const navigate = useNavigate()
    const bookRef = useRef(null)
    const isFlippingRef = useRef(false)
    const rafRef = useRef(null)

    useEffect(() => {
        const book = bookRef.current
        if (!book) return

        let cx = 0, cy = 0, tx = 0, ty = 0

        const lerp = (a, b, t) => a + (b - a) * t

        const onMouseMove = (e) => {
            if (isFlippingRef.current) return
            const hw = window.innerWidth / 2, hh = window.innerHeight / 2
            tx = ((e.clientX - hw) / hw) * 10
            ty = -((e.clientY - hh) / hh) * 8
        }
        window.addEventListener('mousemove', onMouseMove)

        function animate() {
            if (!isFlippingRef.current) {
                cx = lerp(cx, tx, 0.08)
                cy = lerp(cy, ty, 0.08)
                book.style.animation = 'none'
                book.style.transform = `rotateY(${cx - 4}deg) rotateX(${cy + 3}deg) translateY(${Math.sin(Date.now() / 2000) * 8}px)`
            }
            rafRef.current = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

    function doFlip() {
        if (isFlippingRef.current) return
        isFlippingRef.current = true
        const book = bookRef.current
        book.classList.add('is-flipping')

        const overlay = document.getElementById('pageTransition')
        const ptFill = document.getElementById('ptFill')

        setTimeout(() => {
            overlay.classList.add('active')
            setTimeout(() => { ptFill.style.width = '100%' }, 80)
            setTimeout(() => { navigate('/home') }, 1100)
        }, 900)
    }

    return (
        <>
            <ParticleCanvas />

            <div className="scene" id="scene" onClick={doFlip}>
                <div className="book" id="book" ref={bookRef}>

                    {/* FRONT */}
                    <div className="book-face front" id="bookFront">
                        <div className="face-orb face-orb-1" />
                        <div className="face-orb face-orb-2" />
                        <div className="face-orb face-orb-3" />

                        <div className="front-content">
                            <div className="front-eyebrow">✦ AI-Powered Content Creation</div>
                            <div className="front-logo">
                                <span className="front-logo-icon">⚡</span>
                                Content<span className="logo-accent">Studio</span> AI
                            </div>
                            <p className="front-tagline">From ideas to everywhere.<br />Instantly.</p>

                            <div className="float-cards">
                                <div className="mini-card mc-1"><span>🎯</span> Predictive AI</div>
                                <div className="mini-card mc-2"><span>🎬</span> 1-Click Videos</div>
                                <div className="mini-card mc-3"><span>📊</span> Growth AI</div>
                                <div className="mini-card mc-4"><span>💰</span> Brand Deals</div>
                            </div>

                            <button
                                className="flip-btn"
                                id="flipBtn"
                                onClick={(e) => { e.stopPropagation(); doFlip() }}
                            >
                                <span className="flip-btn-text">Open &amp; Explore</span>
                                <span className="flip-btn-arrow">→</span>
                                <div className="flip-btn-ripple" />
                            </button>

                            <p className="flip-hint">Click to enter ↑</p>
                        </div>

                        <div className="book-spine" />
                    </div>

                    {/* BACK */}
                    <div className="book-face back" id="bookBack">
                        <div className="back-content">
                            <div className="back-logo">
                                <span>⚡</span>
                                Content<span className="back-accent">Studio</span> AI
                            </div>
                            <p className="back-sub">Loading your workspace…</p>
                            <div className="back-spinner">
                                <div className="spinner-ring" />
                                <div className="spinner-ring ring-2" />
                                <div className="spinner-ring ring-3" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Page transition overlay */}
            <div className="page-transition" id="pageTransition">
                <div className="pt-logo">
                    <span>⚡</span> Content<span>Studio</span> AI
                </div>
                <div className="pt-bar">
                    <div className="pt-fill" id="ptFill" />
                </div>
                <p className="pt-label">Preparing your studio…</p>
            </div>
        </>
    )
}
