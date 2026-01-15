import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/Auth/user.routes";
import {
  sendFriendRequest,
  getReceivedRequests,
  acceptFriendRequest,
  // rejectFriendRequest,
  getAllFriends
} from "../../api/friends/friend.routes";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
};

type ReceivedRequest = {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
};

const FriendSuggestions: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<ReceivedRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<User[]>([]);
  const navigate = useNavigate();


  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.users);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReceivedRequests = async () => {
    try {
      const res = await getReceivedRequests();
      setReceivedRequests(res.data.requests);
    } catch (error) {
      console.error("Failed to fetch received requests", error);
    }
  };
  const fetchallfriends = async () => {
    try {
      const res = await getAllFriends();
      console.log("All friends:", res.data.friends);
      setFriends(res.data.friends);
    } catch (error) {
      console.error("Failed to fetch all friends", error);
    }

}

  useEffect(() => {
    fetchUsers();
    fetchReceivedRequests();
    fetchallfriends();
  }, []);

  // 🔹 SEND FRIEND REQUEST
  const handleAddFriend = async (userId: string) => {
    try {
      const res = await sendFriendRequest(userId);
      console.log(res.data.message);

      // optional UX improvement
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (error) {
      console.error("Failed to send friend request", error);
    }
  };

  // 🔹 ACCEPT REQUEST (logic tum baad me add karoge)
  const handleAcceptRequest = async (senderId: string) => {
    try {
        const res=await acceptFriendRequest(senderId);
        console.log(res.data.message);
    } catch (error) {
        console.error("Failed to accept friend request", error);
        
    }


    

    // await acceptFriendRequest(senderId);

    setReceivedRequests(prev =>
      prev.filter(req => req.sender.id !== senderId)
    );
  };

  // 🔹 REJECT REQUEST (logic tum baad me add karoge)
  const handleRejectRequest = async (senderId: string) => {
    console.log("Reject request from:", senderId);

    // await rejectFriendRequest(senderId);

    setReceivedRequests(prev =>
      prev.filter(req => req.sender.id !== senderId)
    );
  };
  const handleMessage = (receiverId:string) => {
    navigate(`/message/${receiverId}`);
    console.log("Message button clicked", receiverId);
  }

  if (loading) {
    return (
      <div className="bg-slate-900 p-6 rounded-2xl">
        Loading suggestions...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-md space-y-8">
      
      {/* 👥 PEOPLE YOU MAY KNOW */}
      <div>
        <h2 className="text-xl font-bold text-sky-400 mb-4">
          People You May Know
        </h2>

        {users.length === 0 && (
          <p className="text-slate-400">No users found</p>
        )}

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-slate-800 p-4 rounded-xl"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>

              <button
                onClick={() => handleAddFriend(user.id)}
                className="bg-sky-400 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-sky-300 transition"
              >
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 📩 FRIEND REQUESTS */}
      <div>
        <h2 className="text-xl font-bold text-sky-400 mb-4">
          Friend Requests
        </h2>

        {receivedRequests.length === 0 && (
          <p className="text-slate-400">No friend requests</p>
        )}

        <div className="space-y-4">
          {receivedRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between bg-slate-800 p-4 rounded-xl"
            >
              <div>
                <p className="font-semibold">{req.sender.name}</p>
                <p className="text-sm text-slate-400">{req.sender.email}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAcceptRequest(req.id)}
                  className="bg-green-500 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-green-400 transition"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleRejectRequest(req.id)}
                  className="bg-red-500 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-red-400 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* 🤝 MY FRIENDS */}
<div>
  <h2 className="text-xl font-bold text-sky-400 mb-4">
    My Friends
  </h2>

  {friends.length === 0 && (
    <p className="text-slate-400">You have no friends yet</p>
  )}

  <div className="space-y-4">
    {friends.map((friend) => (
      <div
        key={friend.id}
        className="flex items-center justify-between bg-slate-800 p-4 rounded-xl"
      >
        <div>
          <p className="font-semibold">{friend.name}</p>
          <p className="text-sm text-slate-400">{friend.email}</p>
        </div>

        <div className="flex gap-2">
          <button
            className="bg-sky-500 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-sky-400 transition"
            onClick={() => handleMessage(friend.id)}
          >
            Message
          </button>

          <button
            className="bg-red-500 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-red-400 transition"
          >
            Remove
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>

    </div>
  );
};

export default FriendSuggestions;
