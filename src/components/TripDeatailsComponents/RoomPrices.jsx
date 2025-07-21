export default function RoomPrices({ roomPrices }) {
  if (!roomPrices) return null;

  return (
    <section className="overflow-x-auto mb-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-blue-900 p-4 dark:shadow-[0_4px_32px_0_rgba(0,40,120,0.25)]">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 tracking-tight">
        Prices
      </h2>
      <table className="w-full border-separate border-spacing-0 text-center text-gray-700 dark:text-gray-200">
        <thead>
          <tr className="bg-blue-50 dark:bg-blue-900">
            <th className="p-3 font-semibold rounded-tl-2xl">From</th>
            <th className="p-3 font-semibold">To</th>
            <th className="p-3 font-semibold">Single Room</th>
            <th className="p-3 font-semibold">Double Room</th>
            <th className="p-3 font-semibold rounded-tr-2xl">Triple Room</th>
          </tr>
        </thead>
        <tbody  className="bg-background ">
          <tr>
            <td className="p-3 border-b border-gray-200 dark:border-gray-700">
              {roomPrices.startDate}
            </td>
            <td className="p-3 border-b border-gray-200 dark:border-gray-700">
              {roomPrices.endDate}
            </td>
            <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-bold">
              <span className="inline-block px-3 py-1 rounded-lg bg-green-100 dark:bg-green-700/60 text-green-700 dark:text-green-200 shadow-sm">
                {roomPrices.single} EGP
              </span>
            </td>
            <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-bold">
              <span className="inline-block px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-700/60 text-blue-700 dark:text-blue-200 shadow-sm">
                {roomPrices.double} EGP
              </span>
            </td>
            <td className="p-3 border-b border-gray-200 dark:border-gray-700 font-bold">
              <span className="inline-block px-3 py-1 rounded-lg bg-purple-100 dark:bg-purple-700/60 text-purple-700 dark:text-purple-200 shadow-sm">
                {roomPrices.triple} EGP
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
