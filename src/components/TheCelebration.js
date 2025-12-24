import React from 'react';
import { motion } from 'framer-motion';
import './TheCelebration.css';

const TheCelebration = ({ events }) => {
  // Get the first event to display
  const firstEvent = events.engagement || events.wedding;

  if (!firstEvent) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="celebration-section">
      <div className="celebration-container">
        <div className="celebration-content">
          <motion.h2
            className="celebration-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            The Celebration
          </motion.h2>

          <motion.p
            className="celebration-description"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join us for an evening of love, laughter, and celebration under the stars.
          </motion.p>

          <div className="celebration-details">
            <motion.div
              className="detail-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="detail-icon">📅</div>
              <div className="detail-content">
                <h3 className="detail-label">When</h3>
                <p className="detail-date">{formatDate(firstEvent.date)}</p>
                <p className="detail-time">Ceremony starts at {firstEvent.time}</p>
              </div>
            </motion.div>

            <motion.div
              className="detail-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="detail-icon">📍</div>
              <div className="detail-content">
                <h3 className="detail-label">Where</h3>
                <p className="detail-venue">{firstEvent.venue.name}</p>
                <a
                  href={firstEvent.venue.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-map-link"
                >
                  View Map
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Arch */}
        <motion.div
          className="celebration-arch"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 600 V 200 Q 50 50, 200 50 Q 350 50, 350 200 V 600"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              opacity="0.15"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default TheCelebration;
