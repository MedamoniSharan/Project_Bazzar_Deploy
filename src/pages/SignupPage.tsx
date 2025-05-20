import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "./signup_animation.json";
import { motion } from "framer-motion";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; // 👈

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Signing up with", email, password);
    // Add your custom signup logic if needed
  };

  const handleGoogleSignup = async (credentialResponse: any) => {
    try {
      const res = await axios.post("https://project-palace-paradise.onrender.com/api/auth/google", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      login(res.data.user, res.data.token); // ✅ save in context
      navigate("/"); // ✅ go to user dashboard
    } catch (err) {
      console.error("❌ Google signup failed", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 items-center justify-center px-4 py-8">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white border border-gray-300 shadow-md rounded-xl p-4">
          <Lottie animationData={loginAnimation} loop={true} className="w-72 md:w-96" />
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Your Password" className="w-full px-4 py-2 border border-gray-300 rounded"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border border-gray-300 rounded"
              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
              Sign Up
            </button>
          </form>

          <div className="my-4 text-center"><span className="text-gray-500 text-sm">or</span></div>
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSignup} onError={() => console.log("Signup Failed")} />
          </div>

          <p className="mt-4 text-sm text-center">
            Already have an account? <Link to="/loginuser" className="text-blue-600 font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
