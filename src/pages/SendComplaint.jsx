import React from "react";
// import { Helmet } from "react-helmet";

const SendComplaint = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* <Helmet>
        <title>Send Complaint</title>
      </Helmet> */}

      <div className="w-full h-full bg-backgroun p-8 rounded-md shadow-md shadow-text-primary flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">
          Send Complaint
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Complaint Type
            </label>
            <select className="w-full px-4 py-2 border border-text-primary focus:ring-button-primary bg-input text-text-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-text-secondary">
              <option disabled>Select Complaint Type</option>
              <option value={"Technical"}>Technical</option>
              <option value={"Billing"}>Billing</option>
              <option value={"Service"}>Service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Complaint Details
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-text-primary text-text-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-button-primary bg-input"
              placeholder="Write your complaint here..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-button-primary text-background rounded-full hover:bg-button-primary-hover hover:shadow-md  transition-all duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendComplaint;
