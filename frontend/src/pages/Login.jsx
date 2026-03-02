import React, { useState } from "react";
import { toast } from "react-toastify";
import { post } from "../Api/endpoint";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await post("/user/login",{email,password});
      if(res.data.success){
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171229] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h2>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
         
          className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300"
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;