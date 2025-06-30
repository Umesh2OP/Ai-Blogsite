
import React from "react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg border border-zinc-700 text-white shadow-md">
      <svg
        className="animate-spin h-6 w-6 text-indigo-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default Loader;
