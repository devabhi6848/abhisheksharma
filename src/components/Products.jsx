import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const products = [
  {
    title: 'Logpilot',
    desc: 'Lightweight structured logging SDK for Node.js with automatic context propagation and remote drain support.',
    impact: '800+ npm downloads/month',
    tags: ['Node.js', 'Open Source'],
  },
  {
    title: 'Formwright',
    desc: 'Headless React form library with schema-driven validation, zero dependencies, and full TypeScript support.',
    impact: 'Used in 3 production apps',
    tags: ['React', 'TypeScript'],
  },
  {
    title: 'Deploykit CLI',
    desc: 'Zero-config deployment CLI that wraps Docker + Nginx config generation for small VPS deployments.',
    impact: 'Cuts deploy time by 80%',
    tags: ['Node.js', 'Docker', 'CLI'],
  },
]

export default function Products() {
  const { dark } = useTheme()

  return (
    <section className={`px-8 md:px-20 py-24 border-t ${dark ? 'border-white/5' : 'border-black/8'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-4 ${dark ? 'text-white/25' : 'text-black/30'}`}>Independent Products</p>
        <h2 className={`text-3xl md:text-4xl font-light ${dark ? 'text-white' : 'text-black'}`}>Things I built for myself.</h2>
      </motion.div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-px ${dark ? 'bg-white/5' : 'bg-black/8'}`}>
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`p-8 transition-colors duration-300 group ${dark ? 'bg-[#080808] hover:bg-[#0e0e0e]' : 'bg-[#f5f5f3] hover:bg-[#ebebea]'}`}
          >
            <h3 className={`text-lg font-light mb-3 group-hover:text-accent transition-colors duration-300 ${dark ? 'text-white' : 'text-black'}`}>{p.title}</h3>
            <p className={`text-sm font-light leading-relaxed mb-6 ${dark ? 'text-white/40' : 'text-black/50'}`}>{p.desc}</p>
            <p className="font-mono text-xs text-accent mb-5">{p.impact}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className={`font-mono text-xs border px-2.5 py-0.5 rounded-full ${dark ? 'text-white/25 border-white/8' : 'text-black/35 border-black/10'}`}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
