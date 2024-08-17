import React, { useContext, useState } from "react";
import { CalendarContext } from "../context/CalendarContext";

const EventFilter = ({ onFilterChange }) => {
  const { events } = useContext(CalendarContext);
  const [category, setCategory] = useState("All");

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    onFilterChange(
      selectedCategory === "All"
        ? events
        : events.filter(event => event.category === selectedCategory)
    );
  };

  return (
    <div className="mb-4 flex flex-row align-center">
      <label className="p-2">Filter by Category:</label>
      <select
        value={category}
        onChange={handleFilterChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
  );
};

export default EventFilter;
