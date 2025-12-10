import React from 'react';
import { motion } from 'framer-motion';
import './EventCards.css';

const EventCards = ({ events, eventType = 'both' }) => {
  const EventCard = ({ event, icon, index }) => (
    <motion.div
      className="event-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)' }}
    >
      <div className="card-header">
        <motion.div
          className="event-icon"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {icon}
        </motion.div>
        <h3 className="event-title">{event.title}</h3>
      </div>

      <div className="card-body">
        <div className="event-detail">
          <span className="detail-icon">📅</span>
          <div className="detail-content">
            <p className="detail-label">Date</p>
            <p className="detail-value">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="event-detail">
          <span className="detail-icon">🕐</span>
          <div className="detail-content">
            <p className="detail-label">Time</p>
            <p className="detail-value">{event.time}</p>
          </div>
        </div>

        <div className="event-detail">
          <span className="detail-icon">📍</span>
          <div className="detail-content">
            <p className="detail-label">Venue</p>
            <p className="detail-value venue-name">{event.venue.name}</p>
            <p className="detail-address">{event.venue.address}</p>
          </div>
        </div>

        <p className="event-description">{event.description}</p>

        <motion.a
          href={event.venue.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="map-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View on Map</span>
          <span className="button-icon">🗺️</span>
        </motion.a>
      </div>

      <div className="card-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </motion.div>
  );

  return (
    <section className="events-section">
      <motion.div
        className="events-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="section-title fancy-text"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Celebration Details
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {eventType === 'both'
            ? 'We would be honored to have you join us for these special moments'
            : 'We would be honored to have you join us for this special moment'}
        </motion.p>

        <div className="events-grid">
          {events.engagement && <EventCard event={events.engagement} icon="💍" index={0} />}
          {events.wedding && <EventCard event={events.wedding} icon="💒" index={events.engagement ? 1 : 0} />}
        </div>

        <motion.div
          className="additional-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="info-card">
            <h4>Dress Code</h4>
            <p>Formal Attire</p>
          </div>
          <div className="info-card">
            <h4>Reception</h4>
            <p>To follow ceremony</p>
          </div>
          <div className="info-card">
            <h4>Parking</h4>
            <p>Available on site</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EventCards;
