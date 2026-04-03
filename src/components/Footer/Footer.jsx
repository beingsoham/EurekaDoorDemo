import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';
import { MapPin, Phone, Mail } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon } from './SocialIcons';
import './Footer.css';

export default function Footer() {
  const { ref: footerRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const containerRef = useRef(null);

  useEffect(() => {
    if (inView && containerRef.current) {
      // Animate brand column
      anime({
        targets: '.brand-col',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        easing: 'easeOutExpo',
      });

      // Animate footer columns
      setTimeout(() => {
        const columns = containerRef.current?.querySelectorAll('.footer-col:not(.brand-col)');
        if (columns) {
          anime({
            targets: columns,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(80),
            duration: 700,
            easing: 'easeOutExpo',
          });
        }
      }, 100);

      // Animate footer links with stagger
      setTimeout(() => {
        const links = containerRef.current?.querySelectorAll('.footer-links li');
        if (links) {
          anime({
            targets: links,
            opacity: [0, 1],
            translateX: [-20, 0],
            delay: anime.stagger(40),
            duration: 600,
            easing: 'easeOutQuint',
          });
        }
      }, 300);

      // Animate footer bottom
      setTimeout(() => {
        anime({
          targets: '.footer-bottom',
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          easing: 'easeOutQuint',
        });
      }, 600);
    }
  }, [inView]);
  const products = ['Wooden Doors', 'Post Forming', 'Solid PVC', 'Theme Doors', 'FRP Doors', 'Frames', 'Plywood'];
  const links = ['Home', 'About Us', 'Our Clients', 'Dealer Network', 'Career', 'Blog', 'Contact Us'];

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="footer-container" ref={containerRef}>
        <div className="footer-grid">
          
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 22V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v18"/>
                <path d="M4 22h16"/>
                <path d="M14 12V22"/>
              </svg>
              <span>EUREKA</span>
            </div>
            <p className="footer-tagline">Crafted for Every Opening</p>
            <p className="footer-desc">
              Leaders in architectural door manufacturing since 2000. We blend traditional woodworking craftsmanship with industrial-grade polymer technology to define modern entryways.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/eureka_doors/" target="_blank" rel="noopener noreferrer" className="social-icon-sm" title="Follow on Instagram">
                <InstagramIcon size={16} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon-sm" title="Connect on LinkedIn">
                <LinkedinIcon size={16} />
              </a>
              <a href="https://www.facebook.com/eureka_doors/" target="_blank" rel="noopener noreferrer" className="social-icon-sm" title="Follow on Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href="mailto:sales@eurekaindia.com" className="social-icon-sm" title="Email sales@eurekaindia.com">
                <Mail size={16} />
              </a>
              <a href="tel:+918888784444" className="social-icon-sm" title="Call +91 – 8888 78 4444">
                <Phone size={16} />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">OUR PRODUCTS</h4>
            <div className="heading-underline"></div>
            <ul className="footer-links">
              {products.map(p => (
                <li key={p}><button onClick={(e) => e.preventDefault()}>{p}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <div className="heading-underline"></div>
            <ul className="footer-links">
              {links.map(l => (
                <li key={l}><button onClick={(e) => e.preventDefault()}>{l}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">CONTACT US</h4>
            <div className="heading-underline"></div>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={16} color="var(--gold)" className="f-icon" />
                <p>Eureka Towers, 5th Floor, Pune-Bangalore Highway, Warje, Pune 411058.</p>
              </div>
              <div className="contact-item">
                <Phone size={16} color="var(--gold)" className="f-icon" />
                <div className="contact-links">
                  <a href="tel:+918888784444">+91 – 8888 78 4444</a>
                  <a href="tel:+919373040830">+91 – 9373 040 830</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={16} color="var(--gold)" className="f-icon" />
                <div className="contact-links">
                  <a href="mailto:sales@eurekaindia.com">sales@eurekaindia.com</a>
                  <a href="mailto:info@eurekaindia.com">info@eurekaindia.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; 2025 Eureka India. All Rights Reserved.</p>
          <p className="credit">Designed with &hearts; in Pune, India</p>
        </div>
      </div>
    </footer>
  );
}
