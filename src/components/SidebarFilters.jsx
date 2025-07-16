import { useState } from "react";

const SidebarFilters = ({ onFilter }) => {
<<<<<<< HEAD
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ cost, date, country });
=======
  const [destination, setDestination] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ destination, cost, date });
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 space-y-4 bg-background text-text-primary rounded shadow"
    >
      <div>
<<<<<<< HEAD
=======
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
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
        <label className="block text-sm font-medium">Max Cost</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
<<<<<<< HEAD
          className="w-full border rounded p-2 bg-input"
=======
          className="w-full border rounded p-2 bg-input text-text-primary placeholder:text-text-secondary"
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
          placeholder="Enter max cost"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
<<<<<<< HEAD
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
=======
          className="w-full border rounded p-2 bg-input text-text-primary"
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
        />
      </div>

      <button
        type="submit"
<<<<<<< HEAD
        className="px-4 py-2 rounded text-white bg-button-primary hover:bg-button-primary-hover transition-all duration-200"
=======
        className="px-4 py-2 rounded text-white bg-btn-primary hover:bg-btn-primary-hover transition"
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
      >
        Filter
      </button>
    </form>
  );
};

export default SidebarFilters;
