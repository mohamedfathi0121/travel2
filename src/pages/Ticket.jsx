import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import QRCode from "react-qr-code";
import supabase from "../utils/supabase";

const ThemedText = ({ type = "default", children, className = "" }) => {
  const baseStyle = "font-sans";
  const typeStyles = {
    title: "text-3xl font-bold tracking-tight",
    subtitle: "text-xl font-semibold",
    default: "text-base",
    defaultSemiBold: "text-base font-semibold",
  };
  return (
    <p className={`${baseStyle} ${typeStyles[type]} ${className}`}>
      {children}
    </p>
  );
};

export default function Ticket() {
  const { ticketId } = useParams();
  console.log(ticketId);
  const [liveBooking, setLiveBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!ticketId) {
        setError("Booking ID is missing from the URL.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error: queryError } = await supabase
          .from("bookings")
          .select(
            `
            id,
            ticket_id,
            total_price,
            attendees,
            rooms,
            trip_schedules (
              base_trips (
                title,
                photo_urls
              )
            ),
            profiles (
              display_name
            )
          `
          )
          .eq("ticket_id", ticketId)
          .single();

        if (queryError) throw queryError;
        if (data) {
          setLiveBooking(data);
        } else {
          throw new Error("Booking not found.");
        }
      } catch (err) {
        console.error("Error fetching booking details:", err);
        setError(`Failed to fetch booking data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [ticketId]);

  const styles = {
    container:
      "bg-[var(--color-background)] text-[var(--color-text-primary)] min-h-screen font-sans",
    contentContainer: "max-w-2xl mx-auto p-4 sm:p-6 lg:p-8",
    confirmationHeader: "text-center mb-8",
    confirmationSubtitle:
      "text-[var(--color-text-secondary)] mt-2 max-w-md mx-auto",
    destinationCard:
      "bg-[var(--color-background)] rounded-2xl shadow-lg overflow-hidden mb-8",
    destinationImage: "w-full h-48 sm:h-64 object-cover",
    cardTextContainer: "p-6",
    destinationTitle: "pb-2",
    destinationDetails: "pt-1 text-[var(--color-text-hard-secondary)]",
    destinationPrice: "pt-4 text-lg",
    detailsSection: "mb-8",
    detailRow:
      "flex justify-between items-center py-4 border-b border-[var(--color-input)]",
    qrCodeContainer: "flex flex-col items-center",
    qrTitle: "mb-4",
    qrCodeBox: "bg-[var(--color-background)] p-5 rounded-2xl shadow-lg",
    centered:
      "flex flex-col justify-center items-center min-h-screen p-4 text-center",
    loadingSpinner:
      "w-12 h-12 border-4 border-[var(--color-button-primary)] border-t-transparent rounded-full animate-spin",
  };

  const getRoomDetailsString = (booking) => {
    const roomParts = [];
    const { rooms } = booking;
    Object.keys(rooms).forEach((key) => {
      const value = rooms[key];
      if (value > 0) {
        const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
        roomParts.push(`${value} ${capitalizedKey}`);
      }
    });
    return roomParts.length > 0 ? roomParts.join(", ") : "No rooms selected";
  };

  if (isLoading) {
    return (
      <div className={styles.centered}>
        <div className={styles.loadingSpinner}></div>
        <ThemedText className="mt-4 text-lg">
          Confirming your booking...
        </ThemedText>
      </div>
    );
  }

  if (error || !liveBooking) {
    return (
      <div className={styles.centered}>
        <ThemedText type="subtitle">
          {error || "Could not find booking details."}
        </ThemedText>
        <ThemedText className={styles.confirmationSubtitle}>
          Please make sure you have a valid booking ID or try refreshing the
          page.
        </ThemedText>
      </div>
    );
  }

  const baseTrip = liveBooking.trip_schedules?.base_trips;
  const profile = liveBooking.profiles;
  const confirmationNumber = liveBooking.ticket_id || liveBooking.id;
  const imageUri =
    baseTrip?.photo_urls[0] ||
    "https://placehold.co/600x400/EEE/31343C?text=Image+Not+Available";

  return (
    <div className={styles.container}>
      <main className={styles.contentContainer}>
        <div className={styles.confirmationHeader}>
          <ThemedText type="title">
            Your trip is confirmed, {profile?.display_name || "friend"}!
          </ThemedText>
          <ThemedText className={styles.confirmationSubtitle}>
            Thank you for booking with us. Your trip details are below.
          </ThemedText>
        </div>

        <div className={styles.destinationCard}>
          <img
            src={imageUri}
            alt={baseTrip?.title}
            className={styles.destinationImage}
          />
          <div className={styles.cardTextContainer}>
            <ThemedText type="subtitle" className={styles.destinationTitle}>
              {baseTrip?.title}
            </ThemedText>
            <ThemedText
              type="defaultSemiBold"
              className={styles.destinationDetails}
            >
              {liveBooking.attendees?.members || 1} Guests
            </ThemedText>
            <ThemedText
              type="defaultSemiBold"
              className={styles.destinationPrice}
            >
              Total: {liveBooking.total_price?.currency?.toLocaleString() || "N/A"} {" "}
              {liveBooking.total_price?.amount?.toLocaleString() || "N/A"}
            </ThemedText>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <ThemedText type="subtitle">Booking Details</ThemedText>
          <div className="mt-4 space-y-2">
            <div className={styles.detailRow}>
              <ThemedText type="default">Confirmation Number</ThemedText>
              <ThemedText type="defaultSemiBold">
                {confirmationNumber}
              </ThemedText>
            </div>
            <div className={styles.detailRow}>
              <ThemedText type="default">Total Members</ThemedText>
              <ThemedText type="defaultSemiBold">
                {liveBooking.attendees?.members}
              </ThemedText>
            </div>
            <div className={styles.detailRow}>
              <ThemedText type="default">Rooms</ThemedText>
              <ThemedText type="defaultSemiBold">
                {getRoomDetailsString(liveBooking)}
              </ThemedText>
            </div>
          </div>
        </div>

        <div className={styles.qrCodeContainer}>
          <ThemedText type="subtitle" className={styles.qrTitle}>
            Your Ticket QR Code
          </ThemedText>
          <div className={styles.qrCodeBox}>
            <QRCode
              value={confirmationNumber}
              size={180}
              bgColor="var(--qr-bg, #FFFFFF)"
              fgColor="var(--qr-fg, #000000)"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
