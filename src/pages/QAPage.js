import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import weddingData from '../wedding-data.json';
import './Page.css';
import './QAPage.css';

const QAPage = () => {
  const faqs = [
    {
      question: 'What is the dress code?',
      answer: 'We suggest semi-formal attire. Ladies, feel free to wear cocktail dresses or elegant separates. Gentlemen, suits or dress slacks with a button-down shirt are perfect.'
    },
    {
      question: 'Can I bring a plus one?',
      answer: 'Due to limited venue capacity, we can only accommodate guests formally invited on your wedding invitation. If you received a plus one, it will be indicated on your invitation.'
    },
    {
      question: 'Will there be parking available?',
      answer: 'Yes, the venue has ample parking available for all guests. Valet service will also be provided.'
    },
    {
      question: 'Are children welcome?',
      answer: 'While we love your little ones, we have decided to keep our wedding an adults-only celebration. We hope this gives you a chance to relax and enjoy the evening.'
    },
    {
      question: 'What time should I arrive?',
      answer: 'Please plan to arrive 15-20 minutes before the ceremony begins at 3:00 PM to allow time for parking and seating.'
    },
    {
      question: 'Will the ceremony and reception be indoors or outdoors?',
      answer: 'Both the ceremony and reception will be held indoors at the venue, so no need to worry about the weather.'
    },
    {
      question: 'Is there a gift registry?',
      answer: 'Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at a few select stores. Please see the Registry section for details.'
    },
    {
      question: 'When is the RSVP deadline?',
      answer: 'Please kindly respond by December 1st, 2025 so we can finalize our guest count with the venue and caterer.'
    }
  ];

  return (
    <div className="page">
      <Navigation couple={weddingData.couple} />
      <div className="page-content">
        <section className="qa-section">
          <div className="qa-container">
            <motion.div
              className="qa-header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="section-title">Frequently Asked Questions</h1>
              <div className="section-divider"></div>
              <p className="section-description">
                Find answers to common questions about our wedding day.
              </p>
            </motion.div>

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="faq-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="faq-question">{faq.question}</h3>
                  <p className="faq-answer">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="qa-contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3>Still have questions?</h3>
              <p>
                Feel free to reach out to us at{' '}
                <a href={`mailto:${weddingData.rsvp.email}`}>{weddingData.rsvp.email}</a>
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default QAPage;
