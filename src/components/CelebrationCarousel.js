import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CelebrationCarousel.css';

// Load celebration images dynamically
// Images should be placed in public/images/celebration/ folder
// Named as: 1.jpg, 2.jpg, 3.jpg, etc.
const celebrationImages = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  src: `${process.env.PUBLIC_URL}/images/celebration/${i + 1}.jpg`,
  alt: `Wedding celebration ${i + 1}`,
}));

const CelebrationCarousel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="celebration-section">
      {/* Header */}
      <div ref={headerRef} className="celebration-header">
        <motion.h2
          className="celebration-title"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          Join Our Celebration
        </motion.h2>
        <motion.p
          className="celebration-description"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Every moment we share is a celebration of love and joy.
          We can't wait to create beautiful memories together with you.
        </motion.p>
      </div>

      {/* Infinite Carousel */}
      <div className="carousel-container">
        <div className="carousel-track">
          {/* First set of images */}
          {celebrationImages.map((image, index) => (
            <div
              key={`first-${image.id}`}
              className={`carousel-item ${index % 2 === 0 ? 'carousel-item-small' : 'carousel-item-large'}`}
            >
              <div className="carousel-image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                />
              </div>
            </div>
          ))}
          {/* Duplicate set for infinite loop */}
          {celebrationImages.map((image, index) => (
            <div
              key={`second-${image.id}`}
              className={`carousel-item ${index % 2 === 0 ? 'carousel-item-small' : 'carousel-item-large'}`}
            >
              <div className="carousel-image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                />
              </div>
            </div>
          ))}
          {/* Third set for seamless loop */}
          {celebrationImages.map((image, index) => (
            <div
              key={`third-${image.id}`}
              className={`carousel-item ${index % 2 === 0 ? 'carousel-item-small' : 'carousel-item-large'}`}
            >
              <div className="carousel-image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="carousel-image"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CelebrationCarousel;
