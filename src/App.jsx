import { ThemeProvider, useTheme } from './context/ThemeContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'

function AppInner() {
  const { dark } = useTheme()
  return (
    <div className={`grain min-h-screen transition-colors duration-500 ${dark ? 'bg-[#080808]' : 'bg-[#f5f5f3]'}`}>
      <Nav />
      <Hero />
      <Work />
      <Products />
      <About />
      <Contact />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  )
}
