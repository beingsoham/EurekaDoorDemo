import React, { useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';
import anime from 'animejs';
import './FloatingCallButton.css';

export default function FloatingCallButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const phoneNumbers = [
    { number: '+91 – 8888 78 4444', label: 'Main' },
    { number: '+91 – 9373 040 830', label: 'Support' }
  ];

  const emailAddresses = [
    'sales@eurekaindia.com',
    'info@eurekaindia.com'
  ];

  useEffect(() => {
    // Animate the main button on load
    anime({
      targets: '.floating-call-btn',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: 1000,
    });

    // Floating animation for the button
    anime({
      targets: '.floating-call-btn',
      translateY: [-4, 4],
      duration: 2500,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      anime({
        targets: panelRef.current,
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 300,
        easing: 'easeOutQuint',
      });
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setTimeout(() => {
        anime({
          targets: panelRef.current,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 300,
          easing: 'easeOutQuint',
        });

        // Stagger animate the contact items
        anime({
          targets: '.contact-item',
          opacity: [0, 1],
          translateX: [-20, 0],
          delay: anime.stagger(50),
          duration: 400,
          easing: 'easeOutQuint',
        });
      }, 0);
    }
  };

  const handleCall = (number) => {
    const cleanNumber = number.replace(/\s+/g, '').replace('–', '-');
    const link = document.createElement('a');
    link.href = `tel:${cleanNumber}`;
    link.click();
  };

  const handleEmail = (email) => {
    const link = document.createElement('a');
    link.href = `mailto:${email}`;
    link.click();
  }

  return (
    <>
      <div className="floating-call-btn" ref={buttonRef} onClick={handleToggle}>
        {!isOpen ? (
          <Phone size={24} color="white" />
        ) : (
          <X size={24} color="white" />
        )}
      </div>

      {isOpen && (
        <div className="call-contact-panel" ref={panelRef}>
          <div className="panel-header">
            <h3>Quick Contact</h3>
          </div>

          <div className="panel-content">
            <div className="contact-section">
              <h4>Call Us</h4>
              {phoneNumbers.map((item, idx) => (
                <div key={idx} className="contact-item">
                  <button 
                    className="contact-btn call-btn"
                    onClick={() => handleCall(item.number)}
                    title={`Call ${item.number}`}
                  >
                    <Phone size={16} />
                    <div>
                      <div className="contact-label">{item.label}</div>
                      <div className="contact-value">{item.number}</div>
                    </div>
                  </button>
                </div>
              ))}
            </div>

            <div className="contact-divider"></div>

            <div className="contact-section">
              <h4>Email Us</h4>
              {emailAddresses.map((email, idx) => (
                <div key={idx} className="contact-item">
                  <button 
                    className="contact-btn email-btn"
                    onClick={() => handleEmail(email)}
                    title={`Email ${email}`}
                  >
                    <div className="email-icon">✉</div>
                    <div className="contact-value">{email}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-footer">
            <p className="footer-text">Available 24/7</p>
          </div>
        </div>
      )}
    </>
  );
}
