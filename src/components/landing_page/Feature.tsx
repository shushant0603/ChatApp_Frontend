import React from "react";
import { FaVideo, FaClock, FaShieldAlt } from "react-icons/fa";

const Feature: React.FC = () => {
  return (
    <section className="w-full min-h-[50vh] flex flex-col justify-center items-center px-4 py-12">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
        Features for a better experience
      </h2>

      {/* Features */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <FaVideo className="text-orange-500 text-xl" />
          </div>
          <h3 className="font-semibold text-lg">Video messaging</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            This software is very easy for you to manage. You can use it as you wish.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <FaClock className="text-green-500 text-xl" />
          </div>
          <h3 className="font-semibold text-lg">Save your time</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            This software is very easy for you to manage. You can use it as you wish.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
            <FaShieldAlt className="text-orange-400 text-xl" />
          </div>
          <h3 className="font-semibold text-lg">Keep safe & private</h3>
          <p className="text-gray-500 text-sm max-w-xs">
            This software is very easy for you to manage. You can use it as you wish.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Feature;
