import { useEffect, useState } from "react";
import dayjs from "dayjs";
import supabase from "../../utils/supabase";

export default function UserChatList({ userId, onSelectChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("support_chats")
      .select("id, status, last_message_text, last_message_at")
      .eq("user_id", userId)
      .order("last_message_at", { ascending: false });

    if (error) console.error(error);
    else setChats(data || []);

    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  if (loading) return <div className="p-4">Loading chats...</div>;

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">My Chats</h2>
      {chats.length === 0 ? (
        <div className="text-gray-500">No chats yet.</div>
      ) : (
        chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-50"
          >
            <div className="text-sm font-semibold">
              Status: <span className="capitalize">{chat.status}</span>
            </div>
            <div className="text-xs text-gray-600 truncate">
              {chat.last_message_text || "No messages yet"}
            </div>
            <div className="text-xs text-gray-400">
              {chat.last_message_at
                ? dayjs(chat.last_message_at).format("MMM D, h:mm A")
                : ""}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
