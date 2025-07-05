export default function HotelNotes() {
  return (
    <section className="bg-background p-4 rounded-lg shadow-md mb-4 text-left">
      <h2 className="text-xl font-semibold  mb-3  text-text-primary">Notes:</h2>
      <h3 className="text-text-primary font-bold mb-2">Children Policy:</h3>
      <ul className="list-disc pl-6 space-y-1 text-text-hard-secondary">
        <li>Maximum of 2 children allowed in the same room with parents.</li>
        <li>Children from 0 to 5.99 years old stay free of charge (no extra bed).</li>
        <li>First child from 6.00 to 11.99 years old stays free of charge (no extra bed).</li>
        <li>Second child from 6.00 to 11.99 years old gets 50% off adult rate (with extra bed).</li>
        <li>Children aged 12 years and above are considered adults.</li>
        <li>Triple room capacity: 3 adults + 1 child.</li>
        <li>1 adult + 1 child = single room.</li>
        <li>2 children (in a separate room) = single room.</li>
      </ul>
    </section>
  );
}
