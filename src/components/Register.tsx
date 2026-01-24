import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { register } from "../api/Auth/auth.routes";

type MessageType = "success" | "error";

const Register: React.FC = () => {
   const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<MessageType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);

    try {
      const response = await register(name, email, password);

      setMessage(response.data.message || "Registration successful 🎉");
      setMessageType("success");

       setName("");
       setEmail("");
       setPassword("");
      setTimeout(() => {
     navigate("/verify-otp", {
      state: {
       email: response.data.email || email,
     },
   });
   }, 1500);

    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(
        err?.response?.data?.message ||
          "Registration failed , Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 auto-hide popup
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
      setMessageType(null);
  
    }, 2000);

    return () => clearTimeout(timer);
  }, [message]);

return (
  <div className="min-h-screen flex items-center justify-center bg-white relative">
    {/* Popup Message */}
    {message && (
      <div
        className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg
          ${
            messageType === "success"
              ? "bg-orange-500 text-white"
              : "bg-red-500 text-white"
          }`}
      >
        {message}
      </div>
    )}

    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-orange-500">
        Create Account
      </h2>

      {/* form */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300
          focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              loading
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-orange-500 hover:bg-orange-400 text-white"
            }`}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </div>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-orange-500 hover:text-orange-400 font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  </div>
);

};

export default Register;
