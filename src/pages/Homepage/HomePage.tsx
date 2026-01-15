import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../../api/Auth/user.routes";
import FriendSuggestion from "./FriendSuggestion";

type User = {
  id: string;
  name: string;
  email: string;
};

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMe = async () => {
    try {
      const response = await me();
      console.log("me() response:", response);
      setUser(response.data.user);
    } catch (error: any) {
      console.error("me() failed", error);
    setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 👤 PROFILE CARD */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-sky-400 mb-4">My Profile</h2>

          <div className="space-y-3">
            <div>
              <p className="text-slate-400 text-sm">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full border border-red-500 text-red-400 py-2 rounded-lg hover:bg-red-500 hover:text-black transition"
          >
            Logout
          </button>
        </div>

        {/* 👥 FRIEND SUGGESTIONS */}
        <div className="md:col-span-2">
          <FriendSuggestion />
        </div>

      </div>
    </div>
  );
};

export default HomePage;
