import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import weddingData from '../wedding-data.json';
import './Schedule.css';

const Schedule = ({ events }) => {
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const scheduleItems = weddingData.schedule;
  const wedding = weddingData.wedding;

  const generateCalendarLinks = () => {
    const eventDate = new Date(wedding.date + 'T15:00:00');
    const endDate = new Date(wedding.date + 'T22:30:00');

    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    };

    const title = encodeURIComponent('Aromal & Jesna Wedding');
    const location = encodeURIComponent(wedding.venue.fullAddress);
    const details = encodeURIComponent('Wedding Ceremony at ' + wedding.venue.name);

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDateForGoogle(eventDate)}/${formatDateForGoogle(endDate)}&location=${location}&details=${details}`;
    const outlookUrl = `https://outlook.live.com/calendar/0/action/compose?subject=${title}&startdt=${eventDate.toISOString()}&enddt=${endDate.toISOString()}&location=${location}&body=${details}`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDateForGoogle(eventDate)}
DTEND:${formatDateForGoogle(endDate)}
SUMMARY:Aromal & Jesna Wedding
LOCATION:${wedding.venue.fullAddress}
DESCRIPTION:Wedding Ceremony at ${wedding.venue.name}
END:VEVENT
END:VCALENDAR`;

    return { googleUrl, outlookUrl, icsContent };
  };

  const handleDownloadICS = () => {
    const { icsContent } = generateCalendarLinks();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'aromal-jesna-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  const { googleUrl, outlookUrl } = generateCalendarLinks();

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
                <div className="schedule-icon">{item.icon}</div>
                <h3 className="schedule-title">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="schedule-calendar-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            className="schedule-calendar-btn"
            onClick={() => setShowCalendarMenu(!showCalendarMenu)}
          >
            <span className="calendar-icon">📅</span>
            Add to Calendar
            <span className={`dropdown-arrow ${showCalendarMenu ? 'open' : ''}`}>▼</span>
          </button>
          <AnimatePresence>
            {showCalendarMenu && (
              <motion.div
                className="schedule-calendar-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calendar-option"
                  onClick={() => setShowCalendarMenu(false)}
                >
                  <span className="option-icon">📆</span>
                  Google Calendar
                </a>
                <button
                  className="calendar-option"
                  onClick={handleDownloadICS}
                >
                  <span className="option-icon">🍎</span>
                  Apple Calendar
                </button>
                <a
                  href={outlookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="calendar-option"
                  onClick={() => setShowCalendarMenu(false)}
                >
                  <span className="option-icon">📧</span>
                  Outlook
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Schedule;
