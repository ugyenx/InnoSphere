import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  // Submit handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        data,
        {
          withCredentials: true,
        }
      );

      navigate("/");
      // You can store token or redirect here
    } catch (error) {
      console.error("Login error:", error);

      // Axios error handling
      if (error.response) {
        // Backend responded with an error
        alert(error.response.data.message || "Login failed!");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-white p-8 rounded-2xl shadow-lg flex justify-center items-center">
      <div className="w-3/5 flex flex-col justify-center items-center">
        {/* Header */}
        <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            {...register("email", { required: "Email is required" })}
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="text-right">
            <a href="#" className="text-cyan-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-600 hover:underline">
              Signup now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
