import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function Blob({ style, animate, transition }) {
  return (
    <motion.div
      className="absolute rounded-full blur-[120px] pointer-events-none"
      style={style}
      animate={animate}
      transition={transition}
    />
  )
}

export default function HeroBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 })

  const spotX = useTransform(springX, (v) => `${v}px`)
  const spotY = useTransform(springY, (v) => `${v}px`)

  const blob1X = useTransform(springX, (v) => `${v * 0.04}px`)
  const blob1Y = useTransform(springY, (v) => `${v * 0.04}px`)
  const blob2X = useTransform(springX, (v) => `${v * -0.03}px`)
  const blob2Y = useTransform(springY, (v) => `${v * -0.03}px`)

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Spotlight following cursor */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          left: spotX,
          top: spotY,
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(124,106,247,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Blob 1 - accent purple */}
      <motion.div
        className="absolute rounded-full blur-[140px] pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: 'rgba(124,106,247,0.12)',
          x: blob1X,
          y: blob1Y,
        }}
        animate={{ top: ['10%', '20%', '10%'], left: ['15%', '25%', '15%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 2 - deep blue */}
      <motion.div
        className="absolute rounded-full blur-[160px] pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: 'rgba(30,60,120,0.15)',
          x: blob2X,
          y: blob2Y,
        }}
        animate={{ top: ['50%', '35%', '50%'], right: ['10%', '20%', '10%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob 3 - subtle warm */}
      <motion.div
        className="absolute rounded-full blur-[180px] pointer-events-none"
        style={{ width: 400, height: 400, background: 'rgba(80,40,120,0.08)' }}
        animate={{ bottom: ['5%', '15%', '5%'], left: ['40%', '55%', '40%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Faint orbiting ring */}
      <motion.div
        className="absolute border border-white/[0.03] rounded-full pointer-events-none"
        style={{ width: 700, height: 700, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute border border-white/[0.025] rounded-full pointer-events-none"
        style={{ width: 1000, height: 1000, top: '50%', left: '50%', x: '-50%', y: '-50%' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}
