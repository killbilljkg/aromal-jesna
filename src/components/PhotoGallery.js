import React from 'react';
import { motion } from 'framer-motion';
import './PhotoGallery.css';

const PhotoGallery = () => {
  // Placeholder images - replace with actual couple photos
  const collageImages = [
    { id: 1, src: '/images/aromal.png', alt: 'Our Journey' },
    { id: 2, src: '/images/jesna.png', alt: 'Love Story' },
    { id: 3, src: '/images/aromal.png', alt: 'Together' },
    { id: 4, src: '/images/jesna.png', alt: 'Forever' }
  ];

  const horizontalImages = [
    { id: 1, src: '/images/aromal.png', alt: 'Our Story 1' },
    { id: 2, src: '/images/jesna.png', alt: 'Our Story 2' },
    { id: 3, src: '/images/aromal.png', alt: 'Our Story 3' },
    { id: 4, src: '/images/jesna.png', alt: 'Our Story 4' },
    { id: 5, src: '/images/aromal.png', alt: 'Our Story 5' },
    { id: 6, src: '/images/jesna.png', alt: 'Our Story 6' },
    { id: 7, src: '/images/aromal.png', alt: 'Our Story 7' }
  ];

  return (
    <>
      {/* Photo Collage Section */}
      <section className="photo-collage-section">
        <div className="collage-container">
          <motion.div
            className="collage-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {collageImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`collage-item item-${index + 1}`}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <div className="photo-frame">
                  <img src={image.src} alt={image.alt} />
                  <div className="photo-overlay"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* We Celebrate Together Section */}
      <section className="celebrate-section">
        <div className="celebrate-container">
          <motion.h2
            className="celebrate-title fancy-text"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Love Story
          </motion.h2>

          <motion.p
            className="celebrate-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Every moment together has been a beautiful chapter in our journey. From the first hello to forever, these memories capture the essence of our love.
          </motion.p>

          <div className="horizontal-gallery">
            <motion.div
              className="gallery-scroll"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {horizontalImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="gallery-item"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                >
                  <div className="gallery-frame">
                    <img src={image.src} alt={image.alt} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PhotoGallery;
