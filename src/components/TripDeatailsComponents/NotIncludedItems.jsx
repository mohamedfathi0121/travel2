export default function PriceNotIncludes() {
  return (
    <section className="bg-background p-4 rounded-lg shadow-sm mb-4 text-left border border-gray-200 dark:border-blue-900 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      <h2 className="text-xl font-semibold text-text-primary  mb-2">Price Does Not Include:</h2>
      <ul className="list-disc pl-6 text-text-hard-secondary">
        <li>Soft drinks</li>
        <li>Any additional services inside the hotel</li>
      </ul>
    </section>
  );
}
