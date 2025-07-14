import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { FaStar } from "react-icons/fa";

// ⭐ مكون النجوم
function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex justify-center text-text-primary my-1">
      {[...Array(max)].map((_, i) => (
        <FaStar
          key={i}
          className={
            i < Math.floor(rating)
              ? "text-blue-500"
              : i < Math.ceil(rating)
              ? "text-blue-300"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

// 📊 مكون شريط التقييم
function ReviewBar({ stars, percent }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-4 text-sm text-gray-700 dark:text-gray-300">{stars}</span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <div className="bg-blue-500 h-full" style={{ width: `${percent}%` }}></div>
      </div>
      <span className="w-10 text-sm text-gray-500 dark:text-gray-400 text-right">{percent}%</span>
    </div>
  );
}

// ✨ مكون الريفيو الأساسي
export default function ReviewSection() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const { data, error } = await supabase
        .from("base_trips")
        .select("title, country, city, average_rating, rating_counts")
        .eq("id", tripId)
        .single();

      if (!error) setTripData(data);
    };
    fetchTrip();
  }, [tripId]);

  if (!tripData) return null;

  const { country, city, average_rating, rating_counts } = tripData;

  const totalReviews = Object.values(rating_counts || {}).reduce(
    (sum, val) => sum + val,
    0
  );

  const reviewData = [5, 4, 3, 2, 1].map((star) => {
    const count = rating_counts?.[star] || 0;
    const percent = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
    return { stars: star, percent };
  });

  return (
    <section className="bg-background p-6 rounded-xl shadow-md w-full my-10 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      {/* 🗺️ الدولة والمدينة */}
      <div className="flex items-left gap-2 text-sm text-text-primary mb-4">
        <span className="font-medium">📍 Country: {country}</span>
        <span className="text-text-primary">|</span>
        <span>City: {city}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* ⭐ متوسط التقييم */}
        <div className="text-center sm:w-1/3">
          <p className="text-4xl font-bold text-text-primary">{average_rating}</p>
          <StarRating rating={average_rating} />
          <p className="text-gray-500 dark:text-gray-400">{totalReviews} reviews</p>
        </div>

        {/* 📊 تقييم حسب كل نجمة */}
        <div className="flex-1 space-y-2">
          {reviewData.map((item) => (
            <ReviewBar key={item.stars} stars={item.stars} percent={item.percent} />
          ))}
        </div>
      </div>
    </section>
  );
}
