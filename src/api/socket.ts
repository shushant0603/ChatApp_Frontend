import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  autoConnect: false, // 🔴 VERY IMPORTANT
});

export const connectSocket = () => {
  const token = localStorage.getItem("token");
  console.log("🔑 Connecting socket with token:", token);

  socket.auth = { token };   // 👈 token JUST-IN-TIME set
  socket.connect();
};

export default socket;
