import React from 'react';
import { Target, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-dark">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <img 
              src="https://images.pexels.com/photos/5088310/pexels-photo-5088310.jpeg?auto=compress&cs=tinysrgb&w=1260" 
              alt="Karate Sensei" 
              className="about-image"
            />
            <div className="experience-badge">
              <span className="years">15+</span>
              <span className="text">Years<br/>Experience</span>
            </div>
          </div>
          
          <div className="about-content">
            <h2 className="section-title" style={{ left: '0', transform: 'none' }}>About Our <span className="text-red">Academy</span></h2>
            <h4 className="section-subtitle" style={{ textAlign: 'left', marginBottom: '2rem' }}>Building Champions Since 2008</h4>
            
            <p className="about-text">
              Elite Karate Academy is dedicated to preserving the traditional values of martial arts while applying them to modern life. Under the guidance of our Head Master, we forge strong bodies, focused minds, and resilient spirits.
            </p>
            
            <div className="about-features" style={{ gap: '1rem' }}>
              <div className="premium-card card-glass card-split animate-slide-up" style={{ padding: '1.2rem', marginBottom: '1rem' }}>
                <div className="card-split-icon glow-red-neon" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                  <Target size={24} />
                </div>
                <div className="feature-text">
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Discipline & Focus</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Mastering the mind to conquer daily challenges.</p>
                </div>
              </div>
              <div className="premium-card card-glass card-split animate-slide-up" style={{ padding: '1.2rem', marginBottom: '1rem', animationDelay: '0.1s' }}>
                <div className="card-split-icon glow-gold-neon" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                  <Shield size={24} />
                </div>
                <div className="feature-text">
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Self-Defense</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Practical techniques for real-world protection.</p>
                </div>
              </div>
              <div className="premium-card card-glass card-split animate-slide-up" style={{ padding: '1.2rem', marginBottom: '1rem', animationDelay: '0.2s' }}>
                <div className="card-split-icon glow-red-neon" style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}>
                  <Zap size={24} />
                </div>
                <div className="feature-text">
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Peak Fitness</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>High-intensity training for ultimate physical health.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
