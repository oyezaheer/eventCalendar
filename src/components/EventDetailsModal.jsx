import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { CalendarContext } from "../context/CalendarContext";

const EventDetailsModal = ({ onClose, eventId }) => {
  const { events } = useContext(CalendarContext);
  const event = events.find(event => event.id === parseInt(eventId));

  if (!event) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl mb-4 font-bold">Event Details</h2>
        <p className="mb-2"><strong>Title:</strong> {event.title}</p>
        <p className="mb-2"><strong>Date:</strong> {event.date}</p>
        <p className="mb-4"><strong>Category:</strong> {event.category}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default EventDetailsModal;
