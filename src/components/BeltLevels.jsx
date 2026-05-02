import React, { useEffect, useRef } from 'react';

const BeltLevels = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.timeline-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const belts = [
    { color: "white", name: "White Belt", duration: "0-3 Months", desc: "The foundation. Represents purity, a blank slate ready to absorb the fundamental principles, stances, and discipline of the martial way." },
    { color: "yellow", name: "Yellow Belt", duration: "3-6 Months", desc: "The awakening. Like the first rays of the sun, the student begins to grasp basic techniques and inner power." },
    { color: "orange", name: "Orange Belt", duration: "6-9 Months", desc: "The growing spark. Signifies the expanding physical strength and sharpening reflexes as combinations become fluid." },
    { color: "green", name: "Green Belt", duration: "9-12 Months", desc: "The sprouting seed. A critical stage of development where intermediate katas and controlled sparring (kumite) are introduced." },
    { color: "blue", name: "Blue Belt", duration: "12-18 Months", desc: "The expanding horizon. Techniques become powerful and precise; the student demonstrates significant control and tactical awareness." },
    { color: "brown", name: "Brown Belt", duration: "18-36 Months", desc: "The ripening maturity. Advanced forms, deep technical mastery, and mental fortitude are forged in preparation for the ultimate test." },
    { color: "black", name: "Black Belt", duration: "3-5 Years", desc: "The beginning of true mastery. The darkness beyond the sun. A black belt is not the end, but the start of a lifelong journey of perfection." },
  ];

  return (
    <section id="belts" className="section bg-black">
      <div className="container">
        <h2 className="section-title">Path of a <span className="text-red">Warrior</span></h2>
        <h4 className="section-subtitle">From Beginner to Black Belt</h4>
        
        <div className="vertical-timeline">
          <div className="timeline-line" style={{ background: 'var(--gradient-premium)', opacity: 0.2 }}></div>
          {belts.map((belt, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className={`timeline-badge bg-${belt.color} glow-${belt.color}`} style={{ width: '40px', height: '40px', border: '2px solid rgba(255,255,255,0.1)' }}></div>
              <div className={`timeline-card card-glass card-gradient-border`}>
                <div className="belt-duration" style={{ color: 'var(--color-gold)', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-red)' }}></div>
                  {belt.duration}
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--color-white)' }}>{belt.name}</h3>
                <p style={{ color: 'var(--color-gray)', lineHeight: '1.7' }}>{belt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeltLevels;
