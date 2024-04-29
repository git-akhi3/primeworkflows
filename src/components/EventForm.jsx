import React, { useState, useEffect } from 'react';
import { fetchEventTypes, fetchEventNames } from '../api/api.js';
import '../styles/eventform.css'

const EventForm = ({ addNode }) => {
  const [eventTypes, setEventTypes] = useState([]);
  const [eventNames, setEventNames] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState('');
  const [selectedEventName, setSelectedEventName] = useState({name:'',type:''});
  const [submittedEvent, setSubmittedEvent] = useState(null);

  useEffect(() => {
    fetchEventTypes().then(setEventTypes);
  }, []);

  useEffect(() => {
    if (selectedEventType) {
      fetchEventNames(selectedEventType).then(setEventNames);
    }
  }, [selectedEventType]);
  const handleSubmit = (event) => {
    event.preventDefault(); 

    if (!selectedEventType || !selectedEventName) {
      return;
    }
    
    
    setSubmittedEvent({ type: selectedEventType, name: selectedEventName });
    
    
    addNode(selectedEventType, selectedEventName);

    // Reset form fields
    setSelectedEventType('');
    setSelectedEventName('');
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div>
        <h3>Event Type</h3>
        <select value={selectedEventType} onChange={(e) => setSelectedEventType(e.target.value)}>
          <option value="">Select Event Type</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {selectedEventType && (
        <div>
          <h3>Event Names</h3>
          <div className="event-name-list">
            {eventNames.map((name) => (

              <div 
              key={name} 
              className={`event-card ${name === selectedEventName ? 'highlight' : ''}`}
              onClick={() => setSelectedEventName(name)}>
                {name}
              </div>
            ))}
          </div>
        </div>
      )}
      <button onClick={handleSubmit} type="submit">Submit</button>
    </form>
  );
};

export default EventForm;
