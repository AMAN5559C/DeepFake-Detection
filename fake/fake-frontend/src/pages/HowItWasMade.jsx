import React from "react";
import { motion } from "framer-motion";
import '../index.css';
import bgImage from '/mainbkg.png'; // Ensure this image is available

const HowItWasMade = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 text-white relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />
      <div className="relative z-10 w-full max-w-3xl bg-black/50 p-6 rounded-xl shadow-lg">
        <motion.h1 
          className="text-3xl font-bold text-center mb-4 text-red-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          How We Created This Website
        </motion.h1>

        <motion.p 
          className="text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          This Deepfake Detection platform was built with a focus on helping users identify whether media (images, videos, or audio) is authentic or generated using AI. We used a combination of modern web technologies and machine learning techniques:
        </motion.p>

        <ul className="mt-4 space-y-2 list-disc list-inside text-gray-300">
          <li>
            <strong>Frontend:</strong> React with Tailwind CSS and Framer Motion for responsive UI and smooth animations.
          </li>
          <li>
            <strong>Backend:</strong> Python Flask API that receives media files and returns detection results using AI models.
          </li>
          <li>
            <strong>Model:</strong> A pretrained deep learning model trained to detect deepfake patterns in media files.
          </li>
          <li>
            <strong>Hosting:</strong> Firebase for frontend hosting and authentication.
          </li>
          <li>
            <strong>Communication:</strong> REST API for sending data between frontend and backend securely.
          </li>
        </ul>

        <motion.p 
          className="text-gray-400 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Our goal is to provide a fast, intuitive, and effective tool that increases awareness and helps people navigate the challenges of AI-generated content.
        </motion.p>
      </div>
    </div>
  );
};

export default HowItWasMade;