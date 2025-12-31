import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TheCelebration.css';

const TheCelebration = ({ events }) => {
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

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

  const generateCalendarLinks = () => {
    const eventDate = new Date(firstEvent.date + 'T15:00:00');
    const endDate = new Date(firstEvent.date + 'T22:30:00');

    const formatDateForGoogle = (date) => {
      return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    };

    const title = encodeURIComponent('Aromal & Jesna Wedding');
    const location = encodeURIComponent(firstEvent.venue.address || firstEvent.venue.name);
    const details = encodeURIComponent('Wedding Ceremony at ' + firstEvent.venue.name);

    // Google Calendar
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDateForGoogle(eventDate)}/${formatDateForGoogle(endDate)}&location=${location}&details=${details}`;

    // Outlook Calendar
    const outlookUrl = `https://outlook.live.com/calendar/0/action/compose?subject=${title}&startdt=${eventDate.toISOString()}&enddt=${endDate.toISOString()}&location=${location}&body=${details}`;

    // ICS file for Apple Calendar
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDateForGoogle(eventDate)}
DTEND:${formatDateForGoogle(endDate)}
SUMMARY:Aromal & Jesna Wedding
LOCATION:${firstEvent.venue.address || firstEvent.venue.name}
DESCRIPTION:Wedding Ceremony at ${firstEvent.venue.name}
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

          <motion.div
            className="add-to-calendar-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <button
              className="add-to-calendar-btn"
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
            >
              <span className="calendar-icon">📅</span>
              Add to Calendar
              <span className={`dropdown-arrow ${showCalendarMenu ? 'open' : ''}`}>▼</span>
            </button>
            <AnimatePresence>
              {showCalendarMenu && (
                <motion.div
                  className="calendar-dropdown"
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
