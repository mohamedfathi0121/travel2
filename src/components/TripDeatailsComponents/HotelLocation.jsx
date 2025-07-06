export default function HotelLocation() {
  return (
    <section className="bg-background p-4 rounded-lg shadow-sm mb-4 text-left">
      <h2 className="text-xl font-semibold mb-2 text-text-primary">Hotel Location:</h2>
      <p className=" text-text-hard-secondary leading-loose">
        📍 Falcon Hills Hotel is located in the Ras Umm El Sid area of Sharm El Sheikh, just minutes from the famous Naama Bay.
        <br />
        🏖️ The hotel is approximately 750 meters from Amphoras Beach.
        <br />
        ✈️ Sharm El Sheikh International Airport is about 17 km away.
        <br />
        🚌 Free shuttle service is available to and from Naama Bay and the hotel's private beach.
        <br />
        🚗 Free parking is available at the hotel.
      </p>

      {/* Google Map (optional) */}
      <div className="mt-4">
        <iframe
          title="Hotel Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.711330058139!2d34.3034946!3d27.9158176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15aab0fa6e3d209b%3A0x3178f77c7dc90838!2sFalcon%20Hills%20Hotel!5e0!3m2!1sen!2seg!4v1719854567890!5m2!1sen!2seg"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-md"
        ></iframe>
      </div>
    </section>
  );
}
