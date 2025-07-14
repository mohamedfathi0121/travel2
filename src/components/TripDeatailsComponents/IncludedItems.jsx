export default function IncludedItems({ includedItems }) {
  return (
    <section className="bg-background p-4 rounded-lg shadow-sm mb-4 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      <h2 className="text-xl font-semibold text-text-primary mb-2">Price Includes:</h2>
      {includedItems ? (
        <ul className="list-disc pl-6 text-text-hard-secondary space-y-1">
          {includedItems
            .split("\n") // كل عنصر فى سطر جديد
            .map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-500">No included items found.</p>
      )}
    </section>
  );
}
