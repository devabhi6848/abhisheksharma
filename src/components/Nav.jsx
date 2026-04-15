import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['Work', 'About', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-[#080808]/70 border-b border-white/5' : ''
      }`}
    >
      <span className="font-mono text-sm text-white/40 tracking-widest uppercase">Abhishek Sharma</span>
      <ul className="flex gap-10">
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
    </motion.nav>
  )
}
