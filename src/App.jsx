import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Trainer from './components/Trainer';
import Courses from './components/Courses';
import BeltLevels from './components/BeltLevels';
import Gallery from './components/Gallery';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Timings from './components/Timings';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import MasterDashboard from './components/MasterDashboard';
import StudentDashboard from './components/StudentDashboard';

const MainLayout = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <WhyChooseUs />
    <Trainer />
    <Courses />
    <BeltLevels />
    <Gallery />
    <Achievements />
    <Testimonials />
    <Timings />
    <FAQ />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/master" element={<><Navbar /><MasterDashboard /><Footer /></>} />
        <Route path="/student" element={<><Navbar /><StudentDashboard /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
