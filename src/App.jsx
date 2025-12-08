import Hello from './components/Hello.jsx'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ButtonUp from './components/buttonUp.jsx'
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import WhyUS from './views/WhyUS.jsx'
import Collections from './views/Collections.jsx'
import CSR from './views/CSR.jsx'
import Careers from './views/Careers.jsx'
import { Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow mt-22" >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/whyus' element={<WhyUS />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/corporate-social-responsibility' element={<CSR />} />
          <Route path='/careers' element={<Careers />} />
        </Routes>
      </div>

      <Footer />
      <ButtonUp />
    </div>
    </>
  )
}

export default App
