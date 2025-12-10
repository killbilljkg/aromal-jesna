import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = ({ guestName, couple, eventType = 'both' }) => {
  const getInvitationText = () => {
    if (eventType === 'engagement') {
      return 'Invite you to celebrate their engagement';
    } else if (eventType === 'wedding') {
      return 'Invite you to celebrate their wedding';
    }
    return 'Invite you to celebrate their journey of love';
  };

  const getEventIcon = () => {
    if (eventType === 'engagement') return '💍';
    if (eventType === 'wedding') return '💒';
    return '💕';
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="invitation-header"
        >
          {guestName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="guest-name"
            >
              Dear {guestName},
            </motion.p>
          )}
          {eventType !== 'both' && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="event-icon-hero"
            >
              {getEventIcon()}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="fancy-text couple-names"
          >
            {couple.groom.fullName}
            <span className="ampersand"> & </span>
            {couple.bride.fullName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="tagline"
          >
            Together with their families
          </motion.p>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="invitation-text"
          >
            {getInvitationText()}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="scroll-indicator"
        >
          <p>Scroll to explore</p>
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </div>

      <div className="hero-background">
        <div className="floating-hearts">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="heart" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}>❤</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
