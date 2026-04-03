import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Products from './components/Products/Products';
import WhyEureka from './components/WhyEureka/WhyEureka';
import Testimonials from './components/Testimonials/Testimonials';
import Gallery from './components/Gallery/Gallery';
import Quote from './components/Quote/Quote';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import FloatingCallButton from './components/FloatingCallButton/FloatingCallButton';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <ScrollToTop />
      <FloatingCallButton />
      <Navbar />
      <Hero />
      <Products />
      <WhyEureka />
      <Testimonials />
      <Gallery />
      <Quote />
      <Footer />
    </>
  );
}

export default App;
