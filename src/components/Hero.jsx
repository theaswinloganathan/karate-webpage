import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <img 
          src="https://loremflickr.com/1920/1080/karate?lock=1" 
          alt="Karate Master" 
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <h3 className="hero-subtitle animate-fade-in text-gold">Master The Art of Discipline</h3>
        <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.2s' }}>
          UNLEASH YOUR <br/><span className="text-red">INNER WARRIOR</span>
        </h1>
        <p className="hero-text animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Join Elite Karate Academy. Train with grandmasters, build unshakeable confidence, and achieve peak physical fitness.
        </p>
        <div className="hero-btns animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a href="#contact" className="btn btn-primary">
            Book Free Trial <ArrowRight size={20} />
          </a>
          <a href="#courses" className="btn btn-outline">
            View Courses
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
