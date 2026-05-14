import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Send,
  Mic,
  Bot,
  User,
} from "lucide-react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi 👋 I am your Library AI Assistant.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ================= SEND MESSAGE =================

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userInput,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://libmatrix.onrender.com/api/v1/ai/chat",
        {
          message: userInput,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            res.data.reply ||
            "No response from AI",
        },
      ]);
    } catch (error) {
      console.log(error);

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

  // ================= ENTER KEY =================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // ================= VOICE =================

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Speech Recognition not supported"
      );
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="ml-64 h-screen bg-[#0f172a] text-white flex flex-col">

      {/* HEADER */}

      <div className="border-b border-white/10 p-4 flex items-center gap-3 bg-[#111827]">

        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center">
          <Bot size={26} />
        </div>

        <div>
          <h1 className="text-xl font-bold">
            Library AI
          </h1>

          <p className="text-sm text-gray-400">
            ChatGPT Style Assistant
          </p>
        </div>
      </div>

      {/* CHAT AREA */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[75%] ${
                msg.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              {/* ICON */}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-blue-500"
                    : "bg-purple-600"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={18} />
                ) : (
                  <Bot size={18} />
                )}
              </div>

              {/* MESSAGE */}

              <div
                className={`px-4 py-3 rounded-2xl text-sm leading-7 shadow-lg ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-[#1e293b] text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {/* LOADING */}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Bot size={18} />
            </div>

            <div className="bg-[#1e293b] px-4 py-3 rounded-2xl">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={chatRef}></div>
      </div>

      {/* INPUT AREA */}

      <div className="p-5 border-t border-white/10 bg-[#111827]">

        <div className="flex items-center gap-3 bg-[#1e293b] rounded-2xl px-4 py-3">

          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Message AI Assistant..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          />

          {/* MIC BUTTON */}

          <button
            onClick={startListening}
            className={`p-2 rounded-full transition ${
              listening
                ? "bg-red-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            <Mic size={20} />
          </button>

          {/* SEND BUTTON */}

          <button
            onClick={sendMessage}
            className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;