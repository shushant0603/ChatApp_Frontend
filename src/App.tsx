import React from "react";
import {Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import LandingPage from "./pages/LandingPage/LandingPage";
// import AuthPage from "./pages/AuthPage/AuthPage";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyOtp from "./components/VerifyOtp";
import ProtectedRoute from "./protectRoute/ProtectedRoute";
import PublicRoute from "./protectRoute/PublicRoute";
import Message from "./pages/Homepage/Message";

// import Home from "./pages/Home";
// import About from "./pages/About";

const App: React.FC = () => {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={
          <PublicRoute>
          <Login />
          </PublicRoute>

      } />
        <Route path="/register" element={<Register />} />

        <Route path="/home" element={
          <ProtectedRoute>
          <HomePage/>
          </ProtectedRoute>
          
          } />
           <Route path="/message/:receiverId" element={
          <ProtectedRoute>
          <Message/>
          </ProtectedRoute>
          
          } />
        <Route path="/verify-otp" element={<VerifyOtp/>} />
      </Routes>
  
  );
};

export default App;
