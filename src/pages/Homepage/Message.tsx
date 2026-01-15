import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { startChat, getChatMessages } from "../../api/chat/chat";
import socket, { connectSocket } from "../../api/socket";

type MessageType = {
  id?: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt?: string;
};

const Message = () => {
  const { receiverId } = useParams();
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  
  // ✅ Ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Auto-scroll function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get current user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.userId);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // 1️⃣ REST: get chatId
  useEffect(() => {
    if (!receiverId) return;

    const initChat = async () => {
      try {
        const res = await startChat(receiverId);
        setChatId(res.data.chatId);
      } catch (error) {
        console.error("Failed to start chat", error);
      }
    };

    initChat();
  }, [receiverId]);

  // 2️⃣ Load existing messages when chatId is ready
  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
      try {
        setLoading(true);
        const res = await getChatMessages(chatId);
        setMessages(res.data.messages || []);
      } catch (error) {
        console.error("Failed to load messages", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [chatId]);

  // 3️⃣ SOCKET: connect once + join + receive
  useEffect(() => {
    connectSocket();

    return () => {
      socket.disconnect();
    };
  }, []);

  // 4️⃣ Join room when chatId changes
  useEffect(() => {
    if (!chatId) return;

    socket.emit("join-chat", chatId);
    console.log("✅ Joined room:", chatId);

    const handleMessage = (message: MessageType) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [chatId]);

  // 5️⃣ SEND MESSAGE
  const sendMessage = () => {
    if (!text.trim() || !chatId) return;

    socket.emit("send-message", {
      chatId,
      text,
    });

    setText("");
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>

      {/* 💬 Messages Container */}
      <div className="border border-gray-300 rounded-lg h-[500px] overflow-y-auto mb-4 p-4 bg-gray-50 flex flex-col gap-2">
        {loading ? (
          <p className="text-center text-gray-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet. Start chatting!</p>
        ) : (
          <>
            {messages.map((msg, index) => {
              const isMyMessage = msg.senderId === currentUserId;

              return (
                <div
                  key={msg.id || index}
                  className={`flex mb-2 ${isMyMessage ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[60%] px-4 py-2 rounded-xl shadow-sm ${
                      isMyMessage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {/* Sender Name - only for other's messages */}
                    {!isMyMessage && (
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        Them
                      </div>
                    )}

                    {/* Message Content */}
                    <div className="break-words">{msg.content}</div>

                    {/* Timestamp */}
                    {msg.createdAt && (
                      <div className="text-[10px] mt-1 opacity-70 text-right">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {/* ✅ Invisible element at the end for auto-scroll */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* ✍️ Input Box */}
      <div className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={sendMessage}
          className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;