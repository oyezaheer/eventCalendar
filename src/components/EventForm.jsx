import React, { useState, useContext, useEffect } from "react";
import { CalendarContext } from "../context/CalendarContext";

const EventForm = ({ onClose, eventToEdit }) => {
  const { addEvent, updateEvent } = useContext(CalendarContext);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Work");
  const [description, setDescription] = useState(""); // New state for event description

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setCategory(eventToEdit.category);
      setDescription(eventToEdit.description || ""); // Set description if editing
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date) {
      const eventData = {
        id: eventToEdit ? eventToEdit.id : Date.now(),
        title,
        date,
        category,
        description, // Include description
      };

      if (eventToEdit) {
        updateEvent(eventData);
      } else {
        addEvent(eventData);
      }

      onClose();
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl mb-4">{eventToEdit ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </label>
        <label className="block mb-4">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded"
            rows="4"
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {eventToEdit ? "Save Changes" : "Add Event"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
