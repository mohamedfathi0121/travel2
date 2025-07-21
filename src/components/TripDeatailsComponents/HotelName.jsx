import { FaStar } from "react-icons/fa";

export default function HotelName() {
  return (
    <div className="text-center p-4 bg-background shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-text-primary flex justify-center items-center gap-2">
        Falcon Hills Hotel - Sharm El Sheikh
        <span className="flex text-yellow-500">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} />
          ))}
        </span>
      </h1>
    </div>
  );
}
