import { FiRefreshCw, FiVideo, FiThumbsUp } from "react-icons/fi";
import { HiPhoneMissedCall } from "react-icons/hi";
import photo_1 from '../../assets/photo_1.png';

const VideoChatHero: React.FC = () => {
  return (
    <div className="w-full bg-gray-100 px-6 py-10 md:py-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-25 items-center">
        
        {/* Left: Video Card */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={photo_1}
            alt="Video chat"
            className="w-full h-full object-cover"
          />

          {/* Video Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 rounded-sm backdrop-blur-md px-6 py-3  flex items-center gap-6 text-white">
            <FiRefreshCw size={20} className="cursor-pointer hover:text-gray-300" />
            <FiVideo size={20} className="cursor-pointer hover:text-gray-300" />
            <div className="bg-red-500 p-3 rounded-full">
              <HiPhoneMissedCall size={20} />
            </div>
            <FiThumbsUp size={20} className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Meet your customers, <br />
            with live video chat
          </h1>

          <p className="mt-4 text-gray-600 max-w-md mx-auto md:mx-0">
            Proin faucibus nibh et sagittis a. Lacinia purus ac amet pellentesque
            aliquam enim.
          </p>

          <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto md:mx-0">
            Get paychecks up to two days early. Get a $20 bonus when you receive
            qualifying direct deposits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoChatHero;
