export default function RoomPrices({ roomPrices }) {
  if (!roomPrices) return null;

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
          </tr>
        </thead>
        <tbody  className="bg-background ">
          <tr>
<<<<<<< HEAD
            <td className="border p-2">10/8/2025</td>
            <td className="border p-2">15/8/2025</td>
            <td className="border p-2">3500 EGP</td>
            <td className="border p-2">3000 EGP</td>
            <td className="border p-2">2800 EGP</td>
=======
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
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
          </tr>
        </tbody>
      </table>
    </section>
  );
}
