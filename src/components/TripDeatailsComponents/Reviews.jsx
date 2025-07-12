import { FaStar } from "react-icons/fa";

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

export default function ReviewSection() {
  const totalReviews = 235;
  const averageRating = 4.7;
  const reviewData = [
    { stars: 5, percent: 50 },
    { stars: 4, percent: 30 },
    { stars: 3, percent: 10 },
    { stars: 2, percent: 5 },
    { stars: 1, percent: 5 },
  ];

  return (
    <section className="bg-background p-6 rounded-xl shadow-md w-full my-10 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      {/* الموقع */}
      <div className="flex items-left gap-2 text-sm text-text-primary mb-4">
        <span className="font-medium">📍 Country: Argentina</span>
        <span className="text-text-primary">|</span>
        <span>City: El Calafate</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* التقييم العام */}
        <div className="text-center sm:w-1/3">
          <p className="text-4xl font-bold text-text-primary">{averageRating}</p>
          <StarRating rating={averageRating} />
          <p className="text-gray-500 dark:text-gray-400">{totalReviews} reviews</p>
        </div>
        {/* التقييمات حسب النجوم */}
        <div className="flex-1 space-y-2">
          {reviewData.map((item) => (
            <ReviewBar key={item.stars} stars={item.stars} percent={item.percent} />
          ))}
        </div>
      </div>
    </section>
  );
}
