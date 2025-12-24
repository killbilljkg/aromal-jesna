import React from 'react';
import { motion } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
  const images = [
    { id: 1, url: 'https://picsum.photos/600/800?random=2', alt: 'Couple photo 1' },
    { id: 2, url: 'https://picsum.photos/800/600?random=3', alt: 'Couple photo 2' },
    { id: 3, url: 'https://picsum.photos/600/800?random=4', alt: 'Couple photo 3' },
    { id: 4, url: 'https://picsum.photos/800/600?random=5', alt: 'Couple photo 4' },
    { id: 5, url: 'https://picsum.photos/600/800?random=6', alt: 'Couple photo 5' },
    { id: 6, url: 'https://picsum.photos/800/600?random=7', alt: 'Couple photo 6' },
  ];

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
