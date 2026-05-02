import React from 'react';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    title: 'Kids Karate',
    age: '5-12 Years',
    desc: 'Fun, engaging classes that teach respect, focus, and basic motor skills.',
    image: 'https://images.pexels.com/photos/7045488/pexels-photo-7045488.jpeg?auto=compress&cs=tinysrgb&w=1260',
    color: 'white'
  },
  {
    title: 'Beginner Training',
    age: '13+ Years',
    desc: 'Foundational techniques, stances, and fitness conditioning for new students.',
    image: 'https://images.pexels.com/photos/7990068/pexels-photo-7990068.jpeg?auto=compress&cs=tinysrgb&w=1260',
    color: 'yellow'
  },
  {
    title: 'Advanced Karate',
    age: 'All Ages',
    desc: 'Advanced katas, sparring (kumite), and weapons training for senior belts.',
    image: 'https://images.pexels.com/photos/10655516/pexels-photo-10655516.jpeg?auto=compress&cs=tinysrgb&w=1260',
    color: 'black'
  },
  {
    title: 'Self-Defense',
    age: 'Adults',
    desc: 'Practical, real-world self-defense techniques and situational awareness.',
    image: 'https://images.pexels.com/photos/10752027/pexels-photo-10752027.jpeg?auto=compress&cs=tinysrgb&w=1260',
    color: 'red'
  }
];

const Courses = () => {
  return (
    <section id="courses" className="section">
      <div className="container">
        <h2 className="section-title">Training <span className="text-red">Programs</span></h2>
        <h4 className="section-subtitle">Classes for Every Skill Level</h4>
        
        <div className="grid grid-cols-4 course-grid">
          {courses.map((course, index) => (
            <div key={index} className="premium-card card-3d animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="course-img" style={{ borderRadius: '12px', marginBottom: '1.5rem', height: '180px' }}>
                <img src={course.image} alt={course.title} style={{ borderRadius: '12px' }} />
                <div className={`belt-tag belt-${course.color}`} style={{ boxShadow: '0 0 15px var(--color-red)' }}></div>
              </div>
              <div className="course-info" style={{ padding: 0 }}>
                <span className="badge-pill badge-new" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>{course.age}</span>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: 'var(--color-white)' }}>{course.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)', marginBottom: '1.5rem', lineHeight: '1.5' }}>{course.desc}</p>
                <a href="#contact" className="course-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-red)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  Enroll Now <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
