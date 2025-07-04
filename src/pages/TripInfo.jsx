import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trips } from "../data/trips";
import { FaStar } from "react-icons/fa";

const TripInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = trips.find((t) => t.id === Number(id));

  const [reviews, setReviews] = useState([
    { name: "Ali", rating: 5, comment: "Amazing trip!" },
    { name: "Sara", rating: 4, comment: "Very good but expensive." },
    { name: "John", rating: 3, comment: "Average experience." },
  ]);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newReview = {
      name: data.name,
      rating: Number(data.rating),
      comment: data.comment,
    };
    setReviews((prev) => [...prev, newReview]);
    reset();
  };

  if (!trip) return <p className="p-6 text-red-500">Trip not found.</p>;

  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);

  const ratingsData = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percent = totalReviews === 0 ? 0 : ((count / totalReviews) * 100).toFixed(0);
    return { stars: star, percent };
  });

  return (
    <div className="max-w-3xl mx-auto p-6 text-theme">
      <button
        onClick={() => navigate(-1)}
        className="underline mb-4 text-sm text-[color:var(--color-btn-primary)]"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2">{trip.title}</h1>
      <img
        src={trip.image}
        alt={trip.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <p>{trip.description}</p>
      <p className="mt-4">
        <strong>Destination:</strong> {trip.destination}
      </p>
      <p>
        <strong>Date:</strong> {trip.date}
      </p>
      <p>
        <strong>Price:</strong> ${trip.price}
      </p>

      <hr className="my-6" />

      {/* Rating Summary */}
      <div className="p-6 rounded shadow mb-10 bg-theme">
        <h2 className="text-xl font-semibold mb-4">How was your trip?</h2>
        <div className="flex items-start gap-6">
          <div className="text-center w-32">
            <p className="text-4xl font-bold">{averageRating}</p>
            <div className="flex justify-center text-yellow-500 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.round(averageRating) ? "" : "text-gray-300"}
                />
              ))}
            </div>
            <p className="text-sm mt-1 text-secondary">
              {totalReviews} reviews
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {ratingsData.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="w-6">{r.stars}</span>
                <div className="flex-1 h-3 rounded bg-gray-300">
                  <div
                    className="h-3 rounded"
                    style={{
                      backgroundColor: "var(--color-btn-primary)",
                      width: `${r.percent}%`,
                    }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-secondary">
                  {r.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded shadow-sm bg-theme">
                <p className="font-bold">
                  {review.name} ⭐ {review.rating}/5
                </p>
                <p className="text-secondary">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-secondary">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Add Review */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded shadow p-6 bg-theme"
      >
        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

        <input
          {...register("name", { required: true })}
          placeholder="Your Name"
          className="w-full border p-2 rounded bg-input"
        />

        <select
          {...register("rating", { required: true })}
          className="w-full border p-2 rounded bg-input"
        >
          <option value="">Select Rating</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>
              {star} Star
            </option>
          ))}
        </select>

        <textarea
          {...register("comment", { required: true })}
          placeholder="Your Comment"
          className="w-full border p-2 rounded bg-input"
        />

        <button type="submit" className="px-4 py-2 rounded btn-theme">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default TripInfo;
