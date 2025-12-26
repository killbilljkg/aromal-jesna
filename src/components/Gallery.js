import React from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
  // Load gallery images dynamically
  // Images should be placed in public/images/gallery/ folder
  // Named as: 1.jpg, 2.jpg, 3.jpg, etc.
  // Update the length number below to match your total number of images
  const images = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    url: `${process.env.PUBLIC_URL}/images/gallery/${i + 1}.jpg`,
    alt: `Gallery photo ${i + 1}`,
  }));

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our Moments</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className="gallery-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img src={image.url} alt={image.alt} className="gallery-image" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
