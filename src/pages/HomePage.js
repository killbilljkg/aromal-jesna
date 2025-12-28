import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import CelebrationCarousel from '../components/CelebrationCarousel';
import weddingData from '../wedding-data.json';
import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const quickInfo = [
    {
      icon: '📅',
      title: 'Date',
      detail: weddingData.wedding.dateFormatted
    },
    {
      icon: '⏰',
      title: 'Time',
      detail: weddingData.wedding.time
    },
    {
      icon: '📍',
      title: 'Venue',
      detail: weddingData.wedding.venue.fullAddress
    }
  ];

  const features = [
    {
      title: 'Meet the Couple',
      description: 'Get to know the bride and groom',
      link: '/our-story',
      image: `${process.env.PUBLIC_URL}/images/features/couple.jpg`
    },
    {
      title: 'Photo Gallery',
      description: 'Browse our favorite moments together',
      link: '/gallery',
      image: `${process.env.PUBLIC_URL}/images/features/gallery.jpg`
    },
    {
      title: 'Event Schedule',
      description: 'Timeline of our special day',
      link: '/schedule',
      image: `${process.env.PUBLIC_URL}/images/features/schedule.jpg`
    },
    {
      title: 'RSVP',
      description: 'Let us know you\'re coming',
      link: '/rsvp',
      image: `${process.env.PUBLIC_URL}/images/features/rsvp.jpg`
    }
  ];

  return (
    <div className="App">
      <Navigation couple={weddingData.couple} />
      <HeroSection couple={weddingData.couple} />

      {/* Quick Info Section */}
      <section className="quick-info-section">
        <div className="quick-info-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Wedding Details
          </motion.h2>
          <div className="quick-info-grid">
            {quickInfo.map((info, index) => (
              <motion.div
                key={index}
                className="quick-info-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="info-icon">{info.icon}</div>
                <h3 className="info-title">{info.title}</h3>
                <p className="info-detail">{info.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CelebrationCarousel />

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <motion.div
            className="features-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Explore Our Wedding</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Find everything you need to know about our special day
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="feature-image-wrapper">
                  <img src={feature.image} alt={feature.title} className="feature-image" />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <Link to={`${feature.link}${location.search}`} className="feature-link">
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="cta-title">{weddingData.siteContent.ctaTitle}</h2>
          <p className="cta-subtitle">{weddingData.wedding.dateFormatted}</p>
          <p className="cta-description">
            {weddingData.siteContent.ctaDescription}
          </p>
          <Link to={`/rsvp${location.search}`} className="cta-button">
            RSVP Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
