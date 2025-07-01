export default function PriceTable() {
  return (
    <section className="overflow-x-auto mb-4">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">الأسعار:</h2>
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">من</th>
            <th className="border p-2">إلى</th>
            <th className="border p-2">الغرفة الفردية</th>
            <th className="border p-2">الغرفة المزدوجة</th>
            <th className="border p-2">الغرفة الثلاثية</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">10/8/2025</td>
            <td className="border p-2">15/8/2025</td>
            <td className="border p-2">3500 جنيه</td>
            <td className="border p-2">3000 جنيه</td>
            <td className="border p-2">2800 جنيه</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
