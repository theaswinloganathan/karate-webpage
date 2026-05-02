import React from 'react';

const Gallery = () => {
  const images = [
    'https://picsum.photos/seed/karate1/800/600',
    'https://picsum.photos/seed/karate2/800/600',
    'https://picsum.photos/seed/karate3/800/600',
    'https://picsum.photos/seed/martial1/800/600',
    'https://picsum.photos/seed/martial2/800/600',
    'https://picsum.photos/seed/karate4/800/600',
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
