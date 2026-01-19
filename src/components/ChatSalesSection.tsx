import { FiSend, FiCheck, FiX } from "react-icons/fi";

const ChatSalesSection: React.FC = () => {
  return (
    <section className="w-full bg-white px-6 py-14 md:py-24">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Start selling directly <br className="hidden sm:block" />
            inside conversations
          </h1>

          <p className="mt-5 text-gray-600 max-w-lg mx-auto lg:mx-0">
            There are many variations of passages of Lorem Ipsum available,
            but the majority have suffered all injected humour or randomised
            words which don’t look even slightly believable.
          </p>

          <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition">
            Start Chatting Now
          </button>
        </div>

        {/* RIGHT CHAT UI */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl p-5">
            
            {/* Message 1 */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src="https://i.pravatar.cc/40?img=32"
                className="h-9 w-9 rounded-full"
                alt=""
              />
              <div className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800">
                Hello! My name is Alex, <br /> how can I help you?
              </div>
            </div>

            {/* Message 2 */}
            <div className="flex items-start gap-3 justify-end mb-4">
              <div className="bg-orange-500 text-white rounded-xl px-4 py-2 text-sm max-w-[80%]">
                Hi! Julia here, I have a few questions I would love to ask you,
                if that is ok.
              </div>
              <img
                src="https://i.pravatar.cc/40?img=47"
                className="h-9 w-9 rounded-full"
                alt=""
              />
            </div>

            {/* Message 3 */}
            <div className="flex items-start gap-3 mb-4">
              <img
                src="https://i.pravatar.cc/40?img=32"
                className="h-9 w-9 rounded-full"
                alt=""
              />
              <div className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-800">
                Nice to meet you, Julia!
              </div>
            </div>

            {/* Typing */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>

            {/* Input */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Write your reply..."
                className="flex-1 px-4 py-2 text-sm outline-none"
              />
              <button className="bg-gray-100 px-4 py-2">
                <FiSend />
              </button>
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className="absolute -right-6 top-10 hidden md:block bg-white rounded-xl shadow-lg p-4 w-48">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?img=32"
                className="h-10 w-10 rounded-full"
                alt=""
              />
              <div>
                <p className="text-sm font-semibold">Alex Smith</p>
                <p className="text-xs text-gray-500">Project Manager</p>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button className="p-2 bg-green-500 text-white rounded-full">
                <FiCheck />
              </button>
              <button className="p-2 bg-red-500 text-white rounded-full">
                <FiX />
              </button>
            </div>
          </div>

          {/* POLL CARD */}
          <div className="absolute -bottom-10 left-0 hidden md:block bg-teal-500 text-white rounded-xl p-4 w-64 shadow-lg">
            <p className="text-sm mb-3">
              Will we have daily calls for every projects?
            </p>

            <div className="mb-2">
              <div className="flex justify-between text-xs">
                <span>Yes</span>
                <span>65%</span>
              </div>
              <div className="h-2 bg-white/30 rounded">
                <div className="h-2 bg-white rounded w-[65%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs">
                <span>No</span>
                <span>35%</span>
              </div>
              <div className="h-2 bg-white/30 rounded">
                <div className="h-2 bg-white rounded w-[35%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSalesSection;
