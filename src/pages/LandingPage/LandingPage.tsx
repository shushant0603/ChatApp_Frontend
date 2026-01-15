import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-sky-400">MyApp</h1>

        <div className="space-x-6">
          <Link
            to="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-sky-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-sky-300 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-6 h-[80vh]">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Build Fast & Secure
          <span className="text-sky-400"> Web Apps</span>
        </h2>

        <p className="mt-6 max-w-xl text-slate-400 text-lg">
          A modern MERN stack application powered by TypeScript, React,
          Prisma, and secure authentication.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/register"
            className="bg-sky-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-sky-300 transition"
          >
            Start Free
          </Link>
          <Link
            to="/login"
            className="border border-slate-600 px-6 py-3 rounded-xl hover:border-sky-400 transition"
          >
            Login
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-slate-500 py-6 border-t border-slate-800">
        © 2026 MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
