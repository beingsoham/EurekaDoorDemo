import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, ChevronDown } from 'lucide-react';
import { products } from '../../constants/data';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Collections', id: 'gallery' },
    { label: 'Products', id: 'products', isDropdown: true },
    { label: 'Architects', id: 'about' },
    { label: 'Sustainability', id: 'why' },
    { label: 'Contact', id: 'footer' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-content">
        <div className="nav-logo">
          <span className="logo-text">Eureka Doors</span>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <div 
              key={link.id}
              className={`nav-item ${link.isDropdown ? 'has-dropdown' : ''}`}
              onMouseEnter={() => link.isDropdown && setProductsDropdownOpen(true)}
              onMouseLeave={() => link.isDropdown && setProductsDropdownOpen(false)}
            >
              {link.isDropdown ? (
                <div className="dropdown-trigger">
                  <span>{link.label}</span>
                  <ChevronDown size={16} />
                  {productsDropdownOpen && (
                    <div className="products-dropdown">
                      {products.map((product) => (
                        <div key={product.id} className="dropdown-item">
                          <div className="dropdown-product-name">{product.name}</div>
                          <div className="dropdown-product-price">{product.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link to={link.id} smooth={true} duration={500} offset={-80}>
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="nav-right">
          <Link to="quote" smooth={true} duration={500} offset={-80} className="quote-btn">
            GET A QUOTE
          </Link>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
             <Menu color="var(--gold)" size={28} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div 
          className="mobile-menu mobile-menu-open"
        >
          <button className="close-menu-btn" onClick={() => setMobileMenuOpen(false)}>
            <X color="var(--gold)" size={32} />
          </button>
          <div className="mobile-links">
            {navLinks.map((link) => (
              <Link 
                key={link.id} 
                to={link.id} 
                smooth={true} 
                duration={500} 
                offset={-80}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="quote" 
              smooth={true} 
              duration={500} 
              offset={-80} 
              className="mobile-quote-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              GET A QUOTE
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
