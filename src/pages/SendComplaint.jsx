import React from "react";
import { Helmet } from "react-helmet";

const SendComplaint = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Helmet>
        <title>Send Complaint</title>
      </Helmet>

      <div className="w-full h-full bg-white p-8 rounded-md shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Send Complaint
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Type
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Complaint Type</option>
              <option>Technical</option>
              <option>Billing</option>
              <option>Service</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Details
            </label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your complaint here..."
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200"
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
