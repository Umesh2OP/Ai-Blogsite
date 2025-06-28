import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authservice from "../Appwrite/Auth";
import { Login } from "../Store/Authslice";

const Signupform = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState(null);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const signup = async (data) => {
    seterror("");
    try {
      const newUser = await authservice.CreateAccount(data);
      if (newUser) {
        const currentUser = await authservice.getCurrentUser();
        if (currentUser) {
dispatch(Login({ userData: currentUser }));
          navigate("/");
        }
      }
    } catch (error) {
     console.error("Signup Error:", error);
  seterror(error.message || "Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit(signup)} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 rounded-lg border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-blackfocus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signupform;
