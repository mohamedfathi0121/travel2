import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Header from "../components/header";
import Footer from "../components/footer";
export default function PaymentPage() {
  const [method, setMethod] = useState("PayPal");

  return (
    <div className="min-h-screen bg-white">
 
      <Helmet>
        <title>Payment - AdventureCo</title>
        <meta name="description" content="Secure and fast payment process with AdventureCo. Choose PayPal or Credit Card to complete your booking." />
      </Helmet>


      <Header />

     
      <div className="flex justify-center px-4 pt-12 pb-16">
        <div className="w-full max-w-2xl space-y-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PayPal"
                  checked={method === "PayPal"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span className="text-base font-medium text-gray-800">PayPal</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CreditCard"
                  checked={method === "CreditCard"}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <span className="text-base font-medium text-gray-800">Credit Card</span>
              </label>
            </div>
          </div>


          <form className="space-y-6 flex flex-col items-center">
            <div className="w-full max-w-md">
              <label className="text-sm font-medium text-gray-700 block mb-2">Card Number</label>
              <input
                type="text"
                placeholder="Enter card number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="w-full max-w-md">
              <label className="text-sm font-medium text-gray-700 block mb-2">Name on Card</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>

            <div className="w-full max-w-md">
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </div>
         <Footer/>
    </div>
  );
}
