import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import weddingData from '../wedding-data.json';
import './Page.css';
import './RegistryPage.css';

const RegistryPage = () => {
  const registries = [
    {
      name: 'Amazon',
      description: 'Find our favorite home essentials and gift ideas.',
      url: 'https://www.amazon.com/wedding/registry',
      icon: '🎁'
    },
    {
      name: 'Target',
      description: 'Browse our carefully curated registry items.',
      url: 'https://www.target.com/gift-registry',
      icon: '🎯'
    },
    {
      name: 'Crate & Barrel',
      description: 'Discover our picks for elegant home decor and dining.',
      url: 'https://www.crateandbarrel.com/gift-registry',
      icon: '🏠'
    }
  ];

  return (
    <div className="page">
      <Navigation couple={weddingData.couple} />
      <div className="page-content">
        <section className="registry-section">
          <div className="registry-container">
            <motion.div
              className="registry-header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="section-title">Gift Registry</h1>
              <div className="section-divider"></div>
              <p className="section-description">
                Your presence at our wedding is the greatest gift of all. However, if you wish
                to honor us with a gift, we've registered at the following stores for your convenience.
              </p>
            </motion.div>

            <div className="registry-grid">
              {registries.map((registry, index) => (
                <motion.div
                  key={index}
                  className="registry-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="registry-icon">{registry.icon}</div>
                  <h3 className="registry-name">{registry.name}</h3>
                  <p className="registry-description">{registry.description}</p>
                  <a
                    href={registry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="registry-button"
                  >
                    View Registry
                  </a>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="registry-note"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3>Prefer to give a monetary gift?</h3>
              <p>
                If you prefer to give a monetary gift, we would be honored and grateful.
                Your contribution will help us start our new life together.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegistryPage;
