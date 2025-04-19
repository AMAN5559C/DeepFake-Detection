// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-4 bg-[#111] text-sm mt-auto">
      <div className="flex justify-between items-center flex-wrap">
        <span
          className="text-left text-white font-semibold"
          style={{ fontFamily: "'Pacifico', cursive" }}
        >
          Designed & Developed by Kallen and Aman Bind
        </span>
        <span
          className="text-right text-gray-400 mt-2 sm:mt-0"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          @ All copyrights reserved 2025
        </span>
      </div>
    </footer>
  );
};

export default Footer;
