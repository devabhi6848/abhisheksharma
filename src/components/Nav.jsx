import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Work', 'About', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'backdrop-blur-md bg-[#080808]/70 border-b border-white/5' : ''
        }`}
      >
        {/* Logo — initials on mobile, full name on desktop */}
        <span className="font-mono text-sm text-white/40 tracking-widest uppercase">
          <span className="md:hidden">AS</span>
          <span className="hidden md:inline">Abhishek Sharma</span>
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/latestporfolio/resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white/50 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-white/50 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white/50 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[64px] left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-white/5 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {l}
              </a>
            ))}
            <a
              href="/latestporfolio/resume.png"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
