import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from './pages/landing_page'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PaymentPage from "./pages/payment_page";
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </HelmetProvider>
  );
}

export default App;
