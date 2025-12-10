import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CountdownTimer.css';

const CountdownTimer = ({ events, eventType = 'both' }) => {
  const [engagementTime, setEngagementTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [weddingTime, setWeddingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate) - new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (events.engagement) {
        setEngagementTime(calculateTimeLeft(events.engagement.date));
      }
      if (events.wedding) {
        setWeddingTime(calculateTimeLeft(events.wedding.date));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  const TimeUnit = ({ value, label, delay }) => (
    <motion.div
      className="time-unit"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <motion.div
        className="time-value"
        key={value}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3 }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="time-label">{label}</div>
    </motion.div>
  );

  return (
    <section className="countdown-section">
      <motion.div
        className="countdown-container"
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
          {eventType === 'both' ? 'Save the Dates' : 'Save the Date'}
        </motion.h2>

        {/* Engagement Countdown */}
        {events.engagement && (
          <div className="countdown-event">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {events.engagement.title}
            </motion.h3>
            <motion.p
              className="event-date"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {new Date(events.engagement.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </motion.p>

            <div className="countdown-display">
              <TimeUnit value={engagementTime.days} label="Days" delay={0.4} />
              <TimeUnit value={engagementTime.hours} label="Hours" delay={0.5} />
              <TimeUnit value={engagementTime.minutes} label="Minutes" delay={0.6} />
              <TimeUnit value={engagementTime.seconds} label="Seconds" delay={0.7} />
            </div>
          </div>
        )}

        {events.engagement && events.wedding && (
          <div className="countdown-divider">
            <motion.div
              className="divider-heart"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.div>
          </div>
        )}

        {/* Wedding Countdown */}
        {events.wedding && (
          <div className="countdown-event">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {events.wedding.title}
            </motion.h3>
            <motion.p
              className="event-date"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {new Date(events.wedding.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </motion.p>

            <div className="countdown-display">
              <TimeUnit value={weddingTime.days} label="Days" delay={0.4} />
              <TimeUnit value={weddingTime.hours} label="Hours" delay={0.5} />
              <TimeUnit value={weddingTime.minutes} label="Minutes" delay={0.6} />
              <TimeUnit value={weddingTime.seconds} label="Seconds" delay={0.7} />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default CountdownTimer;
