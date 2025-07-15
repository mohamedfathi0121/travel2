import React, { useState } from "react";


const companies = [
  { id: 1, name: "Sky Travel", email: "contact@skytravel.com" },
  { id: 2, name: "Dream Tours", email: "support@dreamtours.com" },
  { id: 3, name: "AdventureX", email: "hello@adventurex.com" },
];

const SendComplaint = () => {
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = companies.find((c) => c.id === parseInt(company));
    if (!selected) return alert("Please select a company.");

    const mailto = `mailto:${selected.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl bg-input p-8 rounded-md  shadow-text-primary flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">
          Send Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Select Company
            </label>
            <select
              className="w-full px-4 py-2 border border-text-primary bg-background text-text-primary rounded-md shadow-sm focus:outline-none"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Choose a company --
              </option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

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
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-button-primary text-button-primary rounded-full hover:bg-button-primary-hover transition-all duration-200"
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
