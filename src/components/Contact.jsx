import React from 'react';
import { Phone, MapPin, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section bg-dark">
      <div className="container">
        <h2 className="section-title">Get In <span className="text-red">Touch</span></h2>
        <h4 className="section-subtitle">Start Your Martial Arts Journey Today</h4>
        
        <div className="grid grid-cols-2 contact-grid">
          <div className="contact-info">
            <div className="free-trial-box mb-4 p-4 border-red" style={{ backgroundColor: 'var(--color-black)', padding: '2rem', borderRadius: '8px', borderLeft: '4px solid var(--color-red)', marginBottom: '2rem' }}>
              <h3 className="text-gold" style={{ marginBottom: '1rem' }}>Claim Your Free Trial!</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--color-gray)' }}>Experience our world-class training facility and expert instruction at zero cost. See the difference for yourself.</p>
              <a href="#contact" className="btn btn-primary">Book Free Class</a>
            </div>

            <div className="info-item">
              <div className="icon-box"><Phone size={24} /></div>
              <div>
                <h4>Call Us</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-box"><Mail size={24} /></div>
              <div>
                <h4>Email</h4>
                <p>contact@elitekarate.in</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-box"><MapPin size={24} /></div>
              <div>
                <h4>Location</h4>
                <p>12th Cross, Indiranagar, Bangalore 560038, India</p>
              </div>
            </div>
            
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-gold whatsapp-btn">
              <MessageCircle size={20} /> Chat on WhatsApp
            </a>
          </div>
          
          <div className="contact-form-wrapper">
            <form className="contact-form" style={{ marginBottom: '2rem' }}>
              <div className="form-group">
                <input type="text" placeholder="Full Name" required />
              </div>
              <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <input type="email" placeholder="Email Address" required />
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <div className="form-group">
                <select required>
                  <option value="">Select Program / Enquiry</option>
                  <option value="trial">Book Free Trial</option>
                  <option value="kids">Kids Karate</option>
                  <option value="adults">Adult Training</option>
                  <option value="private">Private Sessions</option>
                </select>
              </div>
              <div className="form-group">
                <textarea placeholder="Your Message" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Enquiry</button>
            </form>
            
            <div className="google-map" style={{ width: '100%', height: '250px', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9714890665313!2d77.63914807490412!3d12.973685987342084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16af2b0c3453%3A0xb3e74ab79899f8d9!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1714481023456!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
