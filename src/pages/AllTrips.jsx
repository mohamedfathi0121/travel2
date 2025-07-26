import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Link } from "react-router-dom";

const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("trip_schedules")
        .select("*, base_trips(*)");

      if (error) {
        console.error("Supabase fetch error:", error);
      } else {
        console.log("Fetched Trips:", data);

        const today = new Date();
        const upcomingTrips = data.filter((trip) => {
          const endDate = new Date(trip.end_date);
          return endDate >= today;
        });

        setTrips(upcomingTrips);
        setFilteredTrips(upcomingTrips);
      }

      setLoading(false);
    };

    fetchTrips();
  }, []);

  const handleFilter = () => {
    let result = [...trips];

    if (city) {
      result = result.filter((trip) =>
        trip.base_trips?.city?.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (country) {
      result = result.filter((trip) =>
        trip.base_trips?.country?.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (price) {
      result = result.filter(
        (trip) =>
          Number(trip.price?.price_single || 0) <= Number(price) ||
          Number(trip.price?.price_double || 0) <= Number(price) ||
          Number(trip.price?.price_triple || 0) <= Number(price)
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
      <div className="flex flex-wrap gap-4 mb-10 w-full md:w-2/3">
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded bg-input text-text-primary w-full md:w-auto"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 border rounded bg-input text-text-primary w-full md:w-auto"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded bg-input text-text-primary w-full md:w-auto"
        />
        <button
          onClick={handleFilter}
          className="px-4 py-2 text-button-text rounded bg-button-primary hover:bg-button-primary-hover transition duration-200"
        >
          Filter
        </button>
      </div>

      {/* Trips */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: tripsPerPage }).map((_, i) => (
            <div key={i} className="p-4 bg-input rounded animate-pulse space-y-2">
              <div className="w-full h-48 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
              <div className="h-3 bg-gray-300 rounded w-2/3" />
            </div>
          ))
        ) : (
          currentTrips.map((trip, index) => {
            const remainingTickets = trip.available_tickets - trip.sold_tickits;
            return (

              
              <Link
                to={`/trips/${trip.id}`}
                key={trip.id || index}
                className="p-4 bg-input shadow rounded text-text-primary"
              >
                {trip.base_trips?.photo_urls ? (
                  <img
                    src={trip.base_trips.photo_urls[0]}
                    alt={trip.base_trips.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 rounded mb-2 flex items-center justify-center text-sm text-gray-500">
                    No Image
                  </div>
                )}

                <h3 className="font-bold text-lg">{trip.base_trips?.title}</h3>
                <p className="text-sm text-text-secondary">{trip.base_trips?.description}</p>
                <p className="text-sm text-text-secondary">
                  City: {trip.base_trips?.city}
                </p>
                <p className="text-sm text-text-secondary">
                  Country: {trip.base_trips?.country}
                </p>
                <p className="text-sm text-text-secondary">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      trip.status === "open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {trip.status}
                  </span>
                </p>
                <p className="text-sm text-text-secondary">
                  Remaining Tickets: {remainingTickets} / {trip.available_tickets}
                </p>
                <p className="text-sm text-text-secondary">
                  Price: Single ${trip.price?.price_single}, Double $
                  {trip.price?.price_double}, Triple ${trip.price?.price_triple}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Start: {new Date(trip.start_date).toLocaleDateString()} | End:{" "}
                  {new Date(trip.end_date).toLocaleDateString()}
                </p>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2 w-full md:w-1/2 mx-auto">
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
      )}
    </div>
  );
};

export default AllTrips;
