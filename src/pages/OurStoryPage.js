import React from 'react';
import Navigation from '../components/Navigation';
import OurStory from '../components/OurStory';
import weddingData from '../wedding-data.json';
import './Page.css';

const OurStoryPage = () => {
  return (
    <div className="page">
      <Navigation couple={weddingData.couple} />
      <div className="page-content">
        <OurStory couple={weddingData.couple} />
      </div>
    </div>
  );
};

export default OurStoryPage;
