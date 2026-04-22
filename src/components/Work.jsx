import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

import ak1 from '../assets/apnekhilone/1.png'
import ak2 from '../assets/apnekhilone/2.png'
import ak3 from '../assets/apnekhilone/4.png'
import ak4 from '../assets/apnekhilone/5.png'
import akMain from '../assets/apnekhilone/Screenshot 2026-04-15 224517.png'

import ss1 from '../assets/shirishsparkle/1.png'
import ss2 from '../assets/shirishsparkle/2.png'
import ss3 from '../assets/shirishsparkle/3.png'
import ss4 from '../assets/shirishsparkle/4.png'

import bs1 from '../assets/bluesparing/B 1.png'
import bs2 from '../assets/bluesparing/B 2.png'
import bs3 from '../assets/bluesparing/aaf  2.png'
import bs4 from '../assets/bluesparing/Screenshot 2026-01-03 190652.png'

const projects = [
  {
    id: 1, index: '01', title: 'Apne Khilone', url: 'https://apnekhilone.com',
    short: "Online toy rental platform offering flexible plans for kids' toys, baby gear, party setups, and educational items.",
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay'], role: 'Full Stack Developer',
    thumb: akMain, images: [akMain, ak1, ak2, ak3, ak4],
    problem: 'Parents spend heavily on toys their children outgrow quickly. There was no structured platform in India offering toy rentals with flexible membership plans, age-based rotation, and event-specific rentals.',
    approach: 'Built a full-stack rental platform with membership tiers, age-based toy filtering, and a booking system. Integrated Razorpay for payments and built an admin panel for inventory and order management.',
    architecture: 'React SPA → Express REST API → MongoDB (products, orders, memberships) → Razorpay payment gateway → Node.js cron for rental expiry → Admin dashboard.',
    outcome: 'Platform live at apnekhilone.com. Supports toy rentals, baby equipment, fancy dress, and party setups with active membership subscriptions.',
    features: ['Flexible rental & membership plans', 'Age-based toy recommendations', 'Fancy dress & event toy rentals', 'Razorpay payment integration', 'Admin inventory & order management', 'Toy exchange & rotation system'],
  },
  {
    id: 2, index: '02', title: 'Shirish Sparkle Gems', url: 'https://shirishsparkle.com',
    short: 'Premium online jewelry store specializing in handcrafted gemstone, gold, and diamond jewelry with custom design options.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay'], role: 'Full Stack Developer',
    thumb: ss1, images: [ss1, ss2, ss3, ss4],
    problem: 'A traditional jewelry business needed a modern e-commerce presence to reach customers seeking authentic, handcrafted gemstone jewelry — especially emerald and sapphire pieces — with a premium yet approachable feel.',
    approach: 'Designed a clean, product-first storefront with category filtering (rings, earrings, nose pins, custom), high-fidelity product galleries, and a custom order flow for bespoke jewelry requests.',
    architecture: 'React SPA → Express API → MongoDB (catalog, orders, custom requests) → Razorpay checkout → Email notifications via Nodemailer → Admin panel for catalog management.',
    outcome: 'Live at shirishsparkle.com. Showcases lightweight gold, diamond, and gemstone collections with custom design inquiry flow and online ordering.',
    features: ['Gemstone jewelry catalog (emerald, sapphire, diamond)', 'Custom jewelry order requests', 'Category filtering by type & material', 'Razorpay secure checkout', 'High-res product gallery', 'Admin catalog & order management'],
  },
  {
    id: 3, index: '03', title: 'Blue Sparing', url: 'https://www.bluesparing.com',
    short: 'Insurance management portal streamlining policy tracking, claims, and client management for insurance professionals.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'], role: 'Full Stack Developer',
    thumb: bs1, images: [bs1, bs2, bs3, bs4],
    problem: 'Insurance agents and managers lacked a unified portal to track client policies, manage renewals, process claims, and generate reports — relying on fragmented spreadsheets and manual follow-ups.',
    approach: 'Built a role-based insurance management system with dashboards for agents and admins, automated renewal reminders, policy lifecycle tracking, and a claims workflow with status updates.',
    architecture: 'React dashboard → Express REST API → MongoDB (policies, clients, claims) → JWT + RBAC auth → Node.js cron for renewal alerts → PDF report generation.',
    outcome: 'Live at bluesparing.com. Enables end-to-end insurance policy and claims management with multi-role access for agents, managers, and admins.',
    features: ['Policy lifecycle management', 'Claims processing workflow', 'Role-based access (agent / manager / admin)', 'Automated renewal reminders', 'Client & policy dashboard', 'PDF report generation'],
  },
]

