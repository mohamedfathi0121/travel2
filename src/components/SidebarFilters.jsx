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
      className="p-4 space-y-4 bg-background text-text-primary rounded shadow"
      
    >
      <h1 className="text-2xl font-bold mb-4">Filters</h1>
      <div>
        <label className="block text-sm font-medium">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border rounded p-2 bg-input text-text-primary placeholder:text-text-secondary"
          placeholder="Enter destination"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Max Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full border rounded p-2 bg-input text-text-primary placeholder:text-text-secondary"
          placeholder="Enter max cost"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2 bg-input text-text-primary"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded text-white bg-btn-primary hover:bg-btn-primary-hover transition"
      >
        Filter
      </button>
    </form>
  );
};

export default SidebarFilters;
