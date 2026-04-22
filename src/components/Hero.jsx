import { motion } from 'framer-motion'
import HeroBackground from './HeroBackground'
import { useTheme } from '../context/ThemeContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
})

export default function Hero() {
  const { dark } = useTheme()

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-4xl">
        <motion.p {...fadeUp(0.1)} className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-8">
          Abhishek Sharma — Available for work
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className={`text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-6 ${dark ? 'text-white' : 'text-black'}`}
        >
          Full Stack
          <br />
          <span className={dark ? 'text-white/40' : 'text-black/40'}>Developer</span>
          <br />
          <span className={`text-4xl md:text-5xl lg:text-6xl ${dark ? 'text-white/20' : 'text-black/25'}`}>(MERN)</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.35)}
          className={`text-lg md:text-xl font-light max-w-xl leading-relaxed mb-14 ${dark ? 'text-white/40' : 'text-black/50'}`}
        >
          I build scalable backend systems and clean frontend experiences.
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="flex items-center gap-8">
          <a
            href="#work"
            className={`group inline-flex items-center gap-3 text-sm border px-7 py-3.5 rounded-full transition-all duration-300 ${
              dark
                ? 'text-white border-white/20 hover:bg-white hover:text-black'
                : 'text-black border-black/20 hover:bg-black hover:text-white'
            }`}
          >
            View Work
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#contact"
            className={`text-sm transition-colors duration-300 ${dark ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-8 md:left-20 flex items-center gap-3"
      >
        <div className={`w-px h-12 ${dark ? 'bg-white/10' : 'bg-black/10'}`} />
        <span className={`font-mono text-xs tracking-widest ${dark ? 'text-white/20' : 'text-black/25'}`}>SCROLL</span>
      </motion.div>
    </section>
  )
}
