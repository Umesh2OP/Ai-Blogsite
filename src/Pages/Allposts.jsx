import React, { useEffect, useState, useRef } from "react";
import appwriteService from "../Appwrite/config";
import Postcard from "../components/Postcard";
import { motion, AnimatePresence } from "framer-motion";
import authService from "../Appwrite/Auth"; 
import { useSelector } from "react-redux";



const AUTO_PLAY_INTERVAL = 5000;

const Allposts = () => {

  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState(
    parseInt(localStorage.getItem("lastPost")) || 0
  );
  const [modalOpen, setModalOpen] = useState(false);
 const authStatus = useSelector((state) => state.Auth.status);
const user = useSelector((state) => state.Auth.userData);


  const timeoutRef = useRef(null);

  // Check login status
  

  // Fetch posts
 useEffect(() => {
  if (authStatus && user) {
    appwriteService.getPosts([]).then((result) => {
      if (result?.documents) {
        setPosts(result.documents);
      }
    });
  } else {
    setPosts([]); // clear posts on logout
  }
}, [authStatus, user]);

  // Auto-pagination logic
  useEffect(() => {
    if (posts.length === 0) return;

    timeoutRef.current = setTimeout(() => {
      paginate("next");
    }, AUTO_PLAY_INTERVAL);

    localStorage.setItem("lastPost", current);

    return () => clearTimeout(timeoutRef.current);
  }, [current, posts]);

  const paginate = (direction) => {
    clearTimeout(timeoutRef.current);
    setCurrent((prev) =>
      direction === "next"
        ? (prev + 1) % posts.length
        : (prev - 1 + posts.length) % posts.length
    );
  };

  const currentPost = posts[current];

  // Loading state
  
  // Not logged in UI
  if (!authStatus || !user) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Background glow */}
        <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-[120px] opacity-30 top-10 left-10" />
        <div className="absolute w-[300px] h-[300px] bg-indigo-500 rounded-full blur-[100px] opacity-20 bottom-10 right-10" />

        {/* Glassmorphic card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-8 py-10 max-w-xl w-full text-center z-10 shadow-lg"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to <span className="text-purple-400">Blogverse 🚀</span>
          </h1>
          <p className="text-zinc-300 text-lg mb-6">
            Sign in to discover amazing posts from creators across the universe.
          </p>
          <a
            href="/login"
            className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-zinc-200 transition"
          >
            Sign In
          </a>
        </motion.div>
      </div>
    );
  }

  // Logged in UI
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Blurred background */}
      {currentPost?.featuredImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center blur-[20px] scale-110 opacity-20"
          style={{
            backgroundImage: `url(${appwriteService.getFilePreview(
              currentPost.featuredImage
            )})`,
          }}
        />
      )}

      {/* Heading */}
      <div className="absolute top-4 w-full z-30 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg"
        >
          Blogverse 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-zinc-300 text-center px-4 text-sm sm:text-lg max-w-3xl"
        >
          Discover the latest stories, ideas, and insights from across the universe of thoughts. Dive into the freshest drops from Blogverse now!
        </motion.p>
      </div>

      {/* Main animated card */}
      <AnimatePresence>
        {currentPost && (
          <motion.div
            key={currentPost.$id}
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x * velocity.x;
              if (swipe < -500) paginate("next");
              else if (swipe > 500) paginate("prev");
            }}
          >
            <div className="w-full max-w-3xl mx-auto p-4 pt-40 sm:pt-44">
              <Postcard
                $id={currentPost.$id}
                title={currentPost.title}
                featuredImage={currentPost.featuredImage}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-zinc-700 z-20">
        <motion.div
          key={current}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTO_PLAY_INTERVAL / 1000, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>

      {/* Nav buttons */}
      <div className="absolute bottom-8 w-full flex justify-between px-6 z-20">
        <button
          onClick={() => paginate("prev")}
          className="bg-white text-black p-3 rounded-full hover:scale-110 transition"
        >
          ←
        </button>
        <button
          onClick={() => paginate("next")}
          className="bg-white text-black p-3 rounded-full hover:scale-110 transition"
        >
          →
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-20">
        {posts.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-zinc-600"
            }`}
          />
        ))}
      </div>

      {/* Modal view */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white text-black dark:bg-zinc-800 dark:text-white p-8 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-3 text-2xl hover:scale-110"
              >
                ✕
              </button>
              <h1 className="text-2xl font-bold mb-4">{currentPost.title}</h1>
              <img
                src={appwriteService.getFilePreview(currentPost.featuredImage)}
                alt={currentPost.title}
                className="rounded-lg mb-4 w-full object-cover max-h-[300px]"
              />
              <p className="whitespace-pre-line">{currentPost.Content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Allposts;
