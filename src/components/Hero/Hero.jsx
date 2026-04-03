import React, { useEffect } from 'react';
import anime from 'animejs';
import ThreeDBackground from './ThreeDBackground';
import './Hero.css';

export default function Hero() {
  useEffect(() => {
    // Staggered reveal animation with advanced easing
    const tl = anime.timeline({ 
      easing: 'easeOutExpo',
      delay: 100
    });

    tl.add({
      targets: '.hero-label',
      opacity: [0, 1],
      translateY: [30, 0],
      translateX: [-20, 0],
      duration: 800,
      easing: 'easeOutQuint',
    })
    .add({
      targets: '.hero-h1',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: 100,
    }, '-=600')
    .add({
      targets: '.hero-divider',
      width: [0, 80],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutQuad',
      delay: 100,
    }, '-=700')
    .add({
      targets: '.hero-sub',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuint',
      delay: 50,
    }, '-=600')
    .add({
      targets: '.hero-btns',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutQuint',
      delay: 50,
    }, '-=550')
    .add({
      targets: '.scroll-label',
      opacity: [0, 0.6],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutQuint',
    }, '-=400')
    .add({
      targets: '.scroll-dot',
      translateY: [-6, 3],
      opacity: [1, 0.5],
      duration: 2000,
      easing: 'easeInOutQuad',
      loop: true,
    }, '-=300');

    // Floating animation for buttons
    anime({
      targets: '.btn',
      translateY: [-2, 2],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: anime.stagger(200),
    });

    // Stats bar animation
    anime({
      targets: '.stat-item',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100, { start: 1200 }),
      duration: 700,
      easing: 'easeOutExpo',
    });

    // Stats value counter animation with scale
    anime({
      targets: '.stat-value',
      scale: [0.6, 1],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 1200 }),
      duration: 700,
      easing: 'easeOutExpo',
    });

    // Count-up animation for numbers
    setTimeout(() => {
      const statValues = document.querySelectorAll('.stat-value');
      const numbers = [
        { element: statValues[0], final: 50, suffix: '+' },
        { element: statValues[1], final: 5000, suffix: '+' },
        { element: statValues[2], final: 864000, suffix: '+' },
        { element: statValues[3], final: 2000, prefix: 'Est. ', suffix: '' }
      ];

      numbers.forEach((item, index) => {
        anime({
          targets: { value: 0 },
          value: item.final,
          delay: index * 100,
          duration: 1500,
          easing: 'easeOutExpo',
          round: 1,
          update(anim) {
            if (item.element) {
              const num = Math.floor(anim.progress * item.final);
              const formatted = num.toLocaleString('en-IN');
              item.element.textContent = (item.prefix || '') + formatted + item.suffix;
            }
          }
        });
      });
    }, 1200);

    // Divider animation
    anime({
      targets: '.stat-divider',
      opacity: [0, 1],
      scaleY: [0, 1],
      delay: anime.stagger(100, { start: 1200 }),
      duration: 700,
      easing: 'easeOutExpo',
      transformOrigin: ['center center', 'center center'],
    });
  }, []);

  return (
    <section id="home" className="hero-section">
      <ThreeDBackground />
      
      <div className="hero-content-wrapper">
        <div className="hero-left">
          <div className="hero-label">
            <span className="dot"></span> ESTABLISHED 2000
          </div>
          <h1 className="hero-h1">
            Opening Doors<br />
            to <span className="text-gold">Quality</span><br />
            Since 2000
          </h1>
          <div className="hero-divider"></div>
          <p className="hero-sub">
            India's trusted manufacturer of PVC, Wooden, Theme, and FRP Doors — crafted with architectural precision and timeless elegance for modern homes, builders, and developers across India.
          </p>
          <div className="hero-btns">
            <button 
              className="btn btn-gold"
            >
              Explore Products →
            </button>
            <button 
              className="btn btn-outline"
            >
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span className="scroll-label">SCROLL TO EXPLORE</span>
        <div className="scroll-wheel">
          <div className="scroll-dot"></div>
        </div>
      </div>

      <div className="hero-stats-bar">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-value">50+</span>
            <span className="stat-label">Awards Won</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">5,000+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">864,000+</span>
            <span className="stat-label">Doors Installed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">Est. 2000</span>
            <span className="stat-label">Legacy of Trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
