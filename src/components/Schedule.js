import React from 'react';
import { motion } from 'framer-motion';
import './Schedule.css';

const Schedule = ({ events }) => {
  const scheduleItems = [
    {
      time: '3:00 PM',
      title: 'Ceremony',
      description: 'Join us as we exchange our vows in an intimate ceremony surrounded by our loved ones.',
    },
    {
      time: '4:30 PM',
      title: 'Cocktail Hour',
      description: 'Enjoy drinks and hors d\'oeuvres while we capture photos with our families.',
    },
    {
      time: '6:00 PM',
      title: 'Reception',
      description: 'Let\'s celebrate with dinner, dancing, and making memories that will last a lifetime.',
    },
  ];

  return (
    <section className="schedule-section" id="schedule">
      <div className="schedule-container">
        <motion.div
          className="schedule-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Schedule of Events</h2>
          <div className="section-divider"></div>
        </motion.div>

        <div className="schedule-timeline">
          {scheduleItems.map((item, index) => (
            <motion.div
              key={index}
              className="schedule-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="schedule-time">{item.time}</div>
              <div className="schedule-content">
                <h3 className="schedule-title">{item.title}</h3>
                <p className="schedule-description">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
