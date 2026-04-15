import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Products from './components/Products'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="grain bg-[#080808] min-h-screen">
      <Nav />
      <Hero />
      <Work />
      <Products />
      <About />
      <Contact />
    </div>
  )
}
