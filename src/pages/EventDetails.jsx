import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarContext } from '../context/CalendarContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events } = useContext(CalendarContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(id, 10));
    setEvent(foundEvent);
  }, [id, events]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full relative">
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p className="text-sm mb-2">{event.description}</p>
        <p className="text-sm mb-2 font-semibold text-blue-500">{event.category}</p>
        <p className="text-xs text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EventDetails;
