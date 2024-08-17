import React, { useState, useContext, useEffect } from "react";
import { CalendarContext } from "../context/CalendarContext";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { eventId } = useParams();
  const { events, setEvents } = useContext(CalendarContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const event = events.find(e => e.id === parseInt(eventId));
    if (event) {
      setTitle(event.title);
      setDate(event.date);
    }
  }, [eventId, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvents = events.map(e =>
      e.id === parseInt(eventId) ? { ...e, title, date } : e
    );
    setEvents(updatedEvents);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
