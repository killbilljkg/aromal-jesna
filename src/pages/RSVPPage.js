import React from 'react';
import Navigation from '../components/Navigation';
import RSVPForm from '../components/RSVPForm';
import weddingData from '../wedding-data.json';
import './Page.css';

const RSVPPage = () => {
  return (
    <div className="page">
      <Navigation couple={weddingData.couple} />
      <div className="page-content">
        <RSVPForm rsvpInfo={weddingData.rsvp} />
      </div>
    </div>
  );
};

export default RSVPPage;
