import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Fetch events from API and store in localStorage if none exist in the state
  useEffect(() => {
    console.log(typeof setEvents)
    if (events.length === 0) {
      axios
        .get("https://66c0b1baba6f27ca9a575d4e.mockapi.io/events/events")
        .then((response) => {
          if (Array.isArray(response.data)) {
            const uniqueEvents = response.data.filter(
              (newEvent) => !events.some((event) => event.id === newEvent.id)
            );
            const allEvents = [...events, ...uniqueEvents];
            setEvents(allEvents);  // Correct usage of setEvents here
            localStorage.setItem("events", JSON.stringify(allEvents));
          } else {
            console.error("Expected an array of events");
          }
        })
        .catch((error) => console.error(error));
    }
  }, [events]);

  // Update localStorage whenever events state changes
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const addEvent = useCallback((newEvent) => {
    const eventWithId = { ...newEvent, id: Date.now().toString() };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
    return eventWithId;
  }, []);

  const updateEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  return (
    <CalendarContext.Provider
      value={{
        events,  // Only events, not filteredEvents
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
