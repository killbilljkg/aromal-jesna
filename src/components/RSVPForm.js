import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RSVPForm.css';

const RSVPForm = ({ rsvpInfo, guestName, eventType = 'both' }) => {
  const [formData, setFormData] = useState({
    name: guestName || '',
    email: '',
    phone: '',
    guests: '1',
    engagement: eventType === 'engagement' || eventType === 'both',
    wedding: eventType === 'wedding' || eventType === 'both',
    dietary: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.engagement && !formData.wedding) {
      newErrors.events = 'Please select at least one event';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real application, you would send this to a backend
      console.log('RSVP Submitted:', formData);

      // Store in localStorage as a simple example
      const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
      rsvps.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('rsvps', JSON.stringify(rsvps));

      setSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: '1',
          engagement: false,
          wedding: false,
          dietary: '',
          message: ''
        });
      }, 5000);
    }
  };

  return (
    <section className="rsvp-section">
      <motion.div
        className="rsvp-container"
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
          RSVP
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Please let us know if you'll be joining us
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              className="rsvp-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Enter your name"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="+91 1234567890"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

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
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>

              {eventType === 'both' && (
                <div className="form-group">
                  <label className="checkbox-label">Events Attending *</label>
                  <div className="checkbox-group">
                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        name="engagement"
                        checked={formData.engagement}
                        onChange={handleChange}
                      />
                      <span className="checkbox-text">
                        <span className="checkbox-icon">💍</span>
                        Engagement Ceremony
                      </span>
                    </label>

                    <label className="checkbox-item">
                      <input
                        type="checkbox"
                        name="wedding"
                        checked={formData.wedding}
                        onChange={handleChange}
                      />
                      <span className="checkbox-text">
                        <span className="checkbox-icon">💒</span>
                        Wedding Ceremony
                      </span>
                    </label>
                  </div>
                  {errors.events && <span className="error-message">{errors.events}</span>}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="dietary">Dietary Restrictions</label>
                <input
                  type="text"
                  id="dietary"
                  name="dietary"
                  value={formData.dietary}
                  onChange={handleChange}
                  placeholder="Any dietary restrictions or allergies?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message for the Couple</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Share your wishes and blessings..."
                />
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Submit RSVP</span>
                <span className="button-icon">💌</span>
              </motion.button>

              <div className="contact-info">
                <p>Questions? Contact us at:</p>
                <p>
                  <a href={`mailto:${rsvpInfo.email}`}>{rsvpInfo.email}</a>
                  {' | '}
                  <a href={`tel:${rsvpInfo.phone}`}>{rsvpInfo.phone}</a>
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="success-icon"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
              >
                ✓
              </motion.div>
              <h3>Thank You!</h3>
              <p>Your RSVP has been received successfully.</p>
              <p>We can't wait to celebrate with you!</p>
              <div className="success-hearts">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity
                    }}
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default RSVPForm;
