import React from 'react';
import { useInView } from 'react-intersection-observer';
import { features } from '../../constants/data';
import './WhyEureka.css';

export default function WhyEureka() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="whyeureka-section">
      <div className="whyeureka-container">
        <div className="whyeureka-split">
          
          <div className="whyeureka-left">
            <div 
              className="whyeureka-image-wrapper"
            >
              <img 
                src="https://eurekaindia.com/wp-content/uploads/2019/12/welcome-img.jpg" 
                alt="Welcome to Eureka" 
                className="whyeureka-img"
              />
              <div 
                className="whyeureka-badge"
              >
                <div className="badge-icon">
                  🏆
                </div>
                <div className="badge-content">
                  <h4>50+ Industry Awards</h4>
                  <p>Recognized for quality & innovation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="whyeureka-right">
            <div className="whyeureka-header">
              <div className="whyeureka-label">WHY EUREKA</div>
              <h2 className="whyeureka-h2">
                25 Years of Craft.<br/>Zero Compromise.
              </h2>
              <p className="whyeureka-sub">
                We don't just build doors; we engineer entrances. For over two decades, our precision-focused approach has defined the standards for architectural luxury in modern Indian homes.
              </p>
            </div>

            <div 
              className="whyeureka-features"
            >
              {features.map((item, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-bar"></div>
                  <div className="feature-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="whyeureka-pull-quote">
              <p className="quote-text">
                "Eureka Doors doesn't just provide a product; they provide a commitment to architectural integrity. Their attention to precision is why they are our primary partners."
              </p>
              <p className="quote-author">
                &mdash; Mr. Ramesh Pharande, Pharande Promoters
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className="whyeureka-stats" ref={statsRef}>
        <div className="stat-item">
          <div className="stat-number">
            {statsInView ? "50" : "0"}+
          </div>
          <div className="stat-label">AWARDS WON</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">
            {statsInView ? "25" : "0"} Yrs
          </div>
          <div className="stat-label">OF EXCELLENCE</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">
            {statsInView ? "5,000" : "0"}+
          </div>
          <div className="stat-label">HAPPY CLIENTS</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number">
            {statsInView ? "864,000" : "0"}+
          </div>
          <div className="stat-label">DOORS DELIVERED</div>
        </div>
      </div>
    </section>
  );
}
