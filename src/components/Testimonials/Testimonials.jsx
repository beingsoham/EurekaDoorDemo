import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import anime from 'animejs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { testimonials } from '../../constants/data';
import 'swiper/css';
import 'swiper/css/pagination';
import './Testimonials.css';

export default function Testimonials() {
  const sectionRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && sectionRef.current) {
      // Animate header
      anime({
        targets: '.testimonials-label',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuint',
      });

      anime({
        targets: '.testimonials-h2',
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 700,
        easing: 'easeOutExpo',
        delay: 100,
      });

      anime({
        targets: '.testimonials-sub',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuint',
        delay: 200,
      });

      // Animate cards with stagger
      setTimeout(() => {
        const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
        if (cards) {
          anime({
            targets: cards,
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            delay: anime.stagger(80),
            duration: 700,
            easing: 'easeOutExpo',
          });
        }
      }, 300);
    }
  }, [inView]);
  const companies = [
    "Gera Developers", "Pharande Promoters", "Aakar", 
    "AnandTara Construction", "Eagle Properties", "DNV", 
    "Vasudha Projects", "Ravima Ventures"
  ];

  return (
    <section id="clients" className="testimonials-section" ref={sectionRef}>
      <div className="testimonials-container" ref={ref}>
        <div className="testimonials-header">
          <div className="testimonials-label">CLIENT STORIES</div>
          <h2 className="testimonials-h2">Trusted by India's Top Developers.</h2>
          <p className="testimonials-sub">From 2-bedroom apartments to large township projects — builders across India rely on Eureka Doors.</p>
        </div>

        <div className="testimonials-swiper-container">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={false}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="mySwiper"
          >
            {testimonials.map((testi) => (
              <SwiperSlide key={testi.id}>
                <div 
                  className="testimonial-card"
                >
                  <div className="quote-mark">“</div>
                  <p className="quote-text">{testi.quote}</p>
                  <div className="card-divider"></div>
                  <div className="card-bottom">
                    <div className="card-author">
                      <div className="author-avatar">{testi.initials}</div>
                      <div className="author-info">
                        <div className="author-name">{testi.name}</div>
                        <div className="author-company">{testi.company}</div>
                      </div>
                    </div>
                    <div className="card-badge">{testi.badge}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="clients-marquee-container">
        <div className="marquee-header">
          <div className="marquee-label">BUILDERS WHO TRUST EUREKA</div>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-content">
            {companies.map((company, idx) => (
              <div key={idx} className="marquee-item-wrapper">
                <span className="marquee-sep">◆</span>
                <div 
                  className="marquee-company"
                >
                  {company}
                </div>
              </div>
            ))}
            {companies.map((company, idx) => (
              <div key={`repeat-${idx}`} className="marquee-item-wrapper">
                <span className="marquee-sep">◆</span>
                <div 
                  className="marquee-company"
                >
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
