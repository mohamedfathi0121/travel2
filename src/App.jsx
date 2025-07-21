import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landing_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/payment_page";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/myTrips/TripPage";
import TripInfo from "./pages/TripInfo";
import Complaint from "./pages/SendComplaint";
import { ThemeProvider } from "./context/ThemeProvider";
import AuthLayout from "./components/layouts/AuthLayout";
import Layout from "./components/layouts/Layout";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import VrPlayer from "./components/TripDeatailsComponents/VrPlayer";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <>
      <AuthProvider>
        {" "}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/trip-details/:tripId/" element={<TripDetails />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/vrplayer" element={<VrPlayer />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/mytrips" element={<MyTrips />} />
              <Route path="/complaint" element={<Complaint />} />
            </Route>
            <Route path="/" element={<AuthLayout />}></Route>
            <Route path="/review" element={<TripInfo />} />
            <Route path="*" element={<h1>hello login</h1>} />
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
      <ThemeProvider>
        <AuthProvider>
          {" "}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route
                  path="/trip-details/:tripId/"
                  element={<TripDetails />}
                />
                <Route path="/vrplayer" element={<VrPlayer />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/mytrips" element={<MyTrips />} />
                <Route path="/tripinfo/:id" element={<TripInfo />} />
                <Route path="/complaint" element={<Complaint />} />
              </Route>
              <Route path="/" element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              <Route path="*" element={<h1>hello login</h1>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
