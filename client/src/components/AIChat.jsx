import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi 👋 I am your Library AI. Ask me anything!" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userInput },
    ]);

    setInput("");
    setLoading(true);

    try {

      console.log("Sending:", userInput);

      const res = await axios.post(
        "http://localhost:4000/api/v1/ai/chat",
        {
          message: userInput,
        }
      );

      console.log("FULL RESPONSE:", res.data);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.reply || "No reply received",
        },
      ]);

    } catch (error) {

      console.log("AXIOS ERROR:", error);

      if (error.response) {
        console.log("ERROR DATA:", error.response.data);
        console.log("ERROR STATUS:", error.response.status);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ AI Failed",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ml-64 flex flex-col h-screen p-6">

      <h1 className="text-2xl font-bold mb-4 text-black">
        🤖 AI Assistant
      </h1>

      <div className="glass flex-1 overflow-y-auto p-4 rounded-xl space-y-4">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-500 text-black"
                : "bg-white/10 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="text-gray-400">
            AI is typing...
          </div>
        )}

        <div ref={chatRef}></div>
      </div>

      <div className="flex gap-3 mt-4">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-2 rounded-lg text-black"
        />

        <button
          onClick={sendMessage}
          className="px-6 py-2 bg-purple-500 rounded-lg text-white"
        >
          Send
        </button>

      </div>
    </div>
  );
};

export default AIChat;