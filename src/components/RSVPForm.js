import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import weddingData from '../wedding-data.json';
import './RSVPForm.css';

const RSVPForm = ({ rsvpInfo }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const inviteeName = searchParams.get('name');
  const groupName = searchParams.get('group');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    attendance: '',
    message: '',
    group: groupName || ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  useEffect(() => {
    if (inviteeName && !groupName) {
      const nameParts = inviteeName.trim().split(' ');
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || ''
      }));
    }
  }, [inviteeName, groupName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });

    // Prepare data for SheetDB API
    const rsvpData = {
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        attendance: formData.attendance,
        message: formData.message,
        group: formData.group || '',
        invitationType: formData.group ? 'group' : 'individual',
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/d3etfidhvnoh4', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rsvpData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit RSVP');
      }

      const result = await response.json();
      console.log('RSVP submitted successfully:', result);

      setSubmitStatus({ loading: false, success: true, error: null });

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          attendance: '',
          message: '',
          group: groupName || ''
        });
        setSubmitStatus({ loading: false, success: false, error: null });
      }, 3000);

    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitStatus({
        loading: false,
        success: false,
        error: 'Failed to submit RSVP. Please try again.'
      });
    }
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
          {groupName && (
            <p className="rsvp-group-label">
              Invitation for {groupName.charAt(0).toUpperCase() + groupName.slice(1)} Group
            </p>
          )}
          <p className="rsvp-subtitle">
            Kindly respond by {weddingData.rsvp.deadline}
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

          {submitStatus.success && (
            <div className="rsvp-success-message">
              ✓ Thank you! Your RSVP has been submitted successfully.
            </div>
          )}

          {submitStatus.error && (
            <div className="rsvp-error-message">
              ✗ {submitStatus.error}
            </div>
          )}

          <button
            type="submit"
            className="rsvp-button"
            disabled={submitStatus.loading}
          >
            {submitStatus.loading ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default RSVPForm;
