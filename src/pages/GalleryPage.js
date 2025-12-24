import React from 'react';
import Navigation from '../components/Navigation';
import Gallery from '../components/Gallery';
import weddingData from '../wedding-data.json';
import './Page.css';

const GalleryPage = () => {
  return (
    <div className="page">
      <Navigation couple={weddingData.couple} />
      <div className="page-content">
        <Gallery />
      </div>
    </div>
  );
};

export default GalleryPage;
