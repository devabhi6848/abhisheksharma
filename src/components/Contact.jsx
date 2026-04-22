import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

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
    if (json.success) {
      setStatus('success')
      e.target.reset()
    } else {
      setStatus('error')
    }
  }

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

        {/* Social links */}
        <div className="space-y-5 mb-16">
          {[
            { label: 'Email', value: 'as684844@gmail.com', href: 'mailto:as684844@gmail.com' },
            { label: 'GitHub', value: 'github.com/devabhi6848', href: 'https://github.com/devabhi6848' },
            { label: 'LinkedIn', value: 'linkedin.com/in/abhishek-sharma-b1bab318b', href: 'https://www.linkedin.com/in/abhishek-sharma-b1bab318b/' },
          ].map(({ label, value, href }) => (
            <div key={label} className="flex items-center gap-8 group">
              <span className="font-mono text-xs text-white/25 w-16 flex-shrink-0">{label}</span>
              <a href={href} target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors duration-300 text-sm font-light">
                {value}
              </a>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="border-t border-white/5 pt-14">
          <p className="font-mono text-xs text-white/25 tracking-[0.2em] uppercase mb-8">Send a message</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-white/25 tracking-widest uppercase">Name</label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-accent transition-colors duration-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-white/25 tracking-widest uppercase">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-accent transition-colors duration-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-white/25 tracking-widest uppercase">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
              />
            </div>

            <div className="flex items-center gap-6">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-3 text-sm text-white border border-white/20 px-7 py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                {status !== 'sending' && <span>→</span>}
              </button>

              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-xs text-accent"
                >
                  Message sent ✓
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-xs text-red-400"
                >
                  Something went wrong. Try again.
                </motion.p>
              )}
            </div>
          </form>
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
