import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "At what age can my child start karate?", answer: "We accept children from the age of 5. Our Kids Karate program is specifically designed for young beginners to develop focus and basic motor skills." },
    { question: "Do I need any prior experience to join?", answer: "Not at all! We have classes tailored for absolute beginners. Our trainers will guide you step-by-step from the very basics." },
    { question: "How long does it take to get a black belt?", answer: "Achieving a black belt typically takes 4 to 5 years of consistent training and dedication, though the timeline varies for each individual." },
    { question: "What should I wear for my first trial class?", answer: "For your trial class, comfortable track pants and a t-shirt are perfect. Once you enroll, you can purchase the official academy uniform (Gi)." },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="section-title">Common <span className="text-red">Questions</span></h2>
        <h4 className="section-subtitle">Everything You Need to Know</h4>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
              <div className="faq-question">
                <h3>{faq.question}</h3>
                {openIndex === index ? <ChevronUp className="text-red" /> : <ChevronDown className="text-gray" />}
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
