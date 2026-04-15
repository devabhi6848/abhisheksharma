import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section id="contact" className="px-8 md:px-20 py-32 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <p className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase mb-8">Contact</p>
        <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-16">
          Let's build something<br />
          <span className="text-white/30">thoughtful.</span>
        </h2>

        <div className="space-y-5">
          {[
            { label: 'Email', value: 'as684844@gmail.com', href: 'mailto:as684844@gmail.com' },
            { label: 'GitHub', value: 'github.com/devabhi6848', href: 'https://github.com/devabhi6848' },
            { label: 'LinkedIn', value: 'linkedin.com/in/abhishek-sharma-b1bab318b', href: 'https://www.linkedin.com/in/abhishek-sharma-b1bab318b/' },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex items-center gap-8 group">
              <span className="font-mono text-xs text-white/25 w-16 flex-shrink-0">{label}</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-300 text-sm font-light"
              >
                {value}
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-32 pt-8 border-t border-white/5 flex items-center justify-between"
      >
        <span className="font-mono text-xs text-white/15">© 2026</span>
        <span className="font-mono text-xs text-white/15">Abhishek Sharma</span>
      </motion.div>
    </section>
  )
}
