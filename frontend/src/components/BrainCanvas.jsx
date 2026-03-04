import { useEffect, useRef } from 'react'

/**
 * Mini brain canvas — used in feature section 6 of HomePage.
 * Mirrors homepage.js brainCanvas logic.
 */
export default function BrainCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const bc = canvas.getContext('2d')
        const BW = 280, BH = 180
        let rafId

        const bNodes = Array.from({ length: 22 }, () => ({
            x: 20 + Math.random() * (BW - 40),
            y: 20 + Math.random() * (BH - 40),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2.5 + 1.5,
            pulse: Math.random() * Math.PI * 2,
        }))

        function draw() {
            bc.clearRect(0, 0, BW, BH)

            bNodes.forEach(n => {
                n.x += n.vx; n.y += n.vy
                if (n.x < 10 || n.x > BW - 10) n.vx *= -1
                if (n.y < 10 || n.y > BH - 10) n.vy *= -1
                n.pulse += 0.04
            })

            for (let i = 0; i < bNodes.length; i++) {
                for (let j = i + 1; j < bNodes.length; j++) {
                    const dx = bNodes[i].x - bNodes[j].x, dy = bNodes[i].y - bNodes[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 90) {
                        const alpha = (1 - dist / 90) * 0.6
                        const grad = bc.createLinearGradient(bNodes[i].x, bNodes[i].y, bNodes[j].x, bNodes[j].y)
                        grad.addColorStop(0, `rgba(167,139,250,${alpha})`)
                        grad.addColorStop(1, `rgba(236,72,153,${alpha * 0.5})`)
                        bc.beginPath(); bc.strokeStyle = grad; bc.lineWidth = 1
                        bc.moveTo(bNodes[i].x, bNodes[i].y)
                        bc.lineTo(bNodes[j].x, bNodes[j].y)
                        bc.stroke()
                    }
                }
            }

            bNodes.forEach(n => {
                const glow = bc.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
                glow.addColorStop(0, `rgba(167,139,250,${0.6 + 0.3 * Math.sin(n.pulse)})`)
                glow.addColorStop(1, 'transparent')
                bc.beginPath(); bc.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2)
                bc.fillStyle = glow; bc.fill()
                bc.beginPath(); bc.arc(n.x, n.y, n.r, 0, Math.PI * 2)
                bc.fillStyle = `rgba(167,139,250,${0.8 + 0.2 * Math.sin(n.pulse)})`; bc.fill()
            })

            rafId = requestAnimationFrame(draw)
        }
        draw()

        return () => cancelAnimationFrame(rafId)
    }, [])

    return <canvas ref={canvasRef} className="brain-canvas" id="brainCanvas" width={280} height={180} />
}
