import { motion } from 'framer-motion'
import profileImg from '../assets/profile.jpg'

const stack = ['React', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'TypeScript', 'PostgreSQL']

export default function About() {
  return (
    <section id="about" className="px-8 md:px-20 py-32 border-t border-white/5">
      <div className="max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_320px] gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase mb-8">About</p>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">Abhishek Sharma</h2>
          <p className="text-white/60 font-light leading-[1.8] text-base mb-6">
            I'm a full-stack engineer who cares about the whole system — from database schema to pixel-level UI. I think in tradeoffs, write for maintainability, and ship things that actually work under load.
          </p>
          <p className="text-white/40 font-light leading-[1.8] text-base mb-6">
            My background spans building production MERN applications, designing REST APIs, and crafting React interfaces that feel fast and intentional. I'm most effective when I own a problem end-to-end.
          </p>
          <p className="text-white/40 font-light leading-[1.8] text-base mb-12">
            Currently open to full-stack or backend-leaning roles at product companies.
          </p>

          <p className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase mb-6">Stack</p>
          <div className="flex flex-wrap gap-3">
            {stack.map((s) => (
              <span key={s} className="font-mono text-sm text-white/50 border border-white/10 px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors duration-300 cursor-default">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center md:items-start gap-6"
        >
          <div className="relative w-64 h-64 md:w-full md:h-80">
            <img
              src={profileImg}
              alt="Abhishek Sharma"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-white/50 font-light text-sm">Abhishek Sharma</p>
            <p className="font-mono text-xs text-white/25 mt-1">Full Stack Developer (MERN)</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
