import { FaMapMarkerAlt, FaUmbrellaBeach, FaPlaneDeparture, FaShuttleVan, FaCar } from "react-icons/fa";

export default function HotelLocation({ locationUrl }) {
  const isEmbedLink = locationUrl?.includes("google.com/maps/embed");

  return (
    <section className="bg-background p-4 rounded-lg shadow-sm mb-4 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      <h2 className="text-xl font-semibold mb-2 text-text-primary">Hotel Location:</h2>

      {isEmbedLink ? (
        <div className="mt-4">
          <iframe
            title="Hotel Location"
            src={locationUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-md"
          ></iframe>
        </div>
      ) : (
        <div className="mt-4 text-blue-600 dark:text-blue-300">
          <p className="mb-2">Location map is not embeddable. Click below to view:</p>
          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </section>
  );
}

