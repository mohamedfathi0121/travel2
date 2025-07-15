import { useState } from "react";

const SidebarFilters = ({ onFilter }) => {
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ cost, date, country });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-background text-text-primary rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium">Max Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="w-full border rounded p-2 bg-input"
          placeholder="Enter max cost"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded p-2 bg-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full border rounded p-2 bg-input"
          placeholder="Enter country"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded text-white bg-button-primary hover:bg-button-primary-hover transition-all duration-200"
      >
        Filter
      </button>
    </form>
  );
};

export default SidebarFilters;
