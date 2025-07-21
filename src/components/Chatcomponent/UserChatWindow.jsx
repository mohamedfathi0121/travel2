import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import supabase from "../../utils/supabase";

export default function UserChatWindow({ chat, userId, onBack }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("chat_id", chat.id)
      .order("created_at", { ascending: true });

    if (error) console.error(error);
    else setMessages(data || []);
  };

  useEffect(() => {
    fetchMessages();
  }, [chat.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Real-time subscription
  useEffect(() => {
    if (chat.status === "closed") return; // No live updates for closed chats

    const channel = supabase
      .channel(`chat_${chat.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages", filter: `chat_id=eq.${chat.id}` },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [chat.id, chat.status]);

  const handleSend = async () => {
    if (!input.trim() || chat.status === "closed") return;
    const text = input.trim();
    setInput("");

    // Optimistic message
    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      sender_id: userId,
      message_text: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    const { error } = await supabase.functions.invoke("send-user-message", {
      body: { sender_id: userId, sender_role: "user", message_text: text },
    });

    if (error) {
      console.error(error);
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow flex flex-col h-[500px]">
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between">
        <span className="font-bold">
          Chat ({chat.status === "closed" ? "Closed" : "Active"})
        </span>
        <button onClick={onBack} className="text-sm underline">
          Back
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender_id === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg mb-2 max-w-xs ${
                msg.sender_id === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div>{msg.message_text}</div>
              <div className="text-xs text-right opacity-70">
                {dayjs(msg.created_at).format("h:mm A")}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {chat.status === "closed" ? (
        <div className="p-2 text-center text-gray-500 border-t">
          Chat is closed – read only
        </div>
      ) : (
        <div className="border-t p-2 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
          <button
            onClick={handleSend}
            className="ml-2 bg-blue-600 text-white px-3 rounded text-sm"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
