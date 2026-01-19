import { HiArrowRight } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import girlPhoto from '../assets/girl_photo.png';

export default function Hero() {
  return (
    <section className="pt-32 pb-12 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className=" font-sans text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Start chatting with customers, anytime, anywhere with Apex
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              Great software that allows you to chat from any <br /> place at any time
              without any interruption.
            </p>

            <div className="mb-12">
              <button className="bg-apex-orange text-white px-6 py-3 rounded font-medium flex items-center gap-2 bg-orange-500 transition">
                Start Chatting Now
                <HiArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              {/* Customer Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                      alt="Customer 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                      alt="Customer 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                      alt="Customer 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-gray-900">2,291</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 sm:pl-8 sm:border-l border-gray-200">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? "text-apex-orange" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">4.8/5</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative mt-12 lg:mt-0">
            <div className="relative">
              {/* Main Hero Image */}
              <div className="relative z-10">
                <img
                  src={girlPhoto}
                  alt="Woman with phone"
                  className="w-full "
                />
              </div>

              {/* Chat Card 1 */}
              <div className="absolute top-16 right-4 lg:right-0 bg-white rounded-lg shadow-lg p-4 w-64 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
                      alt="Jenny Wilson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Jenny Wilson
                    </p>
                    <p className="text-xs text-gray-500">@jennyrondon</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Do
                  you have any cool idea?
                </p>
              </div>

              {/* Chat Card 2 */}
              <div className="absolute bottom-20 left-4 lg:left-0 bg-white rounded-lg shadow-lg p-4 w-64 z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
                      alt="Ronald Richards"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Ronald Richards
                    </p>
                    <p className="text-xs text-gray-500">@ronaldrichard</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  any cool idea?
                </p>
              </div>

              {/* Accent Glow */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-300 rounded-full blur-3xl opacity-60 z-0"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

