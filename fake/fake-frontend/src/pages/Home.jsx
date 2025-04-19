import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      {/* Hero Section */}
      <section className="p-10 text-center">
        <h1 className="text-5xl font-bold text-red-600 mb-6">Welcome to Deepfake Detector</h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-300">
          Explore how we use AI to detect deepfakes and protect digital content integrity.
          Welcome here, where you can find the truth of fake one's.
        </p>
      </section>

      {/* Smooth Scrolling Image Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="p-10 flex justify-center"
      >
        <img
          src="/mainbkg.png"
          alt="Deepfake Background"
          className="rounded-xl shadow-2xl max-w-4xl w-full"
        />
      </motion.section>

      {/* Bottom Links */}
      <div className="flex justify-center gap-8 pb-10">
        <Link
          to="/about"
          className="text-white border-b-2 border-transparent hover:border-white transition duration-300"
        >
          About Us
        </Link>
        <Link
          to="/how-it-was-made"
          className="text-white border-b-2 border-transparent hover:border-white transition duration-300"
        >
          How It Was Made
        </Link>
      </div>
    </div>
  );
};

export default Home;
