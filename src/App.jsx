import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landing_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/payment_page";
import Layout from "./components/layouts/Layout";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/myTrips/TripPage";
import Complaint from "./pages/SendComplaint";
import { ThemeProvider } from "./context/ThemeProvider";
import AuthLayout from "./components/layouts/AuthLayout";
import LoginPage from "./pages/auth/Login";
function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/trip-details" element={<TripDetails />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/mytrips" element={<MyTrips />} />
              <Route path="/complaint" element={<Complaint />} />
            </Route>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<h1>hello Register</h1>} />
            </Route>
            <Route path="*" element={<h1>hello login</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
