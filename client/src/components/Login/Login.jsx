import React, { useState } from "react";

function LoginForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="w-screen h-screen bg-white p-8 rounded-2xl shadow-lg flex justify-center items-center ">
      {/* Header Titles */}
     <div className="w-3/5 flex flex-col justify-center items-center">
     <div className="flex justify-center mb-4">
        <h2 className="text-3xl font-semibold text-center">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>
      </div>

      {/* Tab Controls */}
      <div className="relative w-2/5 flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">
        <button
          className={`w-1/2 text-lg font-medium transition-all z-10 ${
            isLoginMode ? "text-white" : "text-black"
          }`}
          onClick={() => setIsLoginMode(true)}
        >
          Login
        </button>
        <button
          className={`w-1/2 text-lg font-medium transition-all z-10 ${
            !isLoginMode ? "text-white" : "text-black"
          }`}
          onClick={() => setIsLoginMode(false)}
        >
          Signup
        </button>
        <div
          className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all ${
            isLoginMode ? "left-0" : "left-1/2"
          }`}
        ></div>
      </div>

      {/* Form Section */}
      <form className="space-y-4">
        {/* Signup-only Field */}
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
        )}

        {/* Shared Fields */}
        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
        />

        {/* Signup-only Field */}
        {!isLoginMode && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
        )}

        {/* Forgot Password (Only for Login) */}
        {isLoginMode && (
          <div className="text-right">
            <a href="#" className="text-cyan-600 hover:underline">
              Forgot password?
            </a>
          </div>
        )}

        {/* Submit Button */}
        <button className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition">
          {isLoginMode ? "Login" : "Signup"}
        </button>

        {/* Switch Mode Link */}
        <p className="text-center text-gray-600">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLoginMode(!isLoginMode);
            }}
            className="text-cyan-600 hover:underline"
          >
            {isLoginMode ? "Signup now" : "Login"}
          </a>
        </p>
      </form>
     </div>
    </div>
  );
}

export default LoginForm;
