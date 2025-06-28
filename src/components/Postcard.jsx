import React from "react";
import appwriteService from "../Appwrite/config";
import { Link } from "react-router-dom";

const Postcard = ({ $id, title, featuredImage }) => {
  const previewUrl = appwriteService.getFilePreview(featuredImage);

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl bg-zinc-900 border border-zinc-700 transition-all duration-500">
      <Link to={`/post/${$id}`}>
        <img
          src={previewUrl}
          alt={title}
          className="w-full h-[60vh] object-cover transition-all duration-500"
        />
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-zinc-400">Click to read more...</p>
        </div>
      </Link>
    </div>
  );
};

export default Postcard;
