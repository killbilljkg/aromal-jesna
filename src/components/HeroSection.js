import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = ({ couple }) => {
  const heroStyle = {
    '--hero-bg-image': `url(${process.env.PUBLIC_URL}/images/hero-background.jpg)`
  };

  return (
    <section className="hero-section" id="home" style={heroStyle}>
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            You are invited to celebrate the wedding of
          </motion.div>

          <motion.h1
            className="hero-names"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {couple.groom.fullName}
            <span className="ampersand"> & </span>
            {couple.bride.fullName}
          </motion.h1>

          <motion.div
            className="hero-date"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {couple.weddingDate}
          </motion.div>

          <motion.div
            className="hero-venue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {couple.venue}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
