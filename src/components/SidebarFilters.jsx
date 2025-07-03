// src/components/SidebarFilters.jsx
import { useState } from "react";

const SidebarFilters = ({ onFilter }) => {
  const [destination, setDestination] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ destination, cost, date });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      <div>
        <label className="block text-sm font-medium">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            backgroundColor: "var(--color-input)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Max Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            backgroundColor: "var(--color-input)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2"
          style={{
            backgroundColor: "var(--color-input)",
            color: "var(--color-text-primary)",
          }}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded text-white"
        style={{
          backgroundColor: "var(--color-btn-primary)",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "var(--color-btn-primary-hover)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "var(--color-btn-primary)";
        }}
      >
        Filter
      </button>
    </form>
  );
};

export default SidebarFilters;
