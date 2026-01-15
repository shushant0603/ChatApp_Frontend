import MessageBubble from "./MessageBubble";
import { useEffect, useRef } from "react";

type MessageType = {
  id?: string;
  senderId: string;
  content: string;
  createdAt?: string;
};

type Props = {
  messages: MessageType[];
  currentUserId: string;
  loading: boolean;
};

const MessageList = ({ messages, currentUserId, loading }: Props) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading messages...</p>;
  }

  if (!messages.length) {
    return <p className="text-center text-gray-400">No messages yet</p>;
  }

  return (
    <>
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id || index}
          isMine={msg.senderId === currentUserId}
          content={msg.content}
          createdAt={msg.createdAt}
        />
      ))}
      <div ref={endRef} />
    </>
  );
};

export default MessageList;
