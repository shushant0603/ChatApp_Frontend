type Props = {
  isMine: boolean;
  content: string;
  senderName?: string;
  createdAt?: string;
};

const MessageBubble = ({ isMine, content, senderName, createdAt }: Props) => {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] sm:max-w-[60%] px-4 py-2 rounded-2xl shadow
        ${isMine
          ? "bg-blue-500 text-white rounded-br-sm"
          : "bg-white text-gray-800 rounded-bl-sm"}`}
      >
        {!isMine && (
          <p className="text-xs font-semibold text-gray-500 mb-1">
            {senderName || "User"}
          </p>
        )}

        <p className="break-words text-sm">{content}</p>

        {createdAt && (
          <p className="text-[10px] text-right opacity-70 mt-1">
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
