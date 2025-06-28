import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-white text-gray-700 py-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-sm">
        {/* Column 1 */}
        <div>
          <h4 className="text-black font-semibold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-blue-600">
            <li onClick={() => navigate("/")}>
              <a className="hover:text-blue-800 transition cursor-pointer">Home</a>
            </li>
            <li>
              <a className="hover:text-blue-800 transition">Email: maniyarumesh9@gmail.com</a>
            </li>
            <li onClick={() => navigate("/about-us")}>
              <a className="hover:text-blue-800 transition cursor-pointer">About us</a>
            </li>
            <li>
              <a className="hover:text-blue-800 transition">Contact: 9373878995</a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="text-black font-semibold text-lg mb-4">Random Reads</h4>
          <ul className="space-y-2 text-blue-600">
            <li>
              <a href="#" className="hover:text-blue-800 transition">How I Brew Coffee While Coding ☕</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">Top 5 VSCode Extensions</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-800 transition">Midnight Debugging Stories 🌙</a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="text-black font-semibold text-lg mb-4">Stay Connected</h4>
          <ul className="space-y-2 text-blue-600">
            <li>
              <a
                href="https://github.com/Umesh2OP"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-800 transition"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center text-gray-500 font-bold text-2xl">
        Made with <span className="text-red-500">❤️</span> by{" "}
        <a
          href="https://github.com/Umesh2OP"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Umesh
        </a>{" "}
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
