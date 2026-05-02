import React from 'react';

const Gallery = () => {
  const images = [
    'https://loremflickr.com/800/600/karate?lock=7',
    'https://loremflickr.com/800/600/karate?lock=8',
    'https://loremflickr.com/800/600/karate?lock=9',
    'https://loremflickr.com/800/600/martialarts?lock=10',
    'https://loremflickr.com/800/600/martialarts?lock=11',
    'https://loremflickr.com/800/600/karate?lock=12',
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
