import React from 'react';
import { motion } from 'framer-motion';
import weddingData from '../wedding-data.json';
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
          <h2 className="section-title">Meet the Couple</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            {weddingData.siteContent.meetTheCoupleDescription}
          </p>
        </motion.div>

        <div className="couple-profiles">
          {/* Groom Profile */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="profile-image-wrapper">
              <img
                src={couple?.groom?.image || '/images/aromal.jpg'}
                alt={couple?.groom?.fullName}
                className="profile-image"
              />
            </div>
            <div className="profile-content">
              <h3 className="profile-name">{couple?.groom?.fullName || 'Aromal Kumar'}</h3>
              <p className="profile-title">The Groom</p>
              <div className="profile-divider"></div>
              <p className="profile-bio">
                {couple?.groom?.bio || weddingData.couple.groom.bio}
              </p>
            </div>
          </motion.div>

          {/* Bride Profile */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="profile-image-wrapper">
              <img
                src={couple?.bride?.image || '/images/jesna.jpg'}
                alt={couple?.bride?.fullName}
                className="profile-image"
              />
            </div>
            <div className="profile-content">
              <h3 className="profile-name">{couple?.bride?.fullName || 'Jesna Mary'}</h3>
              <p className="profile-title">The Bride</p>
              <div className="profile-divider"></div>
              <p className="profile-bio">
                {couple?.bride?.bio || weddingData.couple.bride.bio}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
