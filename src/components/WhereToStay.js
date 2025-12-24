import React from 'react';
import { motion } from 'framer-motion';
import './WhereToStay.css';

const WhereToStay = () => {
  const accommodations = [
    {
      name: 'The Grand Hotel',
      description: 'Luxury accommodations just 5 minutes from the venue. Mention our wedding for a special rate.',
      address: '123 Main Street, Kochi, Kerala',
      phone: '+91 1234567890',
      website: 'https://example.com',
      distance: '0.5 miles from venue',
      image: 'https://picsum.photos/800/600?random=8',
      features: ['Free WiFi', 'Pool', 'Spa', 'Restaurant']
    },
    {
      name: 'Riverside Inn',
      description: 'Charming boutique hotel with riverside views and comfortable rooms.',
      address: '456 River Road, Kochi, Kerala',
      phone: '+91 0987654321',
      website: 'https://example.com',
      distance: '1.2 miles from venue',
      image: 'https://picsum.photos/800/600?random=9',
      features: ['Free Parking', 'Breakfast', 'River View', 'Pet Friendly']
    },
    {
      name: 'Garden Suites',
      description: 'Modern suites perfect for families, with kitchenettes and spacious rooms.',
      address: '789 Garden Lane, Kochi, Kerala',
      phone: '+91 5555555555',
      website: 'https://example.com',
      distance: '2 miles from venue',
      image: 'https://picsum.photos/800/600?random=10',
      features: ['Kitchen', 'Free Parking', 'Gym', 'Family Friendly']
    }
  ];

  return (
    <section className="where-to-stay-section" id="where-to-stay">
      <div className="where-to-stay-container">
        <motion.div
          className="where-to-stay-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Where to Stay</h2>
          <div className="section-divider"></div>
          <p className="section-description">
            We've reserved room blocks at these hotels for your convenience.
            Please mention our wedding when booking to receive special rates.
          </p>
        </motion.div>

        <div className="accommodations-grid">
          {accommodations.map((hotel, index) => (
            <motion.div
              key={index}
              className="accommodation-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="accommodation-image">
                <img src={hotel.image} alt={hotel.name} />
              </div>
              <div className="accommodation-content">
                <h3 className="accommodation-name">{hotel.name}</h3>
                <p className="accommodation-distance">{hotel.distance}</p>
                <p className="accommodation-description">{hotel.description}</p>

                <div className="accommodation-features">
                  {hotel.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>

                <div className="accommodation-details">
                  <p className="accommodation-address">
                    <span className="icon">📍</span>
                    {hotel.address}
                  </p>
                  <p className="accommodation-phone">
                    <span className="icon">📞</span>
                    <a href={`tel:${hotel.phone}`}>{hotel.phone}</a>
                  </p>
                </div>

                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accommodation-button"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="travel-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3>Getting Here</h3>
          <p>
            The nearest airport is Cochin International Airport (COK), approximately
            30 minutes from the wedding venue. Car rentals and ride-sharing services
            are readily available at the airport.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhereToStay;
