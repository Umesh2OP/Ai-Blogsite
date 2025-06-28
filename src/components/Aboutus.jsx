import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white px-6 py-16 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-purple-400">About Blogverse 🚀</h1>

        <p className="text-lg text-zinc-200 mb-4 leading-relaxed">
          Welcome to <span className="text-white font-semibold">Blogverse</span>, the AI-powered blog platform built for curious minds and creative writers.
        </p>

        <ul className="list-disc list-inside space-y-3 text-zinc-300 text-base">
          <li><strong className="text-white">🧠 AI-Powered Writing:</strong> Generate blog ideas, titles, and full-length articles with the help of cutting-edge artificial intelligence.</li>
          <li><strong className="text-white">📖 AI Summaries:</strong> Don't have time to read the whole blog? Get smart summaries instantly — in your language of choice.</li>
          <li><strong className="text-white">🌐 Multilingual Support:</strong> Read summaries in multiple languages so content is accessible to everyone.</li>
          <li><strong className="text-white">🔐 Secure & Private:</strong> We use Appwrite to securely manage user authentication, sessions, and data storage — your content and identity are safe with us.</li>
          <li><strong className="text-white">🎨 Clean & Modern UI:</strong> Designed with simplicity and elegance so you can focus on reading and writing — distraction-free.</li>
          <li><strong className="text-white">🚀 Smooth UX:</strong> Whether you're writing or reading, enjoy seamless transitions, auto-play blog previews, and a futuristic reading experience.</li>
        </ul>

        <p className="mt-6 text-zinc-400 italic text-sm text-center">
          “Our mission is to empower every voice with intelligent tools and a welcoming platform.”
        </p>
      </div>
    </div>
  );
};

export default About;
