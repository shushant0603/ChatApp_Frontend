import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-[#FF9A00] hover:opacity-90 transition"
          >
            Apex
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-gray-900 font-medium transition"
          >
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-orange-500 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold mb-1">Get Started</h2>
            <p className="text-sm opacity-90">
              Create your account to start chatting with customers
            </p>
          </div>

          {/* Form */}
          <form className="px-8 py-6 space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
            >
              Create Account
              <FiArrowRight />
            </button>

            {/* Terms */}
            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{" "}
              <span className="text-orange-500 hover:underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-orange-500 hover:underline cursor-pointer">
                Privacy Policy
              </span>
            </p>

            {/* Login */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;
