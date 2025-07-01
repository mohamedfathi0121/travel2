export default function PriceNotIncludes() {
  return (
    <section className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 text-right">
      <h2 className="text-xl font-semibold text-blue-800 mb-2">السعر لا يشمل:</h2>
      <ul className="list-disc pr-6 ">
        <li>المشروبات الغازية</li>
        <li>أي خدمات إضافية داخل الفندق</li>
      </ul>
    </section>
  );
}
