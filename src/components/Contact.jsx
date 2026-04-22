import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const { dark } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = Object.fromEntries(new FormData(e.target))
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_key: '63704b54-0cb6-4296-b436-b7eee0b0ab36', ...data }),
    })
    const json = await res.json()
    if (json.success) { setStatus('success'); e.target.reset() }
    else setStatus('error')
  }

  const t = (d, l) => (dark ? d : l)

  return (
    <section id="contact" className={`px-8 md:px-20 py-32 border-t ${t('border-white/5', 'border-black/8')}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-8 ${t('text-white/25', 'text-black/30')}`}>Contact</p>
        <h2 className={`text-4xl md:text-5xl font-light leading-tight mb-16 ${t('text-white', 'text-black')}`}>
          Let's build something<br />
          <span className={t('text-white/30', 'text-black/30')}>thoughtful.</span>
        </h2>

        <div className="space-y-5 mb-16">
          {[
            { label: 'Email', value: 'as684844@gmail.com', href: 'mailto:as684844@gmail.com' },
            { label: 'GitHub', value: 'github.com/devabhi6848', href: 'https://github.com/devabhi6848' },
            { label: 'LinkedIn', value: 'linkedin.com/in/abhishek-sharma-b1bab318b', href: 'https://www.linkedin.com/in/abhishek-sharma-b1bab318b/' },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex items-center gap-8">
              <span className={`font-mono text-xs w-16 flex-shrink-0 ${t('text-white/25', 'text-black/30')}`}>{label}</span>
              <a href={href} target="_blank" rel="noopener noreferrer"
                className={`text-sm font-light transition-colors duration-300 ${t('text-white/50 hover:text-white', 'text-black/50 hover:text-black')}`}>
                {value}
              </a>
            </div>
          ))}
        </div>

        <div className={`border-t pt-14 ${t('border-white/5', 'border-black/8')}`}>
          <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-8 ${t('text-white/25', 'text-black/30')}`}>Send a message</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-2">
                  <label className={`font-mono text-xs tracking-widest uppercase ${t('text-white/25', 'text-black/30')}`}>{label}</label>
                  <input
                    name={name} type={type} required placeholder={placeholder}
                    className={`bg-transparent border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-300 ${t('border-white/10 text-white/70 placeholder-white/20', 'border-black/15 text-black/70 placeholder-black/25')}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-mono text-xs tracking-widest uppercase ${t('text-white/25', 'text-black/30')}`}>Message</label>
              <textarea
                name="message" required rows={5} placeholder="Tell me about your project..."
                className={`bg-transparent border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-300 resize-none ${t('border-white/10 text-white/70 placeholder-white/20', 'border-black/15 text-black/70 placeholder-black/25')}`}
              />
            </div>

            <div className="flex items-center gap-6">
              <button
                type="submit" disabled={status === 'sending'}
                className={`inline-flex items-center gap-3 text-sm border px-7 py-3.5 rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${t('text-white border-white/20 hover:bg-white hover:text-black', 'text-black border-black/20 hover:bg-black hover:text-white')}`}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <span>→</span>}
              </button>
              {status === 'success' && (
                <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="font-mono text-xs text-accent">
                  Message sent ✓
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="font-mono text-xs text-red-400">
                  Something went wrong. Try again.
                </motion.p>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className={`mt-32 pt-8 border-t flex items-center justify-between ${t('border-white/5', 'border-black/8')}`}
      >
        <span className={`font-mono text-xs ${t('text-white/15', 'text-black/20')}`}>© 2026</span>
        <span className={`font-mono text-xs ${t('text-white/15', 'text-black/20')}`}>Abhishek Sharma</span>
      </motion.div>
    </section>
  )
}
