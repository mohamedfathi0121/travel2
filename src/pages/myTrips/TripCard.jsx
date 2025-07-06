export default function TripCard({ title, date, image }) {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6 mb-6 p-4 bg-background rounded-xl shadow-sm shadow-text-hard-secondary hover:shadow-md transition-shadow duration-200 w-full">
      <div className="flex-1 flex flex-col items-start">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary mb-3">{date}</p>
        <button className="inline-flex items-center gap-1 bg-button-primary hover:bg-button-primary-hover hover:shadow-md  shadow-text-hard-secondary  text-button-text px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200">
          Pay Now
          <span role="img" aria-label="card">
            💳
          </span>
        </button>
      </div>

      <img
        src={image}
        alt={title}
        className="w-full sm:w-60 h-32 sm:h-40 object-cover rounded-lg shadow"
      />
    </div>
  );
}
