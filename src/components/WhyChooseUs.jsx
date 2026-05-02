import React from 'react';
import { Award, Target, Zap, Shield, Trophy } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    { icon: <Award size={32} />, title: "Certified Trainers", desc: "Learn from internationally recognized and highly experienced masters." },
    { icon: <Target size={32} />, title: "Discipline & Focus", desc: "We build character, concentration, and respect in every student." },
    { icon: <Zap size={32} />, title: "Physical Fitness", desc: "High-intensity training designed to improve stamina, strength, and agility." },
    { icon: <Shield size={32} />, title: "Self-Defense", desc: "Practical and effective self-defense techniques for real-world situations." },
    { icon: <Trophy size={32} />, title: "Tournament Prep", desc: "Specialized coaching for district, state, and national level championships." },
  ];

  return (
    <section id="why-us" className="section bg-dark">
      <div className="container">
        <h2 className="section-title">Why <span className="text-red">Choose Us</span></h2>
        <h4 className="section-subtitle">Excellence in Martial Arts</h4>
        
        <div className="grid grid-cols-3 why-grid">
          {reasons.map((item, index) => (
            <div key={index} className="why-card">
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
