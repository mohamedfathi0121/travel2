// src/components/TripCard.jsx
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
  return (
    <div className="rounded shadow p-4 mb-4 bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <h3 className="text-xl font-semibold">{trip.destination}</h3>
      <p>${trip.price}</p>
      <p>{trip.date}</p>

      <Link
        to={`/trip/${trip.id}`}
        className="inline-block mt-2 px-3 py-1 rounded text-white bg-[var(--color-btn-primary)] hover:bg-[var(--color-btn-primary-hover)]"
      >
        View Details
      </Link>
    </div>
  );
};

export default TripCard;
