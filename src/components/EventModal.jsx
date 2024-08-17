import React from "react";
import ReactDOM from "react-dom";
import EventForm from "./EventForm";

const EventModal = ({ onClose, eventToEdit }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <EventForm onClose={onClose} eventToEdit={eventToEdit} />
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
