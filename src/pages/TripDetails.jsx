import StatsSection from "../components/TripDeatailsComponents/StatsSection";
import HotelName from "../components/TripDeatailsComponents/HotelName";
import HotelVRVideo from "../components/TripDeatailsComponents/HotelVRVideo";
import HotelGallery from "../components/TripDeatailsComponents/HotelGallery";
import HotelFeatures from "../components/TripDeatailsComponents/HotelFeatures";
import IncludedItems from "../components/TripDeatailsComponents/IncludedItems";
import NotIncludedItems from "../components/TripDeatailsComponents/NotIncludedItems";
import RoomPrices from "../components/TripDeatailsComponents/RoomPrices";
import HotelNotes from "../components/TripDeatailsComponents/HotelNotes";
import HotelLocation from "../components/TripDeatailsComponents/HotelLocation";

export default function TripDetails() {
  return (
    <>
      {/* <Helmet>
        <title>تفاصيل الرحله </title>
        <meta name="description" content="اكتشف تفاصيل الرحله، الإقامة، الأسعار، والمميزات الخاصة بالفندق." />
        <meta property="og:title" content="تفاصيل الرحلة - شرم الشيخ" />
        <meta property="og:description" content="أفضل عروض الرحلات والفنادق في شرم الشيخ." />
      </Helmet> */}
      <div className="p-4 space-y-6">
        <StatsSection />
        <HotelName />
        <HotelVRVideo />
        <HotelGallery />
        <HotelFeatures />
        <IncludedItems />
        <NotIncludedItems />
        <RoomPrices />
        <HotelNotes />
        <HotelLocation />

        <button
          className="fixed bottom-4 right-4 bg-header-background text-text-primary px-6 py-3 rounded-full shadow-lg hover:bg-btn-primary-hover transition-all text-lg z-50"
          onClick={() => {
            window.location.href = "/booking"; // مثال
          }}
        >
          احجز الآن
        </button>
      </div>
    </>
  );
}
