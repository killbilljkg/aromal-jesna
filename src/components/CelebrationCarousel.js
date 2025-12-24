import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './CelebrationCarousel.css';

const celebrationImages = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/wedding1/300/250',
    alt: 'Wedding celebration 1',
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/wedding2/300/250',
    alt: 'Wedding celebration 2',
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/wedding3/300/250',
    alt: 'Wedding celebration 3',
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/wedding4/300/250',
    alt: 'Wedding celebration 4',
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/wedding5/300/250',
    alt: 'Wedding celebration 5',
  },
  {
    id: 6,
    src: 'https://picsum.photos/seed/wedding6/300/250',
    alt: 'Wedding celebration 6',
  },
  {
    id: 7,
    src: 'https://picsum.photos/seed/wedding7/300/250',
    alt: 'Wedding celebration 7',
  },
];

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
