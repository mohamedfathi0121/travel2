export default function PriceTable() {
  return (
    <section className="overflow-x-auto mb-4">
      <h2 className="text-xl font-semibold mb-2 text-text-primary">Prices:</h2>
      <table className="w-full border-collapse border border-gray-300 text-center text-text-hard-secondary">
        <thead className="bg-background">
          <tr>
            <th className="border p-2">From</th>
            <th className="border p-2">To</th>
            <th className="border p-2">Single Room</th>
            <th className="border p-2">Double Room</th>
            <th className="border p-2">Triple Room</th>
          </tr>
        </thead>
        <tbody  className="bg-background ">
          <tr>
            <td className="border p-2">10/8/2025</td>
            <td className="border p-2">15/8/2025</td>
            <td className="border p-2">3500 EGP</td>
            <td className="border p-2">3000 EGP</td>
            <td className="border p-2">2800 EGP</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
