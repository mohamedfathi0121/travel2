export default function HotelNotes() {
  return (
    <section className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 text-right">
      <h2 className="text-xl font-semibold text-blue-800 mb-3">ملاحظات:</h2>
      <h3 className="text-lg font-bold mb-2">سياسة الأطفال:</h3>
      <ul className="list-disc pr-6 space-y-1 text-gray-800 ">
        <li>حد أقصى طفلين فقط في نفس غرفة الوالدين.</li>
        <li>الأطفال من 0 إلى 05.99 سنة مجانًا (بدون سرير إضافي).</li>
        <li>الطفل الأول من 06.00 إلى 11.99 سنة مجانًا (بدون سرير إضافي).</li>
        <li>الطفل الثاني من 06.00 إلى 11.99 سنة 50% من سعر الفرد البالغ (مع سرير إضافي).</li>
        <li>12 سنة يعتبر فرد بالغ.</li>
        <li>الطاقة الاستيعابية للغرفة الثلاثية: 03 أفراد بالغين + 01 طفل.</li>
        <li>1 فرد بالغ + 1 طفل = غرفة مفردة.</li>
        <li>طفلين (في غرفة منفصلة) = غرفة مفردة.</li>
      </ul>
    </section>
  );
}
