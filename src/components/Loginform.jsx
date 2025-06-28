import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Login as authlogin } from '../Store/Authslice';
import { useDispatch } from 'react-redux';
import authservice from '../Appwrite/Auth';
import toast from 'react-hot-toast';

const Loginform = () => {
  const navigate = useNavigate(); // <-- fixed here
  const [error, seterror] = useState(null);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const Login = async (data) => {
    seterror('');
    try {
      const session = await authservice.login(data);
      if (session) {
        const Userdata = await authservice.getCurrentUser();
  if (Userdata) dispatch(authlogin({ userData: Userdata }));

        navigate('/');
                                    toast.success("Login successful ")


      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <form
        onSubmit={handleSubmit(Login)}
        className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="w-full rounded-xl px-4 py-3 border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full px-4 py-3 border border-gray-600 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button

          type="submit"
          className="w-full rounded-xl px-4 py-3 bg-gradient-to-tr from-purple-600 to-indigo-600 text-white text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          Login
        </button>
          <div className="text-center">
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-sm text-purple-300 hover:text-white mt-2 underline transition-all duration-200"
          >
            New here? Create your account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginform; 