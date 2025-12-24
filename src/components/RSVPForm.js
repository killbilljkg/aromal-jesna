import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './RSVPForm.css';

const RSVPForm = ({ rsvpInfo }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    attendance: '',
    guests: '1',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `RSVP - ${formData.firstName} ${formData.lastName}`;
    const body = `
Name: ${formData.firstName} ${formData.lastName}
Attendance: ${formData.attendance}
Number of Guests: ${formData.guests}
Message: ${formData.message}
    `.trim();

    window.open(`mailto:${rsvpInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <motion.div
        className="rsvp-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="rsvp-header"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="rsvp-title">RSVP</h2>
          <div className="section-divider"></div>
          <p className="rsvp-subtitle">
            Kindly respond by December 1st, 2025
          </p>
        </motion.div>

        <motion.form
          className="rsvp-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="attendance">Will you be attending? *</label>
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              required
            >
              <option value="">Please select</option>
              <option value="Joyfully accepts">Joyfully accepts</option>
              <option value="Regretfully declines">Regretfully declines</option>
            </select>
          </div>

          {formData.attendance === 'Joyfully accepts' && (
            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="message">Message to the Couple</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Share your well wishes..."
            />
          </div>

          <button type="submit" className="rsvp-button">
            Submit RSVP
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default RSVPForm;
