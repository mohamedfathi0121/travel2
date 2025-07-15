export default function TripDescription({ description }) {
  return (
    <section className="bg-background p-4 rounded-lg shadow-sm mb-4 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      <h2 className="text-xl font-semibold mb-2 text-text-primary">Trip Description:</h2>
      <p className="pl-6 text-text-hard-secondary leading-relaxed">
        {description || "No description available."}
      </p>
    </section>
  );
}
