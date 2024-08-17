import React, { useState, useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const { setEvents } = useContext(CalendarContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { id: Date.now(), title, date };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Event</h2>
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
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
