import "./App.css";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import TripDetails from "./pages/TripDetails";

function App() {
  return (
    <>
      <TripDetails></TripDetails>
      <Toaster />
    </>
  );
}

export default App;
