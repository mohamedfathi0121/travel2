// src/components/TripCard.jsx
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
  return (
    <div
      className="rounded shadow p-4 mb-4"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text-primary)",
      }}
    >
      <h3 className="text-xl font-semibold">{trip.destination}</h3>
      <p>${trip.price}</p>
      <p>{trip.date}</p>

      <Link
        to={`/trip/${trip.id}`}
        className="inline-block mt-2 px-3 py-1 rounded text-white"
        style={{
          backgroundColor: "var(--color-btn-primary)",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "var(--color-btn-primary-hover)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "var(--color-btn-primary)";
        }}
      >
        View Details
      </Link>
    </div>
  );
};

export default TripCard;
