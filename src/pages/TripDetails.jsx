import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import toast from "react-hot-toast";

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
import TripDetailsSkeleton from "../components/skeleton/TripDetailsSkeleton";
import { useAuth } from "../hooks/useAuth";

export default function TripDetails() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const [includedItems, setIncludedItems] = useState("");
  const [notIncludedText, setNotIncludedText] = useState("");
  const [roomPrices, setRoomPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState(null);
  const [locationUrl, setLocationUrl] = useState("");
  const [bookingInfo, setBookingInfo] = useState({});
  const [scheduleId, setScheduleId] = useState(null);
  const [errorMsg] = useState("");
  const { user } = useAuth();
  
  // ✅ Reload page after payment
  useEffect(() => {
    if (localStorage.getItem("payment_done")) {
      window.location.reload();
      localStorage.removeItem("payment_done");
    }
  }, []);

  useEffect(() => {
    const fetchTripData = async () => {
      if (!tripId) {
        toast.error("No trip schedule ID provided.");
        setLoading(false);
        return;
      }

      try {
        // ✅ 1) Fetch schedule first
        const { data: scheduleData, error: scheduleError } = await supabase
          .from("trip_schedules")
          .select(
            "id, base_trip_id, price_include, price_not_include, start_date, end_date, price, location_url, available_tickets, sold_tickits, status"
          )
          .eq("id", tripId)
          .single();

        if (scheduleError || !scheduleData) {
          toast.error("Failed to load trip schedule.");
          setLoading(false);
          return;
        }

        setScheduleId(scheduleData.id);
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

        // ✅ Stats Data
        const totalTickets = Number(scheduleData.available_tickets) || 0;
        const sold = Number(scheduleData.sold_tickits) || 0;
        const reminderTickets = totalTickets - sold;

        setStatsData({
          available_tickets: totalTickets,
          sold_tickits: sold,
          reminder_tickets: reminderTickets,
          status: scheduleData.status,
          price: parsedPrices,
        });

        // ✅ 2) Fetch Base Trip after schedule
        const { data: baseTripData, error: baseTripError } = await supabase
          .from("base_trips")
          .select("*")
          .eq("id", scheduleData.base_trip_id)
          .single();

        if (baseTripError || !baseTripData) {
          toast.error("Failed to load base trip details.");
          setLoading(false);
          return;
        }

        setTripData(baseTripData);
      } catch (err) {
        console.error("❌ Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId]);

  const handleBooking = async () => { 
    
    if (!user || !user.id) {
  toast.error("You must be logged in to book.");
  return;
    }

    if (!scheduleId || !tripId) {
      toast.error("Trip or schedule data not loaded.");
      return;
    }

    // ✅ Check selected rooms
    if (
      (bookingInfo.singleRooms || 0) === 0 &&
      (bookingInfo.doubleRooms || 0) === 0 &&
      (bookingInfo.tripleRooms || 0) === 0
    ) {
      toast.error("Please select at least one room before booking.");
      return;
    }

    const totalRoomCapacity =
      (bookingInfo.singleRooms || 0) * 1 +
      (bookingInfo.doubleRooms || 0) * 2 +
      (bookingInfo.tripleRooms || 0) * 3;

    const totalPeople = bookingInfo.members || 0;

   // ✅ تحقق من عدد الأفراد مقابل سعة الغرف
if (totalRoomCapacity < totalPeople) {
  toast.error(
    `You selected rooms for only ${totalRoomCapacity} members, but you have ${totalPeople} members. Please add more rooms.`
  );
  return;
}


// ✅ تحقق من وجود حجز سابق للمستخدم
const { data: existingBooking, errorerror: bookingError } = await supabase
  .from("bookings")
  .select("id")
  .eq("user_id", user.id)
  .eq("trip_schedule_id", scheduleId)
  .maybeSingle();
if (bookingError) {
  toast.error("Error checking existing booking.");
  return;
}
if (existingBooking) {
  toast.error("You have already booked this trip.");
  return;
}

// ✅ تحقق من توفر التذاكر
if (statsData.reminder_tickets <= 0) {
  toast.error("This trip is fully booked. No tickets are available.");
  return;
}

if (totalPeople > statsData.reminder_tickets) {
  toast.error(
    `Only ${statsData.reminder_tickets} ticket(s) left, but you have ${totalPeople} members. Please reduce the number of people.`
  );
  return;
}



    const payload = {
      user_id: user.id,
      trip_schedule_id: scheduleId,
      base_trip_id: tripId,
      booking_info: bookingInfo,
    };
    try {
    const response = await fetch(
      "https://iklzpmnhifxwgmqydths.supabase.co/functions/v1/create-booking",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      toast.error(result.error || "Booking failed.");
      return;
    }

    toast.success("Booking successful!");
  } catch (error) {
    toast.error("Something went wrong. Try again.");
    console.error(error);
  }

    try {
      toast.loading("Redirecting to payment...", { id: "payment" });

      localStorage.setItem("booking_people_count", totalPeople);
      localStorage.setItem("schedule_id", scheduleId);
      localStorage.setItem("payment_done", "true");

      const response = await fetch(
        "https://iklzpmnhifxwgmqydths.supabase.co/functions/v1/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create checkout session.");
      }

      toast.success("Redirecting to secure payment...", { id: "payment" });
      window.location.href = result.url;
    } catch (err) {
      console.error("❌ Booking Error:", err);
      toast.error("Payment session failed. Try again.", { id: "payment" });
    }
  };

  if (loading)
    return <TripDetailsSkeleton/>;
  if (!tripData)
    return (
      <div className="p-6 text-center text-gray-500 text-lg">
        No trip data found.
      </div>
    );

  return (
    <div className="min-h-screen bg-background text-black p-4 space-y-6">
      <StatsSection statsData={statsData} />
       <TripName 
  name={tripData.title}
  city={tripData.city}
  country={tripData.country}
/>
      <TripVRVideo videoUrl={tripData.video_url} />
      <VrCard image={tripData.photo_urls?.[0]} videoUrl={tripData.video_url} />
      <TripGallery images={tripData.photo_urls} />
      <TripDescription description={tripData.description} />
      <IncludedItems includedItems={includedItems} />
      <NotIncludedItems notIncludedText={notIncludedText} />
      <RoomPrices roomPrices={roomPrices} />
      <HotelNotes />
      <ReviewSection {...tripData} />
      <InquiryFormSection
        priceData={statsData?.price || {}}
        setBookingInfo={setBookingInfo}
      />

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
