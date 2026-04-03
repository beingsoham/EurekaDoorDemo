import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom, Thumbnails, Counter } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { galleryImages } from '../../constants/data';
import './Gallery.css';

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const gridRef = useRef(null);

  useEffect(() => {
    if (inView && gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item');
      
      // Modern reveal with mask effect
      anime.set(items, { opacity: 0 });
      
      anime({
        targets: items,
        opacity: [0, 1],
        scale: [0.8, 1],
        rotate: [-2, 0],
        delay: anime.stagger(60, { start: 200 }),
        duration: 700,
        easing: 'easeOutExpo',
      });

      // Add hover effect listeners
      items.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          anime({
            targets: item.querySelector('img'),
            scale: [1, 1.1],
            duration: 400,
            easing: 'easeOutQuad',
          });
          anime({
            targets: item.querySelector('.gallery-overlay'),
            opacity: [0.5, 0.8],
            duration: 400,
            easing: 'easeOutQuad',
          });
        });
        
        item.addEventListener('mouseleave', () => {
          anime({
            targets: item.querySelector('img'),
            scale: [1.1, 1],
            duration: 400,
            easing: 'easeOutQuad',
          });
          anime({
            targets: item.querySelector('.gallery-overlay'),
            opacity: [0.8, 0.5],
            duration: 400,
            easing: 'easeOutQuad',
          });
        });
      });
    }
  }, [inView]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <div className="gallery-label">OUR WORK</div>
          <h2 className="gallery-h2">
            Real Projects.<br/>
            Real Homes.<br/>
            Real Stories.
          </h2>
          <p className="gallery-sub">
            Every photo here is from an actual Eureka Doors 
            installation — across homes and builder projects in India.
          </p>
        </div>

        <div className="gallery-masonry" ref={(el) => { ref(el); gridRef.current = el; }}>
          {galleryImages.map((image, i) => (
            <div 
              key={i} 
              className="gallery-item"
              onClick={() => { setIndex(i); setOpen(true); }}
            >
              <div className="gallery-img-wrapper">
                <img 
                  src={image.src} 
                  alt={image.alt}
                />
                <div 
                  className="gallery-overlay"
                >
                  <div className="overlay-content">
                    🔍
                    <span>View Photo</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-bottom">
          <p className="gallery-bottom-text">
            "Supplying doors across Maharashtra and beyond &mdash;<br/>
            from single homes to 1,000+ unit township projects."
          </p>
          <button 
            className="gallery-btn"
          >
            View All Projects →
          </button>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={galleryImages}
        plugins={[Zoom, Thumbnails, Counter]}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.95)" } }}
      />
    </section>
  );
}
