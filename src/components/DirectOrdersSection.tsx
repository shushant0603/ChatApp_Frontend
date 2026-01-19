import { FiMessageCircle, FiMail } from "react-icons/fi";
import { FaFacebookMessenger } from "react-icons/fa";

const DirectOrdersSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 px-6 py-14 md:py-24">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT – INBOX CARD */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-5">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  🔥
                </div>
                <span className="font-semibold text-gray-800">Inbox</span>
              </div>
              <div className="flex gap-1">
                <span className="h-2 w-2 bg-gray-300 rounded-full" />
                <span className="h-2 w-2 bg-gray-300 rounded-full" />
                <span className="h-2 w-2 bg-gray-300 rounded-full" />
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3">
              <Message
                icon={<FiMessageCircle className="text-green-500" />}
                title="New Message"
                text="Hey Alex, are you free now?"
              />

              <Message
                icon={<FiMail className="text-red-500" />}
                title="New Email"
                text="Alex, your order replaced ID #45321"
              />

              <Message
                icon={<FaFacebookMessenger className="text-blue-500" />}
                title="Facebook Messenger"
                text="How can I see the tracking number?"
              />

              <Message
                icon={<FiMessageCircle className="text-green-500" />}
                title="New Message"
                text="How can I renew my subscription?"
              />
            </div>
          </div>

          {/* Floating avatars */}
          <img
            src="https://i.pravatar.cc/40?img=12"
            className="absolute -left-4 top-16 h-9 w-9 rounded-full border-2 border-white"
            alt=""
          />
          <img
            src="https://i.pravatar.cc/40?img=32"
            className="absolute -right-4 top-32 h-9 w-9 rounded-full border-2 border-white"
            alt=""
          />
          <img
            src="https://i.pravatar.cc/40?img=52"
            className="absolute left-10 -bottom-5 h-9 w-9 rounded-full border-2 border-white"
            alt=""
          />
        </div>

        {/* RIGHT – CONTENT */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Get direct orders <br className="hidden sm:block" />
            from your customers
          </h2>

          <p className="mt-5 text-gray-600 max-w-lg mx-auto lg:mx-0">
            Create custom landing pages with Rareblocks that converts more
            visitors than any website. With lots of unique blocks easily build
            a page. There are many variations of passages of available.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-10">
            <div>
              <p className="text-3xl font-bold text-gray-900">4.3K+</p>
              <p className="text-sm text-gray-500">Website’s Powering</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-gray-900">7M+</p>
              <p className="text-sm text-gray-500">Chats in Last 2022</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectOrdersSection;

/* Message Sub-block */
interface MessageProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const Message = ({ icon, title, text }: MessageProps) => (
  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
    <div className="h-9 w-9 bg-white rounded-full flex items-center justify-center shadow">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{text}</p>
    </div>
  </div>
);
