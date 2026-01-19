import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl font-bold text-orange-500 hover:opacity-90 transition"
          >
            Apex
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-orange-500 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold mb-1">Welcome Back</h2>
            <p className="text-sm opacity-90">
              Login to your Apex account to continue
            </p>
          </div>

          {/* Form */}
          <form className="px-8 py-6 space-y-5">
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
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-orange-500 hover:underline"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={18} />
                  ) : (
                    <AiOutlineEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">Remember me</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition"
            >
              Sign In to Apex
              <FiArrowRight />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full border border-gray-300 py-3 rounded-md font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>

            {/* Signup */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign up free
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
