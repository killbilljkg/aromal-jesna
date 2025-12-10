import React, { useState, useEffect } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import ThreeAnimation from './components/ThreeAnimation';
import EventCards from './components/EventCards';
import CountdownTimer from './components/CountdownTimer';
import RSVPForm from './components/RSVPForm';
import weddingData from './wedding-data.json';

function App() {
  const [guestName, setGuestName] = useState('');
  const [eventType, setEventType] = useState('both'); // 'engagement', 'wedding', or 'both'

  useEffect(() => {
    // Get guest name and event type from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);

    const name = urlParams.get('name');
    if (name) {
      setGuestName(decodeURIComponent(name));
    }

    const event = urlParams.get('event');
    if (event && (event === 'engagement' || event === 'wedding')) {
      setEventType(event);
    } else {
      setEventType('both');
    }
  }, []);

  // Filter events based on eventType
  const filteredEvents = eventType === 'both'
    ? weddingData.events
    : { [eventType]: weddingData.events[eventType] };

  return (
    <div className="App">
      <HeroSection
        guestName={guestName}
        couple={weddingData.couple}
        eventType={eventType}
      />
      <ThreeAnimation
        groomImage={weddingData.couple.groom.image}
        brideImage={weddingData.couple.bride.image}
        groomName={weddingData.couple.groom.name}
        brideName={weddingData.couple.bride.name}
      />
      <CountdownTimer events={filteredEvents} eventType={eventType} />
      <EventCards events={filteredEvents} eventType={eventType} />
      <RSVPForm
        rsvpInfo={weddingData.rsvp}
        guestName={guestName}
        eventType={eventType}
      />
    </div>
  );
}

export default App;
