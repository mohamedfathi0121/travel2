import { useState } from "react";
import UserChatList from "../components/Chatcomponent/UserChatList";
import UserChatWindow from "../components/Chatcomponent/UserChatWindow";

export default function UserChatPage({ userId }) {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="p-6">
      {!selectedChat ? (
        <UserChatList userId={userId} onSelectChat={setSelectedChat} />
      ) : (
        <UserChatWindow
          chat={selectedChat}
          userId={userId}
          onBack={() => setSelectedChat(null)}
        />
      )}
    </div>
  );
}
