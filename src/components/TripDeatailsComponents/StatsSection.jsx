export default function StatsSection({ statsData }) {
  if (!statsData) {
    return (
      <div className="text-center text-gray-500 mb-4">
        لا توجد بيانات متاحة للإحصائيات.
      </div>
    );
  }

  const totalTickets = statsData.available_tickets ?? 0;
  const bookedTickets = 200 - totalTickets; // ممكن تتعدل لاحقاً لما نعمل جدول للحجوزات
  const availableTickets = totalTickets-bookedTickets;
  const lowestPrice = statsData.price?.price_triple ?? "Not Available";
  const status = statsData.status === "completed" ? "❌ Completed" : "✅ Available";


  const stats = [
    { title: "Total Tickets", value: totalTickets },
    { title: "Booked Tickets", value: bookedTickets },
    { title: "Available Tickets", value: availableTickets },
  ];

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left ">
      {/* 💢 Trip starts from */}
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-3 rounded-xl shadow-lg flex flex-col justify-center items-center animate-pulse">
        <span className="text-3xl">💢</span>
        <h3 className="text-lg font-bold mt-2">Starting from</h3>
        <p className="text-xl font-extrabold">{lowestPrice} EGP</p>
      </div>

      {/* Ticket Statistics */}
      {stats.map((item, index) => (
        <div
          key={index}
          className="border border-blue-500 p-3  rounded-xl shadow-md transform transition-transform hover:scale-105 bg-background">
          <h3 className="text-base font-semibold text-center text-text-primary">{item.title}</h3>
          <p className="text-2xl font-bold mt-1 text-center text-text-hard-secondary">{item.value}</p>
=======
    <div className="space-y-4 mb-4">
      {/* حالة الرحلة */}
      <div
        className={`w-fit px-4 py-2 rounded-full text-sm font-semibold shadow ${
          statsData.status === "completed"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {status}
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left ">
        {/* 💢 Trip starts from */}
        <div className="bg-gradient-to-r from-pink-500 to-blue-500 text-white p-3 rounded-xl shadow-lg flex flex-col justify-center items-center animate-pulse">
          <span className="text-3xl">💢</span>
          <h3 className="text-lg font-bold mt-2">Starting from</h3>
          <p className="text-xl font-extrabold">{lowestPrice} EGP</p>
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
        </div>

        {/* Ticket Statistics */}
        {stats.map((item, index) => (
          <div
            key={index}
            className="border border-blue-500 p-3 rounded-xl shadow-md transform transition-transform hover:scale-105 bg-background"
          >
            <h3 className="text-base font-semibold text-center text-text-primary">
              {item.title}
            </h3>
            <p className="text-2xl font-bold mt-1 text-center text-text-hard-secondary">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
