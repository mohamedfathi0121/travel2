import { useState } from "react";
import { FaComments, FaTimes, FaUser } from "react-icons/fa";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "admin", text: "Hey there! How can I help you today?" },
    { from: "user", text: "Hi! I’m looking to book something for August." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* زر الفتح/الإغلاق */}
     {!isOpen && (
  <button
    onClick={() => setIsOpen(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
  >
    <FaComments />
  </button>
)}


      {/* نافذة الدردشة */}
      {isOpen && (
        <div className="mt-2 w-[400px] h-[550px] bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-2xl flex flex-col">

          {/* الهيدر */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between items-center">
            <span className="font-bold">Chat with admin</span>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>

          {/* الرسائل */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* إدخال الرسالة */}
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
    