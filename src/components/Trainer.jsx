import React from 'react';
import masterImg from '../assets/me.jpg';

const Trainer = () => {
  return (
    <section id="trainer" className="section bg-black">
      <div className="container">
        <h2 className="section-title">Meet Your <span className="text-red">Master</span></h2>
        <h4 className="section-subtitle">Learn from the Best</h4>
        
        <div className="trainer-card">
          <div className="trainer-image-col">
            <img 
              src={masterImg} 
              alt="Head Master" 
              className="trainer-img"
            />
          </div>
          <div className="trainer-info-col">
            <h3 className="trainer-name">Sensei Rajat Sharma</h3>
            <p className="trainer-title text-gold">7th Dan Black Belt | Chief Instructor</p>
            <p className="trainer-desc">
              With over 20 years of experience in traditional martial arts, Sensei Rajat is dedicated to shaping not just athletes, but individuals with strong character. He has trained national champions and thousands of students.
            </p>
            
            <ul className="trainer-achievements">
              <li>✓ 7th Dan Black Belt in Shotokan Karate</li>
              <li>✓ National Karate Champion (2010-2015)</li>
              <li>✓ Certified Self-Defense Instructor</li>
              <li>✓ 20+ Years Teaching Experience</li>
            </ul>
            
            <div className="trainer-stats">
              <div className="stat">
                <span className="stat-num text-red">15+</span>
                <span className="stat-text">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-num text-red">50+</span>
                <span className="stat-text">Medals Won</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trainer;
