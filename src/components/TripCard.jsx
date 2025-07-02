// src/components/TripCard.jsx
import { Link } from "react-router-dom";

const TripCard = ({ trip }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-4">
      <h3 className="text-xl font-semibold">{trip.destination}</h3>
      <p>${trip.price}</p>
      <p>{trip.date}</p>
      <Link to={`/trip/${trip.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default TripCard;
