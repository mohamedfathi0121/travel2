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
import ReviewSection from "../components/TripDeatailsComponents/Reviews";
import InquiryFormSection from "../components/TripDeatailsComponents/InquiryForm";

export default function TripDetails() {
  return (
    <>
      {/* <Helmet>
        <title>تفاصيل الرحله </title>
        <meta name="description" content="اكتشف تفاصيل الرحله، الإقامة، الأسعار، والمميزات الخاصة بالفندق." />
        <meta property="og:title" content="تفاصيل الرحلة - شرم الشيخ" />
        <meta property="og:description" content="أفضل عروض الرحلات والفنادق في شرم الشيخ." />
      </Helmet> */}
      <div className="min-h-screen bg-background text-black p-4 space-y-6">

        <StatsSection />
        <HotelName />
        <HotelVRVideo />
        <HotelGallery />
        <HotelFeatures />
        <IncludedItems />
        <NotIncludedItems />
        <RoomPrices />
        <HotelNotes />
        <ReviewSection/>
        <InquiryFormSection/>
        <HotelLocation />

      <button
             className="fixed bottom-4 left-1/2 transform -translate-x-1/2 
             px-5 py-2 rounded-full shadow-lg text-base z-50
             bg-blue-500 text-white hover:bg-blue-600 
             transition-all"
            onClick={() => {
             window.location.href = "/booking";
            }}>
           Book Now
       </button>



      </div>
    </>
  );
}
