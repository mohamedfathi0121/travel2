// src/pages/HomePage.jsx
import { useState } from "react";
import { trips as allTrips } from "../data/trips";
import TripCard from "../components/TripCard";
import SidebarFilters from "../components/SidebarFilters";

const HomePage = () => {
  const [filteredTrips, setFilteredTrips] = useState(allTrips);

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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-theme text-theme">
      <div className="rounded shadow md:col-span-1 bg-theme text-theme">
        <SidebarFilters onFilter={handleFilter} />
      </div>

      <div className="md:col-span-3">
        <h1 className="text-2xl font-bold mb-4">Trips</h1>
        {filteredTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
