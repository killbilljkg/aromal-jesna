import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import GalleryPage from './pages/GalleryPage';
import SchedulePage from './pages/SchedulePage';
import QAPage from './pages/QAPage';
import RegistryPage from './pages/RegistryPage';
import RSVPPage from './pages/RSVPPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/registry" element={<RegistryPage />} />
        <Route path="/rsvp" element={<RSVPPage />} />
      </Routes>
    </Router>
  );
}

export default App;
