import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

import StatsSection from "../components/TripDeatailsComponents/StatsSection";
import TripName from "../components/TripDeatailsComponents/TripName";
import TripVRVideo from "../components/TripDeatailsComponents/VrPlayer";
import TripGallery from "../components/TripDeatailsComponents/TripGallery";
import TripDescription from "../components/TripDeatailsComponents/TripDescription";
import IncludedItems from "../components/TripDeatailsComponents/IncludedItems";
import NotIncludedItems from "../components/TripDeatailsComponents/NotIncludedItems";
import RoomPrices from "../components/TripDeatailsComponents/RoomPrices";
import HotelNotes from "../components/TripDeatailsComponents/HotelNotes";
import HotelLocation from "../components/TripDeatailsComponents/HotelLocation";
import ReviewSection from "../components/TripDeatailsComponents/Reviews";
import InquiryFormSection from "../components/TripDeatailsComponents/InquiryForm";
import VrCard from "../components/TripDeatailsComponents/VrCard";

export default function TripDetails() {
  const { tripId } = useParams();
  // const navigate = useNavigate();

  const [tripData, setTripData] = useState(null);
  const [includedItems, setIncludedItems] = useState("");
  const [notIncludedText, setNotIncludedText] = useState("");
  const [roomPrices, setRoomPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [locationUrl, setLocationUrl] = useState("");
  const [bookingInfo, setBookingInfo] = useState({});
  const [scheduleId, setScheduleId] = useState(null); // ✅ جديد
  const [errorMsg, setErrorMsg] = useState("");


  useEffect(() => {
    const fetchTripData = async () => {
      if (!tripId) {
        setError("لا توجد بيانات للرحلة.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("base_trips")
        .select("*")
        .eq("id", tripId)
        .single();

      if (error) {
        setError("تعذر تحميل بيانات الرحلة.");
        setLoading(false);
        return;
      } else {
        setTripData(data);
      }

      const { data: scheduleData, error: scheduleError } = await supabase
        .from("trip_schedules")
        .select("id, price_include, price_not_include, start_date, end_date, price, location_url")
        .eq("base_trip_id", tripId)
        .single();

      if (!scheduleError && scheduleData) {
        setScheduleId(scheduleData.id); // ✅ حفظ id
        setIncludedItems(scheduleData.price_include || "");
        setNotIncludedText(scheduleData.price_not_include || "");
        setLocationUrl(scheduleData.location_url || "");

        const parsedPrices = scheduleData.price || {};
        setRoomPrices({
          startDate: scheduleData.start_date,
          endDate: scheduleData.end_date,
          single: parsedPrices.price_single,
          double: parsedPrices.price_double,
          triple: parsedPrices.price_triple,
        });
      }

      const { data: statsSchedule, error: statsError } = await supabase
        .from("trip_schedules")
        .select("available_tickets, status, price")
        .eq("base_trip_id", tripId)
        .order("start_date", { ascending: true })
        .limit(1)
        .single();

      if (!statsError) {
        setStatsData(statsSchedule);
      }

      setLoading(false);
    };

    fetchTripData();
  }, [tripId]);

const handleBooking = async () => {
  const userId = "1a0ff618-498e-4b3a-82bc-b9944b1f1f49"; // مؤقتًا
  console.log("📦 Booking Info:", bookingInfo);
console.log("📦 scheduleId:", scheduleId);
console.log("📦 tripId:", tripId);
console.log("📦 Final Payload:", {
  user_id: userId,
  trip_schedule_id: scheduleId,
  base_trip_id: tripId,
  booking_info: bookingInfo,
});

//   const userId = "1a0ff618-498e-4b3a-82bc-b9944b1f1f49"; // مؤقتًا

  if (!scheduleId || !tripId) {
    alert("لم يتم تحميل بيانات الرحلة أو الجدول الزمني.");
    return;
  }

  // ✅ التحقق من أن المستخدم اختار على الأقل غرفة واحدة
  if (
    (bookingInfo.singleRooms || 0) === 0 &&
    (bookingInfo.doubleRooms || 0) === 0 &&
    (bookingInfo.tripleRooms || 0) === 0
  ) {
    setErrorMsg("Please select the room first for continuous booking.");
return;

    
  }

  const payload = {
    user_id: userId,
    trip_schedule_id: scheduleId,
    base_trip_id: tripId,
    booking_info: bookingInfo,
  };

  try {
    const response = await fetch(
      "https://iklzpmnhifxwgmqydths.supabase.co/functions/v1/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Origin": window.location.origin,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "فشل في إنشاء جلسة الدفع.");
    }

    window.location.href = result.url;
  } catch (err) {
    console.error("❌ Error creating checkout session:", err.message);
    alert("فشل إنشاء جلسة الدفع. حاول مرة أخرى.");
  }
};




  if (loading) return <div className="p-6 text-center text-lg">جارٍ تحميل تفاصيل الرحلة...</div>;
  if (error) return <div className="p-6 text-center text-red-600 text-lg">{error}</div>;
  if (!tripData) return <div className="p-6 text-center text-gray-500 text-lg">لا توجد بيانات للرحلة.</div>;

  return (
    <div className="min-h-screen bg-background text-black p-4 space-y-6">
      <StatsSection statsData={statsData} />
      <TripName
        name={tripData.title}
        country={tripData.country}
        city={tripData.city}
        rating={tripData.average_rating}
        ratingCount={tripData.rating_counts}
      />
      <TripVRVideo videoUrl={tripData.video_url} />
      <VrCard image={tripData.photo_urls?.[0]} videoUrl={tripData.video_url} />
      <TripGallery images={tripData.photo_urls} />
      <TripDescription description={tripData.description} />
      <IncludedItems includedItems={includedItems} />
      <NotIncludedItems notIncludedText={notIncludedText} />
      <RoomPrices roomPrices={roomPrices} />
      <HotelNotes />
      <ReviewSection
        averageRating={tripData.average_rating}
        ratingCount={tripData.rating_counts}
        tripTitle={tripData.title}
        country={tripData.country}
        city={tripData.city}
      />
      <InquiryFormSection priceData={statsData?.price || {}} setBookingInfo={setBookingInfo} />
       {errorMsg && (
  <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
    {errorMsg}
  </div>
)}
      <HotelLocation locationUrl={locationUrl} />

      <button
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-5 py-2 rounded-full shadow-lg text-base z-50 bg-blue-500 text-white hover:bg-blue-600 transition-all"
        onClick={handleBooking}
      >
        Book Now
      </button>
    </div>
  );
}

