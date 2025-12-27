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
          <h2 className="section-title">Meet the Couple</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            We are honored to begin this new chapter of our lives together,
            blessed by our families and surrounded by loved ones.
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
                A loving son, dedicated professional, and someone who values
                family traditions. Looking forward to building a beautiful
                life together with the blessings of our families.
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
                A cherished daughter, kind-hearted soul, and someone who
                treasures family values. Excited to start this new journey
                with love and the support of our families.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
