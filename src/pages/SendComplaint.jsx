import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const SendComplaint = ({ userId }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [complaintType, setComplaintType] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(`
          id,
          trip_schedules (
            date,
            base_trips (
              company_id,
              companies ( id, name, email )
            )
          )
        `)
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching bookings:", error);
        return;
      }

      const today = new Date();
      const completed = bookings.filter((b) => {
        const date = new Date(b.trip_schedules?.date);
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
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedEmail) return alert("Please select a company.");

    const fullMessage = `Complaint Type: ${complaintType}\n\n${message}`;
    const mailto = `mailto:${selectedEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(fullMessage)}`;

    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl bg-input p-8 rounded-md shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">Send Complaint</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Select Company */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Select Company
            </label>
            <select
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm focus:outline-none"
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              required
            >
              <option value="" disabled>-- Choose a company --</option>
              {companies.map((c) => (
                <option key={c.id} value={c.email}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Complaint Type */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Complaint Type
            </label>
            <select
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm focus:outline-none"
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              required
            >
              <option value="" disabled>Select Complaint Type</option>
              <option value="Technical">Technical</option>
              <option value="Billing">Billing</option>
              <option value="Service">Service</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Subject
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Message
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm"
              placeholder="Write your complaint here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-button-primary text-buttonPrimaryText rounded-full hover:bg-button-primary-hover transition-all duration-200"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendComplaint;
