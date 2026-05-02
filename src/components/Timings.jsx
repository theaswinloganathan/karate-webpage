import React from 'react';
import { Clock, Calendar } from 'lucide-react';

const Timings = () => {
  const schedule = [
    { day: 'Monday - Wednesday', time: '5:00 PM - 8:00 PM', class: 'Kids & Beginners' },
    { day: 'Tuesday - Thursday', time: '6:00 PM - 9:00 PM', class: 'Advanced & Adults' },
    { day: 'Friday', time: '5:00 PM - 7:00 PM', class: 'Sparring (Kumite)' },
    { day: 'Saturday', time: '8:00 AM - 11:00 AM', class: 'Special Training / Weapons' },
    { day: 'Sunday', time: 'Closed', class: 'Rest Day' },
  ];

  const fees = [
    { plan: 'Kids Program', price: '₹2,500', period: '/ month', features: ['2 Classes per week', 'Basic uniform included', 'Quarterly grading'] },
    { plan: 'Pro Training', price: '₹4,000', period: '/ month', features: ['Unlimited classes', 'Premium uniform', 'Competition prep', 'Weapons training'], popular: true },
    { plan: 'Private Sessions', price: '₹1,500', period: '/ hour', features: ['1-on-1 Master training', 'Customized schedule', 'Personalized focus'] },
  ];

  return (
    <section id="timings" className="section bg-dark">
      <div className="container">
        <h2 className="section-title">Schedule & <span className="text-red">Fees</span></h2>
        <h4 className="section-subtitle">Find the Right Plan For You</h4>
        
        <div className="grid grid-cols-2 timings-layout">
          {/* Schedule */}
          <div className="schedule-box">
            <h3 className="box-title"><Clock className="text-gold" /> Class Timings</h3>
            <ul className="schedule-list">
              {schedule.map((item, index) => (
                <li key={index} className="schedule-item">
                  <div className="schedule-day">{item.day}</div>
                  <div className="schedule-info">
                    <span className="text-red font-bold">{item.time}</span>
                    <span className="schedule-class">{item.class}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Fees */}
          <div className="fees-container">
            {fees.map((fee, index) => (
              <div key={index} className={`fee-card ${fee.popular ? 'popular' : ''}`}>
                {fee.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{fee.plan}</h3>
                <div className="price">
                  <h2>{fee.price}</h2><span>{fee.period}</span>
                </div>
                <ul className="fee-features">
                  {fee.features.map((feat, i) => (
                    <li key={i}>✓ {feat}</li>
                  ))}
                </ul>
                <button className={`btn ${fee.popular ? 'btn-primary' : 'btn-outline'} w-100`}>Select Plan</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timings;
