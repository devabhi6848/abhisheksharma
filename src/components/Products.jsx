import { motion } from 'framer-motion'

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
  return (
    <section className="px-8 md:px-20 py-24 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <p className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase mb-4">Independent Products</p>
        <h2 className="text-3xl md:text-4xl font-light text-white">Things I built for myself.</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-[#080808] p-8 hover:bg-[#0e0e0e] transition-colors duration-300 group"
          >
            <h3 className="text-lg font-light text-white mb-3 group-hover:text-accent transition-colors duration-300">{p.title}</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed mb-6">{p.desc}</p>
            <p className="font-mono text-xs text-accent mb-5">{p.impact}</p>
            <div className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-xs text-white/25 border border-white/8 px-2.5 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
