import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import ChatWidget from "../Chatcomponent/ChatWidget";

export default function Layout() {
  return (
    <div>
      <Header></Header>
      <Outlet />
      <ChatWidget />
      <Footer />
    </div>
  );
}
