import { FaStar } from "react-icons/fa";

export default function TripName({ name = "Trip Title", country = "", city = "", rating = 5, ratingCount = 0 }) {
  const roundedRating = Math.round(rating);

  return (
    <div className="text-center p-4 bg-background shadow-md rounded-lg">
      {/* 🔹 اسم الرحلة والنجوم */}
      <h1 className="text-3xl font-bold text-text-primary flex justify-center items-center gap-2 flex-wrap">
        {name}
        <span className="flex items-center text-yellow-500 ml-2">
          {[...Array(roundedRating)].map((_, index) => (
            <FaStar key={index} />
          ))}
          {ratingCount > 0 && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({ratingCount} ratings)
            </span>
          )}
        </span>
      </h1>

      {/* 🔹 الدولة والمدينة */}
      {(country || city) && (
        <p className="mt-2 text-lg font-medium text-gray-700 dark:text-gray-300">
          {country}{country && city ? ", " : ""}{city}
        </p>
      )}
    </div>
  );
}
