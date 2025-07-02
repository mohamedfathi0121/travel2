export default function HotelLocation() {
  return (
    <section className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 text-right">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">موقع الفندق:</h2>
      <p className="text-gray-700 leading-loose">
        📍 يقع فندق فالكون هيلز في منطقة رأس أم سيد بشرم الشيخ، على بعد دقائق من خليج نعمة الشهير.
        <br />
        🏖️ يبعد الفندق حوالي 750 مترًا عن شاطئ أمفورا.
        <br />
        ✈️ المسافة من مطار شرم الشيخ الدولي حوالي 17 كم.
        <br />
        🚌 تتوفر خدمة نقل مجانية من وإلى خليج نعمة وشاطئ الفندق الخاص.
        <br />
        🚗 مواقف سيارات مجانية متاحة داخل الفندق.
      </p>

      {/* خريطة جوجل (اختياري) */}
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
