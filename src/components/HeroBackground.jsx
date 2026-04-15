import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 90
const MAX_DIST = 160
const MOUSE_RADIUS = 200
const MOUSE_FORCE = 0.012

export default function HeroBackground() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 } }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    // Init particles
    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.8,
      baseVx: (Math.random() - 0.5) * 0.4,
      baseVy: (Math.random() - 0.5) * 0.4,
    }))

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y

      // Update particles
      particles.current.forEach((p) => {
        // Mouse repulsion / attraction
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
          p.vx += (dx / dist) * force * MOUSE_FORCE * 8
          p.vy += (dy / dist) * force * MOUSE_FORCE * 8
        }

        // Drift back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.02
        p.vy += (p.baseVy - p.vy) * 0.02

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      })

      // Draw connections
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.35

            // Check if either node is near mouse — highlight that connection
            const aDist = Math.sqrt((a.x - mx) ** 2 + (a.y - my) ** 2)
            const bDist = Math.sqrt((b.x - mx) ** 2 + (b.y - my) ** 2)
            const nearMouse = aDist < MOUSE_RADIUS || bDist < MOUSE_RADIUS

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)

            if (nearMouse) {
              const grd = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
              grd.addColorStop(0, `rgba(124,106,247,${opacity * 2.5})`)
              grd.addColorStop(1, `rgba(124,106,247,${opacity * 2.5})`)
              ctx.strokeStyle = grd
              ctx.lineWidth = 0.8
            } else {
              ctx.strokeStyle = `rgba(180,180,220,${opacity})`
              ctx.lineWidth = 0.4
            }
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      particles.current.forEach((p) => {
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const nearMouse = dist < MOUSE_RADIUS
        const proximity = nearMouse ? (1 - dist / MOUSE_RADIUS) : 0

        // Glow for nodes near mouse
        if (nearMouse) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r + 6 * proximity, 0, Math.PI * 2)
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r + 10 * proximity)
          glow.addColorStop(0, `rgba(124,106,247,${0.4 * proximity})`)
          glow.addColorStop(1, 'rgba(124,106,247,0)')
          ctx.fillStyle = glow
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, nearMouse ? p.r + 1.5 * proximity : p.r, 0, Math.PI * 2)
        ctx.fillStyle = nearMouse
          ? `rgba(180,160,255,${0.6 + 0.4 * proximity})`
          : 'rgba(160,160,200,0.5)'
        ctx.fill()
      })

      // Cursor node — big glowing node at mouse
      if (mx > 0 && mx < w) {
        ctx.beginPath()
        ctx.arc(mx, my, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(124,106,247,0.9)'
        ctx.fill()

        const pulse = ctx.createRadialGradient(mx, my, 0, mx, my, 60)
        pulse.addColorStop(0, 'rgba(124,106,247,0.15)')
        pulse.addColorStop(1, 'rgba(124,106,247,0)')
        ctx.beginPath()
        ctx.arc(mx, my, 60, 0, Math.PI * 2)
        ctx.fillStyle = pulse
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      {/* Soft ambient blobs behind the canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#7C6AF7]/8 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#1e3c78]/10 blur-[140px]" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          zIndex: 2,
        }}
      />
    </>
  )
}
