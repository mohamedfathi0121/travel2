import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landing_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/payment_page";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/TripPage";
import TripInfo from "./pages/TripInfo";
import Layout from "./components/layouts/Layout";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import VrPlayer from "./components/TripDeatailsComponents/VrPlayer";
import { AuthProvider } from "./context/AuthContext";
import AllTrips from "./pages/AllTrips";
import TripPage from "./pages/TripPage";
import SendComplaint from "./pages/SendComplaint";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProtectedRoute from "./routes/ProtectedRoutes";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/vrplayer" element={<VrPlayer />} />

              <Route path="/trips" element={<AllTrips />} />
              <Route path="/trips/:tripId/" element={<TripDetails />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/mytrips" element={<TripPage />} />
                <Route path="/complaint" element={<SendComplaint />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/review/:tripId" element={<TripInfo />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      <Toaster
        position="top-center"
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "var(--color-background)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-input)",
          },
          success: {
            style: {
              background: "var(--color-background)",
              color: "var(--color-text-primary)",
              border: "2px solid #10B981", // Success green color
            },
            iconTheme: {
              primary: "#10B981", // Success green color
              secondary: "white",
            },
          },
          error: {
            style: {
              background: "var(--color-background)",
              color: "var(--color-text-primary)",
              border: "2px solid #EF4444", // Error red color
            },
            iconTheme: {
              primary: "#EF4444", // Error red color
              secondary: "white",
            },
          },
        }}
      />
    </>
  );
}

export default App;
