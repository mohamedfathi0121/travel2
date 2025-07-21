import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("base_trips").select("*");

      if (error) {
        console.error("Supabase fetch error:", error);
      } else {
        console.log("Data from Supabase:", data);
        setTrips(data);
        setFilteredTrips(data);
      }
    };

    fetchTrips();
  }, []);

  const handleFilter = () => {
    let result = trips;

    if (city) {
      result = result.filter((trip) =>
        trip.city?.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (price) {
      result = result.filter((trip) => Number(trip.price) <= Number(price));
    }

    
     if (time) {
       result = result.filter((trip) =>
         trip.time?.toLowerCase().includes(time.toLowerCase())
      );
     }

    setFilteredTrips(result);
    setCurrentPage(1);
  };

  const start = (currentPage - 1) * tripsPerPage;
  const currentTrips = filteredTrips.slice(start, start + tripsPerPage);
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  return (
    <div className="p-6 bg-background text-text-primary min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Trips</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded bg-input text-text-primary"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded bg-input text-text-primary"
        />
         <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded bg-input text-text-primary "
          
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 text-white rounded bg-button-primary hover:bg-button-primary-hover transition duration-200"
        >
          Filter
        </button>
      </div>

      {/* Trips */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentTrips.map((trip, index) => (
          <div key={trip.id || index} className="p-4 bg-white shadow rounded">
            {trip.photo_urls ? (
              <img
                src={trip.photo_urls}
                alt={trip.photo_urls}
                className="w-full h-48 object-cover rounded mb-2"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
            <h3 className="font-bold text-lg">{trip.title}</h3>
            <p className="text-gray-600">{trip.description}</p>
            <p className="text-sm text-gray-500">ID: {trip.id}</p>
            <p>City: {trip.city}</p>
            <p>Price: ${trip.price}</p>
            <p>Time: {trip.time}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllTrips;
