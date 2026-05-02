import React from 'react';

const Gallery = () => {
  const images = [
    'https://images.pexels.com/photos/5088308/pexels-photo-5088308.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/6005470/pexels-photo-6005470.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/19471300/pexels-photo-19471300.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/7045598/pexels-photo-7045598.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/8042000/pexels-photo-8042000.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/8041991/pexels-photo-8041991.jpeg?auto=compress&cs=tinysrgb&w=1260',
  ];

  return (
    <section id="gallery" className="section bg-dark">
      <div className="container">
        <h2 className="section-title">Our <span className="text-red">Gallery</span></h2>
        <h4 className="section-subtitle">Moments of Dedication</h4>
        
        <div className="gallery-grid">
          {images.map((img, index) => (
            <div key={index} className="gallery-item">
              <img src={img} alt={`Gallery ${index + 1}`} />
              <div className="gallery-overlay">
                <span className="gallery-icon">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
