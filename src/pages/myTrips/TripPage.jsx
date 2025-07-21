import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import TripTabs from "./TripTabs";
import TripCard from "./TripCard";
import { useNavigate } from "react-router-dom";

export default function TripPage() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [currentTab, setCurrentTab] = useState("Approved");

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  useEffect(() => {
    const fetchTrips = async () => {
      const { data, error } = await supabase.from("trip_schedules").select(`
        id,
        start_date,
        end_date,
        status,
        location_url,
        base_trips (
          id,
          title,
          description,
          photo_urls,
          city
        )
      `);

      if (error) {
        console.error("Error fetching trips:", error.message);
        return;
      }

      const today = new Date();

      const mappedTrips = data.map((trip) => {
        const start = new Date(trip.start_date);
        const end = new Date(trip.end_date);

        let status = "Not Approved";

        if (trip.status === "cancelled") {
          status = "Cancelled";
        } else if (
          (trip.status === "open" || trip.status === "closed") &&
          end < today
        ) {
          status = "Completed";
        } else if (trip.status === "open" && start > today) {
          status = "Approved";
        } else if (trip.status === "full") {
          status = "Not Approved";
        }

        const startFormatted = formatDateTime(trip.start_date);
        const endFormatted = formatDateTime(trip.end_date);

        return {
          id: trip.id,
          status,
          title: trip.base_trips?.title || "Untitled",
          date: `${startFormatted.date} at ${startFormatted.time}\n→ ${endFormatted.date} at ${endFormatted.time}`,
          image: trip.base_trips?.photo_urls?.[0] || "/default-trip-image.jpg",
        };
      });

      setTrips(mappedTrips);
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips.filter((trip) => trip.status === currentTab);

  return (
    <div className="w-full max-w-[90%] mx-auto p-6 font-sans bg-background min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-text-primary">My Trips</h1>
      <div className="p-4">
        <TripTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              date={trip.date}
              image={trip.image}
              showReviewButton={currentTab === "Completed"}
              onReviewClick={() => navigate(`../TripInfo/${trip.id}`)}
            />
          ))
        ) : (
          <p className="text-text-secondary">
            No {currentTab.toLowerCase()} trips found.
          </p>
        )}
      </div>
    </div>
  );
}
