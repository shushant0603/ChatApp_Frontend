type Props = {
  text: string;
  setText: (v: string) => void;
  onSend: () => void;
};

const MessageInput = ({ text, setText, onSend }: Props) => {
  return (
    <div className="flex items-center gap-3 p-3 border-t bg-white">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="Type a message…"
        className="flex-1 px-4 py-3 rounded-full border outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />
      <button
        onClick={onSend}
        className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
