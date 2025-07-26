import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

export default function TripInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tripId: tripScheduleId } = useParams();
  const [tripInfo, setTripInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingReviewText, setEditingReviewText] = useState("");
  const [editingRating, setEditingRating] = useState(0);

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const ratingCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[star] = reviews.filter((r) => r.rating === star).length;
    return acc;
  }, {});

  useEffect(() => {
    const fetchTripInfoAndReviews = async () => {
      const { data, error } = await supabase
        .from("trip_schedules")
        .select(
          `
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
        `
        )
        .eq("id", tripScheduleId)
        .maybeSingle();

      if (error) {
        console.error("Trip fetch error:", error.message);
      } else if (!data) {
        console.warn("No trip found for this ID:", tripScheduleId);
      } else {
        setTripInfo(data);
        if (data?.base_trips?.id) {
          await fetchUpdatedReviews(data.base_trips.id);
        }
      }
    };

    fetchTripInfoAndReviews();
  }, [tripScheduleId, user?.id]);

  const fetchUpdatedReviews = async (baseTripId) => {
    const { data } = await supabase
      .from("reviews")
      .select("id, user_id, rating, review_text, created_at")
      .eq("base_trip_id", baseTripId);

    const sortedReviews = [...data];
    if (user?.id) {
      sortedReviews.sort((a, b) => {
        if (a.user_id === user.id) return -1;
        if (b.user_id === user.id) return 1;
        return new Date(b.created_at) - new Date(a.created_at);
      });
    }

    setReviews(sortedReviews);
    const currentUserReview = sortedReviews.find((r) => r.user_id === user?.id);
    setUserReview(currentUserReview || null);
  };

  const handleSubmit = async () => {
    if (selectedRating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    const userId = user?.id;
    if (!userId) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    if (userReview) {
      toast.error("You have already submitted a review for this trip.");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      base_trip_id: tripInfo.base_trips.id,
      rating: selectedRating,
      review_text: reviewText,
      user_id: userId,
    });

    if (error) {
      toast.error("Error submitting review: " + error.message);
    } else {
      toast.success("Review submitted successfully!");
      setSelectedRating(0);
      setReviewText("");
      await fetchUpdatedReviews(tripInfo.base_trips.id);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);
    if (error) {
      toast.error("Failed to delete review: " + error.message);
    } else {
      toast.success("Review deleted.");
      await fetchUpdatedReviews(tripInfo.base_trips.id);
    }
  };

  const handleUpdateReview = async (reviewId, newText, newRating) => {
    const { error } = await supabase
      .from("reviews")
      .update({ review_text: newText, rating: newRating })
      .eq("id", reviewId);

    if (error) {
      toast.error("Failed to update review: " + error.message);
    } else {
      toast.success("Review updated.");
      setEditingReviewId(null);
      await fetchUpdatedReviews(tripInfo.base_trips.id);
    }
  };

  if (!tripInfo) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen w-[90%] max-w-screen-xl mx-auto bg-background text-text-primary">
      <div className="w-full px-4 py-6 bg-background">
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/mytrips")}
            className="px-4 py-2 bg-button-primary text-white rounded hover:bg-button-primary-hover transition h-[70px] w-[70px]"
          >
            ← Back
          </button>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-text-primary">
              {tripInfo.base_trips.title}
            </h2>
            <p className="text-text-secondary mb-4">
              {tripInfo.base_trips.description}
            </p>
          </div>
        </div>

        {/* التقييم العام */}
        <div className="bg-background rounded-md shadow p-6 mb-6 text-center">
          <h3 className="text-xl font-semibold mb-2 text-text-primary">
            How was {tripInfo.base_trips.title}?
          </h3>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-text-primary">
                {averageRating}
              </div>
              <div className="text-yellow-400 text-xl">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.round(averageRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <div className="text-sm text-text-primary">
                {totalReviews} reviews
              </div>
            </div>

            <div className="flex flex-col justify-center w-full max-w-md">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star] || 0;
                const percent = totalReviews
                  ? ((count / totalReviews) * 100).toFixed(0)
                  : 0;
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="w-4 text-sm text-text-primary">
                      {star}
                    </span>
                    <div className="w-full bg-text-hard-secondary h-3 rounded">
                      <div
                        className="bg-button-primary h-3 rounded"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-sm text-text-primary">
                      {percent}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* عرض المراجعات */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4 text-text-primary">
            Other Reviews
          </h3>
          {reviews.length > 0 ? (
            <div className="max-h-[200px] overflow-y-auto bg-background space-y-4 pr-2">
              {reviews.map((r) => {
                const isCurrentUser = user?.id === r.user_id;
                const isEditing = editingReviewId === r.id;
                return (
                  <div
                    key={r.id}
                    className="p-4 border rounded-md shadow-sm bg-background"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <div className="text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < r.rating ? (
                                "★"
                              ) : (
                                <span className="text-text-secondary">★</span>
                              )}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-text-secondary">
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {isCurrentUser && (
                        <div className="space-x-2">
                          <button
                            onClick={() => {
                              setEditingReviewId(r.id);
                              setEditingReviewText(r.review_text);
                              setEditingRating(r.rating);
                            }}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReview(r.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    {isEditing ? (
                      <div className="space-y-2 mt-2">
                        <div className="flex gap-1 justify-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              onClick={() => setEditingRating(i + 1)}
                              className={`cursor-pointer text-xl ${
                                i < editingRating
                                  ? "text-yellow-400"
                                  : "text-text-secondary"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <textarea
                          value={editingReviewText}
                          onChange={(e) => setEditingReviewText(e.target.value)}
                          className="w-full p-2 border rounded resize-none text-sm bg-background text-text-primary"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingReviewId(null)}
                            className="text-sm text-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateReview(
                                r.id,
                                editingReviewText,
                                editingRating
                              )
                            }
                            className="text-sm text-white bg-button-primary px-4 py-1 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-text-secondary mt-1">
                        {r.review_text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">No reviews yet.</p>
          )}
        </div>

        <hr className="my-8 text-text-primary" />

        {/* كتابة تقييم */}
        <div className="text-center mb-6">
          {userReview ? (
            <div className="text-text-secondary text-sm">
              <p>You have already reviewed this trip.</p>
              <p className="mt-2">
                You can edit or delete your review above 👆
              </p>
            </div>
          ) : (
            <>
              <div className="text-lg font-semibold mb-2 text-text-primary">
                Rate this trip
              </div>
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setSelectedRating(i + 1)}
                    className={`text-3xl cursor-pointer transition ${
                      i < selectedRating
                        ? "text-yellow-400"
                        : "text-text-secondary"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                className="mt-4 w-full border rounded-md p-2 resize-none bg-background text-text-primary"
              />
              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-button-primary text-white rounded hover:bg-button-primary-hover transition"
              >
                Submit Review
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
