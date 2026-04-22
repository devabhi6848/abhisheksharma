import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const links = ['Work', 'About', 'Contact']

function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-12 h-6 rounded-full border border-white/20 dark:border-white/20 light:border-black/20 transition-colors duration-300 flex items-center px-1"
      style={{ background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}
    >
      <motion.div
        animate={{ x: dark ? 0 : 22 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
        style={{ background: dark ? '#7C6AF7' : '#f59e0b' }}
      >
        {dark ? '🌙' : '☀️'}
      </motion.div>
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { dark } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = scrolled
    ? dark
      ? 'backdrop-blur-md bg-[#080808]/70 border-b border-white/5'
      : 'backdrop-blur-md bg-[#f5f5f3]/80 border-b border-black/8'
    : ''

  const linkClass = dark
    ? 'text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide'
    : 'text-sm text-black/50 hover:text-black transition-colors duration-300 tracking-wide'

  const logoClass = dark
    ? 'font-mono text-sm text-white/40 tracking-widest uppercase'
    : 'font-mono text-sm text-black/40 tracking-widest uppercase'

  const barClass = dark ? 'bg-white/50' : 'bg-black/50'

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-5 flex items-center justify-between transition-all duration-500 ${navBg}`}
      >
        <span className={logoClass}>
          <span className="md:hidden">AS</span>
          <span className="hidden md:inline">Abhishek Sharma</span>
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className={linkClass}>{l}</a>
            </li>
          ))}
          <li>
            <a href="/latestporfolio/resume.png" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Resume
            </a>
          </li>
          <li><ThemeToggle /></li>
        </ul>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px transition-all duration-300 ${barClass} ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px transition-all duration-300 ${barClass} ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px transition-all duration-300 ${barClass} ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`fixed top-[64px] left-0 right-0 z-40 backdrop-blur-md border-b px-6 py-6 flex flex-col gap-5 md:hidden ${
              dark ? 'bg-[#080808]/95 border-white/5' : 'bg-[#f5f5f3]/95 border-black/8'
            }`}
          >
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className={linkClass}>{l}</a>
            ))}
            <a href="/latestporfolio/resume.png" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className={linkClass}>
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
