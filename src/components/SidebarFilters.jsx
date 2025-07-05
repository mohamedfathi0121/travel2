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
      className="p-4 space-y-4 bg-[var(--color-background)] text-[var(--color-text-primary)] rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium">Destination</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border rounded p-2 bg-[var(--color-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
          placeholder="Enter destination"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Max Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full border rounded p-2 bg-[var(--color-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
          placeholder="Enter max cost"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2 bg-[var(--color-input)] text-[var(--color-text-primary)]"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded text-white bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)]"
      >
        Filter
      </button>
    </form>
  );
};

export default SidebarFilters;
