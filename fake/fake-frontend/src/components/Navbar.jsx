import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#111] shadow-md px-6 py-4 flex items-center justify-between backdrop-blur-md bg-opacity-70">
      <Link to="/" className="text-2xl font-bold text-red-500">Deepfake Detector</Link>
      <nav className="flex items-center space-x-4">
      <Link
        to="/detector"
        className="text-white hover:text-red-500 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:w-0 hover:after:w-full after:h-[2px] after:bg-red-500 after:transition-all after:duration-300"
      >
        Detector
      </Link>



        {user ? (
          <>
            <span className="text-sm text-gray-400 hidden sm:block">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg font-semibold transition"
          >
            Login / Signup
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
