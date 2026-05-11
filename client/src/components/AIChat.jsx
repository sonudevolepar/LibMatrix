import React, { useState } from "react";
import axios from "axios";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I am your Library AI. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setInput("");

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/ai/chat",
        { message: input }
      );

      const aiMessage = {
        role: "ai",
        text: res.data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ AI Error. Try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen flex flex-col">
      
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">🤖 AI Assistant</h1>

      {/* Chat Box */}
      <div className="flex-1 bg-white rounded-xl shadow p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[70%] ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 text-sm">AI is typing...</p>
        )}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-6 rounded-lg hover:bg-gray-800"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;