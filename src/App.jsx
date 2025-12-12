import Hello from "./components/Hello.jsx";
import "./App.css";
import Navbar from "./components/layouts/Navbar/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";
import ButtonUp from "./components/buttonUp.jsx";
import Home from "./pages/Home.jsx";

import About from "./pages/About.jsx";
import WhyUS from "./pages/WhyUS.jsx";
import Collections from "./pages/Collections.jsx";
import CSR from "./pages/CSR.jsx";
import News from "./pages/News.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";
import PopupForm from "./components/PopupForm.jsx";
import { Route, Routes } from "react-router-dom";
import DetailCSR from "./pages/DetailCSR.jsx";
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/whyus" element={<WhyUS />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/corporate-social-responsibility" element={<CSR />} />
            <Route path="/News" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/csr" element={<DetailCSR />} />
          </Routes>
        </div>

        <Footer />
        <ButtonUp />
        {/* <PopupForm /> */}
      </div>
    </>
  );
}

export default App;
