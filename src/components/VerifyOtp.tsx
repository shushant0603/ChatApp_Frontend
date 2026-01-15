import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, sendOtp } from "../api/Auth/auth.routes";

type MessageType = "success" | "error";

const RESEND_TIME = 20; // seconds

const VerifyOtp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType | null>(null);
  const [loading, setLoading] = useState(false);

  const [counter, setCounter] = useState(RESEND_TIME);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 🔐 SEND OTP ON PAGE LOAD
  useEffect(() => {
    if (!email) {
      navigate("/register");
      return;
    }

    sendOtp(email);
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email, navigate]);

  // ⏱️ START TIMER
  const startTimer = () => {
    setCounter(RESEND_TIME);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("OTP is required");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp(email, otp);
      setMessage(response.data.message || "OTP verified 🎉");
      setMessageType("success");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message || "Invalid or expired OTP"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND OTP
  const handleResendOtp = async () => {
    if (counter !== 0) return;

    try {
      await sendOtp(email);
      setMessage("OTP resent 📩");
      setMessageType("success");
      startTimer();
    } catch {
      setMessage("Failed to resend OTP");
      setMessageType("error");
    }
  };

  // 🔥 AUTO HIDE MESSAGE
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 2000);
    return () => clearTimeout(t);
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      {/* Toast Message */}
      {message && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50
          ${messageType === "success"
              ? "bg-green-500 text-black"
              : "bg-red-500 text-white"
            }`}
        >
          {message}
        </div>
      )}

      {/* Main Card */}
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
        <h2 className="text-3xl font-bold text-center mb-2 text-sky-400">
          Verify OTP
        </h2>

        <p className="text-slate-400 text-center mb-6 text-sm">
          Enter the code sent to <br />
          <span className="text-white font-medium">{email}</span>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700
          focus:border-sky-400 focus:ring-1 focus:ring-sky-400 outline-none
          text-center tracking-[0.5em] text-xl font-bold transition-all"
          value={otp}
          maxLength={6}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setOtp(e.target.value);
            }
          }}
        />

        <button
          onClick={handleVerifyOtp}
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg font-bold text-lg transition-all
            ${
              loading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-sky-400 text-slate-900 hover:bg-sky-300 active:scale-[0.98]"
            }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* 🔁 RESEND OTP SECTION */}
        <div className="text-center mt-6">
          <button
            onClick={handleResendOtp}
            disabled={counter !== 0}
            className={`text-sm font-medium transition-all duration-300
              ${
                counter === 0
                  ? "text-sky-400 hover:text-sky-300 hover:underline cursor-pointer"
                  : "text-slate-500 cursor-not-allowed"
              }`}
          >
            {counter === 0
              ? "Resend OTP"
              : `Resend OTP in ${counter}s`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
