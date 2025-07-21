import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import ChatWidget from "../Chatcomponent/ChatWidget";
import { useAuth } from "../../hooks/useAuth";

export default function Layout() {
  const { user } = useAuth();

  return (
    <div>
      <Header></Header>
      <Outlet />
      {user && (
        <ChatWidget userId={user.id} role="user" />
      )}
      <Footer />
    </div>
  );
}
