import React from 'react';
import { Award, Medal, Trophy, Star } from 'lucide-react';

const Achievements = () => {
  const stats = [
    { icon: <Trophy size={40} />, count: '50+', label: 'Championships Won' },
    { icon: <Medal size={40} />, count: '200+', label: 'Gold Medals' },
    { icon: <Star size={40} />, count: '1000+', label: 'Students Trained' },
    { icon: <Award size={40} />, count: '150+', label: 'Black Belts Awarded' },
  ];

  return (
    <section className="section achievements-section">
      <div className="achievements-bg"></div>
      <div className="container position-relative">
        <div className="grid grid-cols-4 achievements-grid">
          {stats.map((stat, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-icon">{stat.icon}</div>
              <h2 className="achievement-count">{stat.count}</h2>
              <p className="achievement-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
