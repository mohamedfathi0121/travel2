import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import dayjs from "dayjs";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "admin",
      text: "Hey there! How can I help you today?",
      created_at: dayjs().subtract(1, "day").toISOString(),
    },
    {
      from: "user",
      text: "Hi! I’m looking to book something for August.",
      created_at: dayjs().subtract(1, "day").add(5, "minute").toISOString(),
    },
    {
      from: "admin",
      text: "Sure, I can help with that. What dates?",
      created_at: dayjs().toISOString(),
    },
  ]);

  const [hasMore, setHasMore] = useState(true);

  const handleSend = () => {
    if (input.trim()) {
      const newMsg = {
        from: "user",
        text: input.trim(),
        created_at: new Date().toISOString(),
      };
      setMessages([...messages, newMsg]);
      setInput("");
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, msg) => {
      const date = dayjs(msg.created_at).format("YYYY-MM-DD");
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
      return groups;
    }, {});
  };

  const loadMoreMessages = () => {
    // Simulate older message loading
    const older = [
      {
        from: "admin",
        text: "This is an older message.",
        created_at: dayjs().subtract(6, "day").toISOString(),
      },
    ];
    setMessages([...older, ...messages]);
    setHasMore(false); // simulate no more messages after this
  };

  const grouped = groupMessagesByDate(messages);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
        >
          <FaComments />
        </button>
      )}

      {isOpen && (
        <div className="mt-2 w-[400px] h-[550px] bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <span className="font-bold">Chat with Admin</span>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto text-sm">
            {hasMore && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={loadMoreMessages}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Load More
                </button>
              </div>
            )}

            {Object.entries(grouped).map(([date, msgs]) => (
              <div key={date} >
                <div className="text-center text-xs  text-gray-500 mb-2">
                  {dayjs(date).format("dddd, MMMM D")}
                </div>
                {msgs.map((msg, i) => (
                  <div
                    key={`${msg.created_at}-${i}`}
                    className={`flex ${
                      msg.from === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-3 py-2 mb-4 rounded-lg max-w-xs ${
                        msg.from === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white"
                      }`}
                    >
                      <div>{msg.text}</div>
                      <div className={`text-xs mt-1 text-right ${
                        msg.from === "user"
                          ?  "text-white"
                          : " text-gray-800  dark:text-white"
                      }`}>
                        {dayjs(msg.created_at).format("h:mm A")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t dark:border-gray-700 p-2 flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring
              text-gray-900 dark:text-white bg-background dark:bg-gray-800"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 rounded text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
