import "./App.css";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/landing_page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentPage from "./pages/payment_page";
<<<<<<< HEAD
import Layout from "./components/Layout";
=======
import Layout from "./components/layouts/Layout";
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/myTrips/TripPage";
import TripInfo from "./pages/TripInfo";
import Complaint from "./pages/SendComplaint";
import { ThemeProvider } from "./context/ThemeProvider";
<<<<<<< HEAD
import AllTrips from "./pages/AllTrips";


=======
import AuthLayout from "./components/layouts/AuthLayout";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import VrPlayer from "./components/TripDeatailsComponents/VrPlayer";
import { AuthProvider } from "./context/AuthContext";
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
function App() {
  return (
    <>
      <ThemeProvider>
<<<<<<< HEAD
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="/trip-details" element={<TripDetails />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/mytrips" element={<MyTrips />} />
              <Route path="/complaint" element={<Complaint />} />
              <Route path="/trips" element={<AllTrips />} />
             
              
             
            </Route>
          </Routes>
        </BrowserRouter>
=======
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
>>>>>>> 8d6b443a2d2354c2700dc0d259df5f3510edf52c
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;