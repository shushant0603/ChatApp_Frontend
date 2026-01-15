import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000/auth', // Replace with your backend API URL
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// 🔐 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;