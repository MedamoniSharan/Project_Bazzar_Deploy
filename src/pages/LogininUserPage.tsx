import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Lottie from "lottie-react";
import loginAnimation from "./login_animation.json";
import { motion } from "framer-motion";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useAuth } from "@/context/AuthContext"; // 👈

const LoginUserPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    // Call your form-based login logic here
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const res = await axios.post("https://project-palace-paradise.onrender.com/api/auth/google", {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", res.data.token);
      login(res.data.user, res.data.token); // ✅ store user and token
      navigate("/"); // ✅ redirect
    } catch (err) {
      console.error("❌ Google login failed", err);
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
          <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Your Password" className="w-full px-4 py-2 border border-gray-300 rounded"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Keep me logged in
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
            </div>
            <button type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">
              Log In
            </button>
          </form>

          <div className="my-4 text-center"><span className="text-gray-500 text-sm">or</span></div>
          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.log("Login Failed")} />
          </div>

          <p className="mt-4 text-sm text-center">
            Don’t have an account yet? <Link to="/signup" className="text-blue-600 font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginUserPage;
