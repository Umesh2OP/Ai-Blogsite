'use client';
import React from "react";
import { motion } from "framer-motion";
import { FaLock, FaBrain, FaFeatherAlt, FaLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const features = [
  {
    icon: <FaFeatherAlt className="text-green-400" size={24} />,
    title: "Write Smarter with AI",
    description:
      "Let our AI generate blog titles, full content, and relevant images based on your topic prompt.",
  },
  {
    icon: <FaLightbulb className="text-yellow-400" size={24} />,
    title: "Informative & Inspiring",
    description:
      "Explore a sea of high-quality blogs curated for curious minds. Learn, grow, and get inspired every day.",
  },
  {
    icon: <FaLock className="text-blue-400" size={24} />,
    title: "Safe & Secure with Appwrite",
    description:
      "Built with Appwrite, BlogVerse ensures your data is secure, your content is protected, and privacy is a priority.",
  },
  {
    icon: <FaBrain className="text-purple-400" size={24} />,
    title: "Completely Free & Future-Ready",
    description:
      "Enjoy advanced features like AI-assisted writing—100% free. We’re building the future of blogging.",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};


const CTA = () => {
  const navigate=useNavigate();

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full py-16 px-6 md:px-16 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col md:flex-row items-center justify-between overflow-hidden"
    >
      {/* Left: Vertical Animation */}
      <div className="w-full md:w-1/2 relative h-[320px] overflow-hidden">
        <motion.div
          className="flex flex-col gap-10"
          animate={{ y: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
        >
          {[...features, ...features].map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex gap-4 items-start p-4 border border-gray-600 rounded-xl bg-[#1a1a2e] shadow-md hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              variants={itemVariants}
            >
              <div className="p-2 rounded-full bg-[#202040]">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-300 mt-1">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right: CTA Text */}
      <motion.div
        className="w-full md:w-1/2 mt-12 md:mt-0 md:pl-16"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        <h4 className="text-pink-400 text-lg font-semibold mb-2">Why BlogVerse?</h4>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          The Future of Blogging Starts Here.
        </h2>
        <p className="text-gray-300 text-md mb-6">
          BlogVerse is your AI-powered blogging companion. Free to use, backed by Appwrite, and designed for creators who want to share their voice effortlessly and securely.
        </p>
        <motion.button
        onClick={(()=>navigate('/add-posts'))}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition duration-300"
        >
          Start Writing with AI
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default CTA;
