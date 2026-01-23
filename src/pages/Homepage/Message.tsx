import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* ===============================
     🔐 GET CURRENT USER
  =============================== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(payload.userId);
  }, []);

  /* ===============================
     🔌 CONNECT SOCKET (ONCE)
  =============================== */
  useEffect(() => {
    connectSocket();
  }, []);

  /* ===============================
     📞 INCOMING VIDEO CALL (ONCE)
  =============================== */
  useEffect(() => {
    const handleIncomingCall = ({ chatId, from }) => {
      console.log("📞 Incoming call:", chatId);

      navigate(`/video/${chatId}`, {
        state: {
          isIncoming: true,
          callerId: from,
        },
      });
    };

    socket.on("incoming-video-call", handleIncomingCall);

    return () => {
      socket.off("incoming-video-call", handleIncomingCall);
    };
  }, [navigate]);

  /* ===============================
     🧠 INIT CHAT
  =============================== */
  useEffect(() => {
    if (!receiverId) return;

    startChat(receiverId)
      .then((res) => setChatId(res.data.chatId))
      .catch(console.error);
  }, [receiverId]);

  /* ===============================
     💬 LOAD MESSAGES
  =============================== */
  useEffect(() => {
    if (!chatId) return;

    setLoading(true);
    getChatMessages(chatId)
      .then((res) => setMessages(res.data.messages || []))
      .finally(() => setLoading(false));
  }, [chatId]);

  /* ===============================
     👥 JOIN ROOM + RECEIVE MESSAGE
  =============================== */
  useEffect(() => {
    if (!chatId) return;

    socket.emit("join-chat", chatId);

    const handleMessage = (msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handleMessage);

    return () => {
      socket.off("receive-message", handleMessage);
    };
  }, [chatId]);

  /* ===============================
     📤 SEND MESSAGE
  =============================== */
  const sendMessage = () => {
    if (!text.trim() || !chatId) return;

    socket.emit("send-message", { chatId, text });
    setText("");
  };

  /* ===============================
     📹 START VIDEO CALL (CALLER)
  =============================== */
  const handleVideoCall = () => {
    if (!chatId) return;

    socket.emit("start-video-call", { chatId });

    navigate(`/video/${chatId}`, {
      state: {
        isIncoming: false,
      },
    });
  };

  /* ===============================
     🖥 UI
  =============================== */
  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat</h2>

      <button
        onClick={handleVideoCall}
        className="mb-4 p-2 bg-green-500 text-white rounded-full"
      >
        📞 Video Call
      </button>

      <div className="h-[500px] overflow-y-auto border p-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={msg.senderId === currentUserId ? "text-right" : ""}>
            <div className="inline-block bg-white p-2 rounded mb-1">
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Message;
