import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { post } from "../Api/endpoint";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [preview, setPreview] = useState("/User.png");
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const reset = () => {
    setSignupData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       setLoading(true);
      const formdata = new FormData();
      formdata.append("firstname", signupData?.firstname);
      formdata.append("lastname", signupData?.lastname);
      formdata.append("email", signupData?.email);
      formdata.append("password", signupData?.password);

      if (file) {
        formdata.append("file", file);
      }

      const res = await post("/user/signup", formdata);

      if (res.data.success) {
        toast.success(res.data.message);
        reset();
        setPreview("/User.png");
        navigate("/login");
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#171229] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Create Account
        </h2>

        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28">
            <img
              src={preview}
              alt="profile"
              className="w-full h-full object-cover rounded-full border-4 border-purple-600 shadow-lg"
            />

            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor="profileUpload"
              className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 p-2 rounded-full cursor-pointer shadow-md transition"
            >
              <FaEdit className="text-white text-sm" />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={signupData?.firstname}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={signupData?.lastname}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={signupData?.email}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={signupData?.password}
            required
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${loading && "cursor-not-allowed"} w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-300`}
        >
          {
              loading ? "Please Wait..":"Sign Up"
          }
        </button>

      </form>
    </div>
  );
};

export default Signup;