import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';
import { Phone } from 'lucide-react';
import { products } from '../../constants/data';
import './Products.css';

export default function Products() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const gridRef = useRef(null);

  useEffect(() => {
    if (inView && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      
      // Anime.js timeline for staggered reveal
      const tl = anime.timeline();
      
      // Animate header elements first
      tl.add({
        targets: '.products-label',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuint',
      })
      .add({
        targets: '.products-h2',
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 700,
        easing: 'easeOutExpo',
      }, '-=400')
      .add({
        targets: '.products-sub',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuint',
      }, '-=500');

      // Animate cards with stagger
      cards.forEach((card, index) => {
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 700,
          delay: index * 60,
          easing: 'easeOutExpo',
        });
      });

      // Add hover effects to cards
      cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          anime({
            targets: card,
            translateY: -12,
            duration: 400,
            easing: 'easeOutElastic(1, .6)',
          });
          anime({
            targets: card.querySelector('.product-image'),
            scale: 1.05,
            duration: 500,
            easing: 'easeOutQuad',
          });
        });
        
        card.addEventListener('mouseleave', () => {
          anime({
            targets: card,
            translateY: 0,
            duration: 400,
            easing: 'easeOutQuad',
          });
          anime({
            targets: card.querySelector('.product-image'),
            scale: 1,
            duration: 500,
            easing: 'easeOutQuad',
          });
        });
      });
    }
  }, [inView]);

  const handleContactClick = () => {
    const link = document.createElement('a');
    link.href = 'tel:+918888784444';
    link.click();
  };

  return (
    <section id="products" className="products-section">
      <div className="products-header">
        <div className="products-label">WHAT WE MAKE</div>
        <h2 className="products-h2">Our Products</h2>
        <p className="products-sub">
          Explore our complete range of doors and frames, crafted with precision and care.
        </p>
      </div>

      <div className="products-grid" ref={(el) => { ref(el); gridRef.current = el; }}>
        {products.map((product) => (
          <div 
            key={product.id}
            className="product-card"
          >
            <div className="product-image-wrapper">
              <img 
                src={product.img}
                alt={product.name}
                className="product-image"
              />
              <div className="product-image-overlay" />
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.desc}</p>
              
              <button 
                className="contact-btn"
                onClick={handleContactClick}
                title="Call us to inquire"
              >
                <Phone size={16} />
                <span>Contact</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="products-bottom">
        <p>Need a custom solution?</p>
        <button className="products-cta">
          REQUEST A CUSTOM DOOR
        </button>
      </div>
    </section>
  );
}
