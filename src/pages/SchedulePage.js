import React from 'react';
import Navigation from '../components/Navigation';
import Schedule from '../components/Schedule';
import weddingData from '../wedding-data.json';
import './Page.css';

const SchedulePage = () => {
  return (
    <div className="page">
      <Navigation couple={weddingData.couple} />
      <div className="page-content">
        <Schedule events={weddingData.events} />
      </div>
    </div>
  );
};

export default SchedulePage;
