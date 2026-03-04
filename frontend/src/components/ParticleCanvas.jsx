import { useEffect, useRef } from 'react'

/**
 * Particle canvas background — used by About, FAQ, Login, and Landing pages.
 * Mirrors shared.js particle logic.
 */
export default function ParticleCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        let W, H, pts = []
        let rafId

        function resize() {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }

        const COLORS = ['99,102,241', '236,72,153', '139,92,246', '20,184,166']

        function makePt() {
            return {
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.3 + 0.3,
                alpha: Math.random() * 0.4 + 0.1,
                c: COLORS[Math.floor(Math.random() * COLORS.length)],
            }
        }

        function init() {
            resize()
            pts = Array.from({ length: 60 }, makePt)
            tick()
        }

        function tick() {
            ctx.clearRect(0, 0, W, H)

            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0 || p.x > W) p.vx *= -1
                if (p.y < 0 || p.y > H) p.vy *= -1
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.c},${p.alpha})`
                ctx.fill()
            })

            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x
                    const dy = pts[i].y - pts[j].y
                    const d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 100) {
                        ctx.beginPath()
                        ctx.moveTo(pts[i].x, pts[i].y)
                        ctx.lineTo(pts[j].x, pts[j].y)
                        ctx.strokeStyle = `rgba(148,163,184,${0.07 * (1 - d / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            rafId = requestAnimationFrame(tick)
        }

        window.addEventListener('resize', resize)
        init()

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            id="bg-canvas"
            style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
    )
}
