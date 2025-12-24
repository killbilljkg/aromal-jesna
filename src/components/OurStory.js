import React from 'react';
import { motion } from 'framer-motion';
import './OurStory.css';

const OurStory = ({ couple }) => {
  return (
    <section className="our-story-section" id="our-story">
      <div className="our-story-container">
        <motion.div
          className="our-story-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our Story</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="story-content">
          <motion.div
            className="story-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Welcome to Our Celebration</h3>
            <p>
              We're so excited to share this special day with you. Our journey began
              in the most unexpected way, and every moment since has been filled with
              love, laughter, and countless memories.
            </p>
            <p>
              From our first meeting to this day, we've grown together, supported each
              other's dreams, and built a foundation of love that we're thrilled to
              celebrate with our closest family and friends.
            </p>
            <p>
              Thank you for being part of our story. Your presence means the world to us,
              and we can't wait to create more beautiful memories together.
            </p>
          </motion.div>

          <motion.div
            className="story-image"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="https://picsum.photos/600/800?random=1"
              alt="Couple portrait"
              className="couple-image"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
