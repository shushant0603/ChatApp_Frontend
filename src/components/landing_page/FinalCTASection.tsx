import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const FinalCTASection: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 px-6 pt-20 pb-10">
      <div className="mx-auto max-w-7xl">
        
        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Ready to grow your business?
            <br />
            Start with Apex, become faster
            <br className="hidden sm:block" />
            every second
          </h2>

          <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition">
            Start Chatting Now
          </button>
        </div>

        {/* Divider */}
        <div className="mt-20 border-t border-gray-200" />

        {/* Footer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          
          {/* Left */}
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold text-orange-500">Apex</span>
            <nav className="hidden sm:flex gap-6">
              <a href="#" className="hover:text-gray-900">About</a>
              <a href="#" className="hover:text-gray-900">Features</a>
              <a href="#" className="hover:text-gray-900">Works</a>
              <a href="#" className="hover:text-gray-900">Support</a>
            </nav>
          </div>

          {/* Social */}
          <div className="flex gap-4 text-orange-500">
            <FaTwitter className="cursor-pointer hover:text-orange-600" />
            <FaFacebookF className="cursor-pointer hover:text-orange-600" />
            <FaInstagram className="cursor-pointer hover:text-orange-600" />
            <FaGithub className="cursor-pointer hover:text-orange-600" />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© Copyright 2022, All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FinalCTASection;
