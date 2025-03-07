"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';

export default function AuthForm({ isLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? "https://reveo-ai-backend.vercel.app/api/auth/login" : "https://reveo-ai-backend.vercel.app/api/auth/register";
    try {
      setLoading(true)
      const res = await axios.post(url, { email, password });
      localStorage.setItem("token", res.data.token);
      isLogin ? toast.success("User got loggedin") : toast.success("User got registerd")
      router.push("/dashboard");
      setLoading(false)
    } catch (err) {
      isLogin ? toast.error("Error in logging") : toast.error("Error in registering")
      console.error(err);
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {isLogin ? "Login" : "Register"}
        </h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 border border-black text-gray-600"
          required
        />
        <div className="relative">
          <Input type={show ? "text" : "password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mb-6 border border-black text-gray-600" required />
          <div className="absolute right-3 top-1 cursor-pointer" onClick={() => setShow(!show)}>
            {show ? <EyeOff /> : <Eye />}
          </div>
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-transform duration-300 hover:scale-110 cursor-pointer">
          {isLogin ? (loading ? 'Logging...' : "Login") : (loading ? 'Registering...' : "Register")}
        </Button>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </form>
    </div>
  );
}