import { useState, useEffect } from 'react'
import '../styles/shared.css'

export default function WaitlistModal({ onClose }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            setSubmitted(true)
        }, 1200)
    }

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box">
                <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

                {submitted ? (
                    <div className="modal-success">
                        <span className="success-icon">🎉</span>
                        <h3>You're on the list!</h3>
                        <p>We'll notify you the moment early access opens. Get ready to 10× your content output.</p>
                    </div>
                ) : (
                    <>
                        <div className="modal-icon">⚡</div>
                        <h2 className="modal-title">Join the Waitlist</h2>
                        <p className="modal-sub">
                            Be first in line for Content Studio AI early access. We're onboarding creators who are serious about scaling.
                        </p>
                        <form className="modal-form" onSubmit={handleSubmit}>
                            <input
                                className="modal-input"
                                type="text"
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="modal-input"
                                type="email"
                                placeholder="Your email address *"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                className="modal-submit"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Joining...' : 'Secure My Spot →'}
                            </button>
                        </form>
                        <p className="modal-note">🔒 No spam. Unsubscribe anytime. We respect your inbox.</p>
                    </>
                )}
            </div>
        </div>
    )
}
