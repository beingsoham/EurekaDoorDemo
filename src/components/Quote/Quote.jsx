import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, MessageCircle, Share2, Heart } from 'lucide-react';
import './Quote.css';

export default function Quote() {
  const { ref: leftRef, inView: leftInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: rightRef, inView: rightInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const sectionRef = useRef(null);

  const [form, setForm] = useState({
    name: '', phone: '', email: '', city: '',
    product: '', requirement: '', budget: '', message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Request submitted! We will contact you within 24 hours.');
    setForm({ 
      name: '', phone: '', email: '', city: '',
      product: '', requirement: '', budget: '', message: '' 
    });
  };

  useEffect(() => {
    if (leftInView && sectionRef.current) {
      // Animate left side elements
      anime({
        targets: '.quote-label',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuint',
      });

      anime({
        targets: '.quote-h2',
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: 100,
      });

      anime({
        targets: '.quote-sub',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuint',
        delay: 200,
      });

      // Animate contact rows with stagger
      setTimeout(() => {
        const contactRows = sectionRef.current?.querySelectorAll('.contact-row');
        if (contactRows) {
          anime({
            targets: contactRows,
            opacity: [0, 1],
            translateX: [-30, 0],
            delay: anime.stagger(80),
            duration: 700,
            easing: 'easeOutExpo',
          });
        }
      }, 300);

      // Animate social icons
      setTimeout(() => {
        const socialIcons = sectionRef.current?.querySelectorAll('.social-icon');
        if (socialIcons) {
          anime({
            targets: socialIcons,
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutExpo',
          });
        }
      }, 500);
    }

    if (rightInView && sectionRef.current) {
      // Animate form card
      anime({
        targets: '.form-card',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 700,
        easing: 'easeOutExpo',
      });

      // Animate form elements with stagger
      setTimeout(() => {
        const formGroups = sectionRef.current?.querySelectorAll('.form-group');
        if (formGroups) {
          anime({
            targets: formGroups,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(50),
            duration: 600,
            easing: 'easeOutQuint',
          });
        }
      }, 200);

      // Animate submit button
      setTimeout(() => {
        anime({
          targets: '.submit-btn',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuint',
        });
      }, 600);
    }
  }, [leftInView, rightInView]);

  return (
    <section id="quote" className="quote-section" ref={sectionRef}>
      <div className="quote-bg-door">
        <svg viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="299" height="499" stroke="var(--gold)" strokeWidth="1" opacity="0.04"/>
        </svg>
      </div>

      <div className="quote-container">
        <div className="quote-split">
          
          <div className="quote-left" ref={leftRef}>
            <div>
              <div className="quote-label">LET'S WORK TOGETHER</div>
              <h2 className="quote-h2">
                Ready to Build<br />
                Something<br />
                Beautiful?
              </h2>
              <p className="quote-sub">
                Experience the pinnacle of architectural craftsmanship. From custom wooden textures to industrial-grade FRP solutions, Eureka Doors provides the structural integrity your projects deserve.
              </p>
              
              <div className="contact-rows">
                <div className="contact-row">
                  <MapPin size={20} color="var(--gold)" className="contact-icon" />
                  <p>203, Vikram Goldmine, FC Road,<br/>Pune &ndash; 411 004, Maharashtra, India.</p>
                </div>
                <div className="contact-row">
                  <Phone size={20} color="var(--gold)" className="contact-icon" />
                  <p>+91 &ndash; 8888 78 4444 / +91 &ndash; 9373 040 830</p>
                </div>
                <div className="contact-row">
                  <Mail size={20} color="var(--gold)" className="contact-icon" />
                  <p>sales@eurekaindia.com / info@eurekaindia.com</p>
                </div>
              </div>

              <div className="quote-divider"></div>

              <div className="social-icons">
                <button onClick={(e) => e.preventDefault()} className="social-icon">
                  <MessageCircle size={20} />
                </button>
                <button onClick={(e) => e.preventDefault()} className="social-icon">
                  <Share2 size={20} />
                </button>
                <button onClick={(e) => e.preventDefault()} className="social-icon">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="quote-right" ref={rightRef}>
            <div>
              <div className="form-card">
                <div className="form-badge">✦ Free Consultation</div>
                <form onSubmit={handleSubmit} className="quote-form">
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 00000 00000" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@studio.com" />
                    </div>
                    <div className="form-group">
                      <label>City / Address *</label>
                      <input type="text" name="city" value={form.city} onChange={handleChange} required placeholder="Pune, India" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Product Interest *</label>
                      <select name="product" value={form.product} onChange={handleChange} required>
                        <option value="" disabled>Select a product...</option>
                        <option value="PVC Doors">PVC Doors</option>
                        <option value="Wooden Doors">Wooden Doors</option>
                        <option value="Theme Doors">Theme Doors</option>
                        <option value="FRP Doors">FRP Doors</option>
                        <option value="Post Forming">Post Forming</option>
                        <option value="Frames">Frames</option>
                        <option value="Plywood">Plywood</option>
                        <option value="All">All</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Requirement Type *</label>
                      <select name="requirement" value={form.requirement} onChange={handleChange} required>
                        <option value="" disabled>Select requirement...</option>
                        <option value="Price Quotation">Price Quotation</option>
                        <option value="Product Details">Product Details</option>
                        <option value="Bulk Order">Bulk Order</option>
                        <option value="Dealer Enquiry">Dealer Enquiry</option>
                        <option value="General Info">General Info</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Your Budget (Optional)</label>
                      <input type="text" name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹50,000 – ₹2,00,000" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Additional Message</label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows="3" placeholder="Tell us about your specific architectural needs..."></textarea>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="submit-btn"
                  >
                    Submit Your Request →
                  </button>
                  
                  <div className="form-footer">
                    🔒 Your details are safe. No spam, ever.
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
