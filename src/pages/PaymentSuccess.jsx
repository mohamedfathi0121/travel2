import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const updateTickets = async () => {
      const bookedCount = parseInt(localStorage.getItem("booking_people_count") || "0");
      const scheduleId = localStorage.getItem("schedule_id");

      if (!scheduleId || !bookedCount) return;

      // ✅ Fetch current tickets
      const { data: currentData, error: fetchError } = await supabase
        .from("trip_schedules")
        .select("sold_tickits, available_tickets")
        .eq("id", scheduleId)
        .single();

      if (!fetchError && currentData) {
        const oldSold = Number(currentData.sold_tickits || 0);
        const totalTickets = Number(currentData.available_tickets || 0);

        const newSold = oldSold + bookedCount;
        const newStatus = newSold >= totalTickets ? "full" : "open";

        // ✅ Update only sold_tickits & status
        const { error: updateError } = await supabase
          .from("trip_schedules")
          .update({
            sold_tickits: newSold,
            status: newStatus,
          })
          .eq("id", scheduleId);

        if (updateError) {
          console.error("❌ Error updating ticket stats:", updateError.message);
        } else {
          console.log("✅ Tickets updated successfully.");
        }

        // 🧹 Clear local storage
        localStorage.removeItem("booking_people_count");
        localStorage.removeItem("schedule_id");
      }
    };

    updateTickets();

    // ✅ Redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate("/mytrips");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  return (
    <div className="text-center py-20 text-2xl text-green-600">
      ✅ Payment completed successfully!
      <p className="text-gray-500 text-base mt-2">
        Redirecting to <strong>My Trips</strong> in 3 seconds...
      </p>
    </div>
  );
}
