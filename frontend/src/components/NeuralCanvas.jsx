import { useEffect, useRef } from 'react'

/**
 * Neural network canvas background — used by HomePage.
 * Mirrors homepage.js neural canvas logic.
 */
export default function NeuralCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        let rafId
        let mouseX = -999, mouseY = -999

        function resizeCanvas() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()

        const NODES = 80
        const nodes = Array.from({ length: NODES }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 2 + 1,
        }))

        const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY }
        document.addEventListener('mousemove', onMouseMove)

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1
                const dx = n.x - mouseX, dy = n.y - mouseY
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 100) { n.x += (dx / dist) * 1.5; n.y += (dy / dist) * 1.5 }
            })

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 140) {
                        const alpha = (1 - dist / 140) * 0.35
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(130,140,248,${alpha})`
                        ctx.lineWidth = 0.6
                        ctx.moveTo(nodes[i].x, nodes[i].y)
                        ctx.lineTo(nodes[j].x, nodes[j].y)
                        ctx.stroke()
                    }
                }
            }

            nodes.forEach(n => {
                ctx.beginPath()
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(130,140,248,0.6)'
                ctx.fill()
            })

            rafId = requestAnimationFrame(draw)
        }
        draw()

        const onResize = () => resizeCanvas()
        window.addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(rafId)
            document.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            id="neural-canvas"
            style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
    )
}
