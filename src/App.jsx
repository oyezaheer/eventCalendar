import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CalendarProvider } from "./context/CalendarContext";
import Calendar from "./components/Calendar";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import EventDetails from "./pages/EventDetails";

const App = () => {
  return (
    <CalendarProvider>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Calendar />} />
        <Route path="/event/:id" element={<EventDetails />} />

            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/edit-event/:eventId" element={<EditEvent />} />
            
          </Routes>
        </div>
      </Router>
    </CalendarProvider>
  );
};

export default App;
