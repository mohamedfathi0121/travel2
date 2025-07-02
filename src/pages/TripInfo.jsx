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

  // === Calculate Ratings ===
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
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="text-blue-600 underline mb-4">← Back</button>

      <h1 className="text-2xl font-bold mb-2">{trip.title}</h1>
      <img src={trip.image} alt={trip.title} className="w-full h-64 object-cover rounded mb-4" />

      <p className="text-gray-700">{trip.description}</p>
      <p className="mt-4"><strong>Destination:</strong> {trip.destination}</p>
      <p><strong>Date:</strong> {trip.date}</p>
      <p><strong>Price:</strong> ${trip.price}</p>

      <hr className="my-6" />

      {/* Rating Summary */}
      <div className="p-6 bg-white rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">How was your trip?</h2>
        <div className="flex items-start gap-6">
          {/* Left: Average Rating */}
          <div className="text-center w-32">
            <p className="text-4xl font-bold">{averageRating}</p>
            <div className="flex justify-center text-yellow-500 mt-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar key={i} className={i < Math.round(averageRating) ? "" : "text-gray-300"} />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-1">{totalReviews} reviews</p>
          </div>

          {/* Right: Rating Breakdown */}
          <div className="flex-1 space-y-2">
            {ratingsData.map((r) => (
              <div key={r.stars} className="flex items-center gap-2">
                <span className="w-6">{r.stars}</span>
                <div className="flex-1 bg-gray-200 h-3 rounded">
                  <div
                    className="bg-blue-500 h-3 rounded"
                    style={{ width: `${r.percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-gray-600">{r.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border p-4 rounded bg-white shadow-sm">
                <p className="font-bold">{review.name} ⭐ {review.rating}/5</p>
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Add Review */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

        <input
          {...register("name", { required: true })}
          placeholder="Your Name"
          className="w-full border p-2 rounded"
        />

        <select
          {...register("rating", { required: true })}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Rating</option>
          {[5, 4, 3, 2, 1].map((star) => (
            <option key={star} value={star}>{star} Star</option>
          ))}
        </select>

        <textarea
          {...register("comment", { required: true })}
          placeholder="Your Comment"
          className="w-full border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default TripInfo;
