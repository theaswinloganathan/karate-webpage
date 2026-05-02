import React from 'react';
import { Target, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section bg-dark">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <img 
              src="https://picsum.photos/seed/karate_about/800/600" 
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
            
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon"><Target size={32} /></div>
                <div className="feature-text">
                  <h4>Discipline & Focus</h4>
                  <p>Mastering the mind to conquer daily challenges.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon"><Shield size={32} /></div>
                <div className="feature-text">
                  <h4>Self-Defense</h4>
                  <p>Practical techniques for real-world protection.</p>
                </div>
              </div>
              <div className="feature">
                <div className="feature-icon"><Zap size={32} /></div>
                <div className="feature-text">
                  <h4>Peak Fitness</h4>
                  <p>High-intensity training for ultimate physical health.</p>
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
