import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarContext } from "../context/CalendarContext";
import EventFilter from "./EventFilter";
import EventModal from "./EventModal";
import { startOfMonth, endOfMonth, eachDayOfInterval, isToday, getDay } from 'date-fns';

const getDaysInMonth = (year, month) => {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  const daysInMonth = eachDayOfInterval({ start, end });
  const startDay = getDay(start);

  const paddedDays = Array.from({ length: startDay }, () => null).concat(daysInMonth);
  return paddedDays;
};

const getMonthName = (monthIndex) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthIndex];
};

const Calendar = () => {
  const { events, deleteEvent, addEvent, updateEvent } = useContext(CalendarContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysInMonth(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const handleEditClick = (event) => {
    setEventToEdit(event);
    setShowModal(true);
  };

  const handleAddEventClick = () => {
    setEventToEdit(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventToEdit(null);
  };

  const handleEventSave = (eventData) => {
    if (eventToEdit) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }
    handleModalClose();
  };

  const handleDeleteClick = (eventId) => {
    deleteEvent(eventId);
  };

  const handleFilterChange = (filteredEvents) => {
    setFilteredEvents(filteredEvents);
  };

  const handleEventClick = (event) => {
    navigate(`/event/${event.id}`); // Navigate to the event details page
  };

  return (
    <div className="p-4 mb-4 h-full">
      <div className="flex items-center justify-between mb-4 flex-col md:flex-row">
        <button 
          onClick={handlePrevMonth} 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0"
        >
          Previous
        </button>
        <div className="text-xl font-bold mb-2 md:mb-0">
          {getMonthName(month)} {year}
        </div>
        <button 
          onClick={handleNextMonth} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <EventFilter onFilterChange={handleFilterChange} />
        <button
          onClick={handleAddEventClick}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2 md:mt-0"
        >
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4 text-center text-xs font-bold">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2 h-[calc(100vh-200px)]">
        {days.map((day, index) => {
          const isTodayDate = day && isToday(day);

          // Filter events for this day
          const dailyEvents = filteredEvents.filter(
            (event) => day && new Date(event.date).toDateString() === day.toDateString()
          );

          return (
            <div
              key={index}
              className={`relative border p-2 rounded-lg ${day ? 'bg-white' : 'bg-gray-200'} flex flex-col items-center justify-between h-24`} // Fixed height for the cell
            >
              {day ? (
                <div className="relative flex flex-col items-center justify-center w-full h-full">
                  {isTodayDate && (
                    <div className="absolute inset-0 flex justify-center">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                        {day.getDate()}
                      </div>
                    </div>
                  )}
                  {!isTodayDate && (
                    <p className="text-sm">{day.getDate()}</p>
                  )}

                  <div className="flex flex-col w-full h-full overflow-auto relative">
                    {dailyEvents.map(event => (
                      <div key={event.id} className="flex flex-col h-full">
                        <div className="text-xs font-semibold mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
                          <button
                            onClick={() => handleEventClick(event)}
                            className="text-blue-500"
                          >
                            {event.title}
                          </button>
                        </div>
                        {/* <div className="absolute bottom-2 flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-2 ">
                         */}
                         <div className="absolute bottom-2 flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-2 hidden md:flex">

                          <button
                            onClick={() => handleEditClick(event)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(event.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400">-</div>
              )}
            </div>
          );
        })}
      </div>

      {showModal && (
        <EventModal 
          onClose={handleModalClose} 
          onSave={handleEventSave}
          eventToEdit={eventToEdit} 
        />
      )}
    </div>
  );
};

export default Calendar;