function ProjectModal({ project, onClose, dark }) {
  const [activeImg, setActiveImg] = useState(0)
  const t = (d, l) => (dark ? d : l)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 32 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border ${t('bg-[#0e0e0e] border-white/10', 'bg-white border-black/10')}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image gallery */}
        <div className={`relative w-full aspect-video rounded-t-2xl overflow-hidden ${t('bg-[#0a0a0a]', 'bg-gray-100')}`}>
          <img src={project.images[activeImg]} alt={project.title} className="w-full h-full object-cover" />
          {project.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {project.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-12 h-8 rounded overflow-hidden border transition-all duration-200 ${i === activeImg ? 'border-accent opacity-100' : 'border-white/30 opacity-50 hover:opacity-80'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between mb-8 gap-4">
            <div>
              <p className="font-mono text-xs text-accent tracking-widest mb-2">{project.index}</p>
              <h2 className={`text-2xl font-light ${t('text-white', 'text-black')}`}>{project.title}</h2>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-accent hover:opacity-70 transition-opacity duration-300">
                Live ↗
              </a>
              <button onClick={onClose} className={`text-xl leading-none transition-colors duration-300 ${t('text-white/40 hover:text-white', 'text-black/40 hover:text-black')}`}>✕</button>
            </div>
          </div>

          {[
            { label: 'Problem', content: project.problem },
            { label: 'Approach', content: project.approach },
            { label: 'Architecture', content: project.architecture },
            { label: 'Outcome', content: project.outcome },
          ].map(({ label, content }) => (
            <div key={label} className="mb-7">
              <p className={`font-mono text-xs tracking-widest uppercase mb-2 ${t('text-white/30', 'text-black/40')}`}>{label}</p>
              <p className={`font-light leading-relaxed text-sm ${t('text-white/70', 'text-black/70')}`}>{content}</p>
            </div>
          ))}

          <div>
            <p className={`font-mono text-xs tracking-widest uppercase mb-4 ${t('text-white/30', 'text-black/40')}`}>Key Features</p>
            <ul className="space-y-2">
              {project.features.map((f) => (
                <li key={f} className={`flex items-center gap-3 text-sm font-light ${t('text-white/60', 'text-black/60')}`}>
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Work() {
  const [active, setActive] = useState(null)
  const { dark } = useTheme()
  const t = (d, l) => (dark ? d : l)

  return (
    <section id="work" className="px-8 md:px-20 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-20"
      >
        <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-4 ${t('text-white/25', 'text-black/40')}`}>Selected Work</p>
        <h2 className={`text-3xl md:text-4xl font-light ${t('text-white', 'text-black')}`}>Projects that shipped.</h2>
      </motion.div>

      <div className="space-y-0">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`group border-t py-10 grid grid-cols-1 md:grid-cols-[80px_1fr_200px_auto] gap-6 items-center cursor-pointer transition-colors duration-300 ${t('border-white/10 hover:border-white/25', 'border-black/10 hover:border-black/25')}`}
            onClick={() => setActive(p)}
          >
            <span className={`font-mono text-xs ${t('text-white/30', 'text-black/35')}`}>{p.index}</span>

            <div>
              <h3 className={`text-xl font-light mb-2 group-hover:text-accent transition-colors duration-300 ${t('text-white', 'text-black')}`}>{p.title}</h3>
              <p className={`text-sm font-light mb-5 max-w-lg leading-relaxed ${t('text-white/50', 'text-black/55')}`}>{p.short}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className={`font-mono text-xs border px-3 py-1 rounded-full ${t('text-white/40 border-white/15', 'text-black/50 border-black/15')}`}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={`hidden md:block w-full aspect-video rounded-lg overflow-hidden border transition-all duration-300 ${t('border-white/10 group-hover:border-white/25', 'border-black/10 group-hover:border-black/20')}`}>
              <img src={p.thumb} alt={p.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            </div>

            <div className="text-right">
              <p className={`font-mono text-xs mb-3 ${t('text-white/30', 'text-black/40')}`}>{p.role}</p>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-sm group-hover:text-accent transition-colors duration-300 ${t('text-white/40', 'text-black/40')}`}>View →</span>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`font-mono text-xs hover:text-accent transition-colors duration-300 ${t('text-white/25', 'text-black/35')}`}>
                  {p.url.replace('https://', '').replace('http://', '').replace('www.', '')}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
        <div className={`border-t ${t('border-white/10', 'border-black/10')}`} />
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} dark={dark} />}
      </AnimatePresence>
    </section>
  )
}
