<<<<<<< HEAD
=======
// src/pages/HomePage.jsx
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
import { useState } from "react";
import { trips as allTrips } from "../data/trips";
import TripCard from "../components/TripCard";
import SidebarFilters from "../components/SidebarFilters";

const HomePage = () => {
  const [filteredTrips, setFilteredTrips] = useState(allTrips);
<<<<<<< HEAD
  const [currentPage, setCurrentPage] = useState(1);
  const [tripsPerPage, setTripsPerPage] = useState(6);

  const handleFilter = ({ cost, date, country }) => {
    const filtered = allTrips.filter((trip) => {
      return (
        (!cost || trip.price <= parseFloat(cost)) &&
        (!date || trip.date === date) &&
        (!country || trip.destination.toLowerCase().includes(country.toLowerCase()))
      );
    });
    setFilteredTrips(filtered);
    setCurrentPage(1);
  };

  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  const renderPagination = () => (
    <div className="mt-6 flex justify-center items-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-input text-text-primary hover:bg-button-primary-hover transition-all duration-200"
        }`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-button-primary text-white"
              : "bg-input text-text-primary"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-input text-text-primary hover:bg-button-primary-hover transition-all duration-200"
        }`}
      >
        Next
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-background text-text-primary"
    >
      <div className="rounded shadow md:col-span-1">
=======

  const handleFilter = ({ destination, cost, date }) => {
    const filtered = allTrips.filter((trip) => {
      return (
        (!destination || trip.destination.toLowerCase().includes(destination.toLowerCase())) &&
        (!cost || trip.price <= parseFloat(cost)) &&
        (!date || trip.date === date)
      );
    });
    setFilteredTrips(filtered);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-background text-text-primary">
      <div className="rounded shadow md:col-span-1 bg-background">
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
        <SidebarFilters onFilter={handleFilter} />
      </div>

      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-4">Trips</h1>
<<<<<<< HEAD

        <div className="flex justify-end mb-4">
          <label className="mr-2 text-sm">Trips per page:</label>
          <select
            value={tripsPerPage}
            onChange={(e) => {
              setTripsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="p-1 border rounded bg-input text-text-primary"
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>

        {currentTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
        {renderPagination()}
=======
        {filteredTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
      </div>
    </div>
  );
};

export default HomePage;
