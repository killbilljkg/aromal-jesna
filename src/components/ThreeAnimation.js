import React from 'react';
import './ThreeAnimation.css';

const ThreeAnimation = ({ groomImage, brideImage, groomName, brideName }) => {
  return (
    <section className="couple-section">
      <div className="couple-container">
        <div className="couple-content">
          <div className="couple-image-wrapper">
            <div className="image-frame">
              <img src={groomImage} alt={groomName} className="couple-image" />
              <div className="image-overlay"></div>
            </div>
            <h3 className="couple-name">{groomName}</h3>
          </div>

          <div className="divider">
            <div className="divider-line"></div>
            <div className="heart-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"/>
              </svg>
            </div>
            <div className="divider-line"></div>
          </div>

          <div className="couple-image-wrapper">
            <div className="image-frame">
              <img src={brideImage} alt={brideName} className="couple-image" />
              <div className="image-overlay"></div>
            </div>
            <h3 className="couple-name">{brideName}</h3>
          </div>
        </div>

        <div className="together-message">
          <h2 className="fancy-text">Together Forever</h2>
          <p className="message-subtitle">Two hearts, one journey</p>
        </div>
      </div>
    </section>
  );
};

export default ThreeAnimation;
