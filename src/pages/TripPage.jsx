import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import TripTabs from "../components/myTrips/TripTabs";
import TripCard from "../components/myTrips/TripCard";
import { useAuth } from "../hooks/useAuth";

export default function TripPage() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [currentTab, setCurrentTab] = useState("On Going");

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
      if (!user?.id) return;

      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(
          `
          id,
          ticket_id,
          trip_schedules (
            id,
            start_date,
            end_date,
            base_trips (
              id,
              title,
              photo_urls
            )
          )
        `
        )
        .eq("user_id", user.id);
        console.log(user.id);
        console.log(bookings);

      if (error) {
        console.error("Error fetching bookings:", error.message);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0); // ✅ Normalize to midnight

      const mappedTrips = bookings.map((booking) => {
        const trip = booking.trip_schedules;
        const baseTrip = trip?.base_trips;

        const endDate = new Date(trip?.end_date);
        endDate.setHours(0, 0, 0, 0); // ✅ Normalize

        const status = endDate < today ? "Completed" : "On Going";

        const startFormatted = formatDateTime(trip.start_date);
        const endFormatted = formatDateTime(trip.end_date);

        return {
          id: trip.id,
          status,
          title: baseTrip?.title || "Untitled",
          date: `${startFormatted.date} at ${startFormatted.time}\n→ ${endFormatted.date} at ${endFormatted.time}`,
          image: baseTrip?.photo_urls?.[0] || "/default-trip-image.jpg",
          ticket_id: booking.ticket_id
        };
      });

      setTrips(mappedTrips);
    };

    fetchTrips();
  }, [user?.id]);

  const filteredTrips = trips.filter((trip) => trip.status === currentTab);
  console.log(filteredTrips);

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
              id={trip.id}
              ticketId={trip.ticket_id}

              
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
