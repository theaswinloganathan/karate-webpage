import React from 'react';
import { ArrowRight } from 'lucide-react';

const courses = [
  {
    title: 'Kids Karate',
    age: '5-12 Years',
    desc: 'Fun, engaging classes that teach respect, focus, and basic motor skills.',
    image: 'https://picsum.photos/seed/kids/800/600',
    color: 'white'
  },
  {
    title: 'Beginner Training',
    age: '13+ Years',
    desc: 'Foundational techniques, stances, and fitness conditioning for new students.',
    image: 'https://picsum.photos/seed/beginner/800/600',
    color: 'yellow'
  },
  {
    title: 'Advanced Karate',
    age: 'All Ages',
    desc: 'Advanced katas, sparring (kumite), and weapons training for senior belts.',
    image: 'https://picsum.photos/seed/advanced/800/600',
    color: 'black'
  },
  {
    title: 'Self-Defense',
    age: 'Adults',
    desc: 'Practical, real-world self-defense techniques and situational awareness.',
    image: 'https://picsum.photos/seed/defense/800/600',
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
            <div key={index} className="course-card">
              <div className="course-img">
                <img src={course.image} alt={course.title} />
                <div className={`belt-tag belt-${course.color}`}></div>
              </div>
              <div className="course-info">
                <span className="course-age">{course.age}</span>
                <h3>{course.title}</h3>
                <p>{course.desc}</p>
                <a href="#contact" className="course-link">
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
