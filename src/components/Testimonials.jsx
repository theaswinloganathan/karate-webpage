import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Amit Patel",
      role: "Parent",
      text: "Joining this academy was the best decision for my son. His focus and discipline have improved drastically.",
      rating: 5
    },
    {
      name: "Neha Sharma",
      role: "Student (Brown Belt)",
      text: "The masters are incredibly dedicated. The training is intense but highly rewarding. I feel stronger every day.",
      rating: 5
    },
    {
      name: "Rahul Verma",
      role: "Adult Beginner",
      text: "I started late, but the trainers made me feel comfortable. The self-defense techniques are very practical.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="section bg-dark">
      <div className="container">
        <h2 className="section-title">Student <span className="text-red">Reviews</span></h2>
        <h4 className="section-subtitle">What Our Community Says</h4>
        
        <div className="grid grid-cols-3 testimonials-grid">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-gold" fill="currentColor" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">
                <h4>{review.name}</h4>
                <p>{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
