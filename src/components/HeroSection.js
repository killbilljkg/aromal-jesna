import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import weddingData from '../wedding-data.json';
import './HeroSection.css';

const HeroSection = ({ couple }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inviteeName = searchParams.get('name');
  const groupName = searchParams.get('group');

  const heroStyle = {
    '--hero-bg-image': `url(${process.env.PUBLIC_URL}/images/hero-background.jpg)`
  };

  const getSubtitle = () => {
    if (groupName) {
      // Capitalize first letter of group name
      const formattedGroup = groupName.charAt(0).toUpperCase() + groupName.slice(1);
      return weddingData.siteContent.groupGreeting.replace('{group}', formattedGroup);
    }
    if (inviteeName) {
      return weddingData.siteContent.personalizedGreeting.replace('{name}', inviteeName);
    }
    return weddingData.siteContent.heroSubtitle;
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
            {getSubtitle()}
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
            {weddingData.wedding.dateFormatted}
          </motion.div>

        
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
