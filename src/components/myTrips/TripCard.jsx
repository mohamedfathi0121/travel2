import { Link } from "react-router-dom";

export default function TripCard({
  title = "Untitled Trip",
  date = "Unknown Date",
  image,
  showReviewButton = false,
  id,          // Trip schedule ID (for review)
  ticketId,    // ✅ Optional ticket ID
}) {
  const defaultImage = "../../assets/a.jpg";

  return (
    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 mb-6 p-4 bg-background rounded-xl shadow-sm shadow-text-hard-secondary hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex-1 flex flex-col items-start">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary mb-3">{date}</p>

        {showReviewButton ? (
          <Link
            to={`/review/${id}`}
            className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Review{" "}
            <span role="img" aria-label="star">
              ⭐
            </span>
          </Link>
        ) : ticketId ? (
          <Link
            to={`/ticket/${ticketId}`}
            className="inline-flex items-center gap-1 bg-text-primary hover:bg-btn-primary-hover text-background px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Ticket
            <span role="img" aria-label="card">
              🎫
            </span>
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-1 bg-gray-400 text-white px-4 py-1.5 rounded-md text-sm font-medium cursor-not-allowed"
          >
            No Ticket
          </button>
        )}
      </div>

      <img
        src={image || defaultImage}
        alt={title || "Trip Image"}
        className="w-full sm:w-60 h-32 sm:h-40 object-cover rounded-lg shadow"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
    </div>
  );
}
