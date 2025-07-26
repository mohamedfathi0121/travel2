import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../utils/supabaseClient";
import toast from "react-hot-toast";

// ✅ Validation Schema
const complaintSchema = z.object({
  selectedEmail: z
    .string()
    .min(1, "Please select a company.")
    .email("Invalid email format."),
  complaintType: z.enum(["Technical", "Billing", "Service"], {
    required_error: "Please select a complaint type.",
  }),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters.")
    .max(100, "Subject must be less than 100 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be less than 500 characters."),
});

const SendComplaint = () => {
  const user = { id: "a6092e3b-e4c0-46d3-a696-029fc032daa4" };
  const [companies, setCompanies] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      selectedEmail: "",
      complaintType: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(
          `trip_schedules (end_date,
            base_trips (
              companies (id, c_name, contact_email)
            )
          )`
        )
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }

      const today = new Date();
      const completed = bookings.filter(b => {
        const date = new Date(b.trip_schedules?.end_date);
        return date < today;
      });

      const unique = [];
      const ids = new Set();

      for (const b of completed) {
        const company = b.trip_schedules?.base_trips?.companies;
        if (company && !ids.has(company.id)) {
          unique.push(company);
          ids.add(company.id);
        }
      }

      setCompanies(unique);
    };

    fetchCompanies();
  }, [user.id]);

  // ✅ Submit Function (Uses Supabase Invoke)
  const onSubmit = async data => {
    console.log(
      data.selectedEmail,
      data.complaintType,
      data.subject,
      data.message
    );
    try {
      toast.loading("Sending complaint...", { id: "sendComplaint" });

      const { error } = await supabase.functions.invoke("send-complaint", {
        body: {
          from: "onboarding@resend.dev", // must be verified in Resend
          to: "mohamedfathinew2023@gmail.com",
          subject: data.subject,
          message: `Complaint Type: ${data.complaintType}\n\n${data.message}`,
          reply_to: "mofathi0121@gmail.com",
        },
      });

      if (error) throw error;

      toast.success("Complaint email sent successfully!", {
        id: "sendComplaint",
      });
      reset();
    } catch (err) {
      console.error("Error sending complaint:", err);
      toast.error("Failed to send complaint!", { id: "sendComplaint" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl bg-input p-8 rounded-md shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">
          Send Complaint
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Select Company */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Select Company
            </label>
            <select
              {...register("selectedEmail")}
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm focus:outline-none"
            >
              <option value="">-- Choose a company --</option>
              {companies.map(c => (
                <option key={c.id} value={c.contact_email}>
                  {c.c_name}
                </option>
              ))}
            </select>
            {errors.selectedEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.selectedEmail.message}
              </p>
            )}
          </div>

          {/* Complaint Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Complaint Type
            </label>
            <select
              {...register("complaintType")}
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm focus:outline-none"
            >
              <option value="">Select Complaint Type</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Service">Service</option>
            </select>
            {errors.complaintType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.complaintType.message}
              </p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Subject
            </label>
            <input
              type="text"
              {...register("subject")}
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Message
            </label>
            <textarea
              rows="4"
              {...register("message")}
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm"
              placeholder="Write your complaint here..."
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-button-primary text-buttonPrimaryText hover:bg-button-primary-hover"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendComplaint;
