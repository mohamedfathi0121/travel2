import "./App.css";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/landing_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/payment_page";
import Layout from "./components/Layout";
import TripDetails from "./pages/TripDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/trip-details" element={<TripDetails />} />
            <Route path="/payment" element={<PaymentPage />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Toaster />
      
    </>
  );
}

export default App;