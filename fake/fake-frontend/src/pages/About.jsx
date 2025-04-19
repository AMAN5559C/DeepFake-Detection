import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import aboutbkg from "/aboutbkg.png";
import dp1 from "/dvp.jpg";
import dp2 from "/dvp2.jpg";

const About = () => {
  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* Parallax Background */}
      <div
        className="fixed top-0 left-0 w-full h-screen bg-no-repeat bg-cover bg-center z-0 scale-110"
        style={{
          backgroundImage: `url(${aboutbkg})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/5 animate-pulse" />
      </div>

      {/* Foreground Boxes */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center min-h-screen pt-32 px-6 md:px-20 space-y-16 md:space-y-0 md:space-x-16">
        {/* First Box - Aman */}
        <motion.div
          className="group bg-black/60 backdrop-blur-md p-6 rounded-xl shadow-xl w-64 h-80 flex flex-col justify-center items-center border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:ring-2 hover:ring-red-500 hover:ring-offset-2 hover:ring-offset-black"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-bold text-red-400 mb-2">Aman Bind</h2>
          <img
            src={dp1}
            alt="Aman"
            className="w-24 h-24 rounded-full object-cover border mb-3"
          />
          <p className="text-sm text-white mt-2 text-center">
            <Typewriter
              words={["A I Engineer 💻", "Open Source Enthusiast 🌍", "React Wizard ⚛️"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="https://github.com/AMAN5559C" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-gray-400 transition" />
            </a>
            <a href="https://www.linkedin.com/in/aman-bind-0347a7258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-blue-400 transition" />
            </a>
          </div>
        </motion.div>

        {/* Second Box - Kallen */}
        <motion.div
          className="group bg-black/60 backdrop-blur-md p-6 rounded-xl shadow-xl w-64 h-80 flex flex-col justify-center items-center border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 hover:ring-offset-black"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-lg font-bold text-red-400 mb-2">Kallen</h2>
          <img
            src={dp2}
            alt="Kallen"
            className="w-24 h-24 rounded-full object-cover border mb-3"
          />
          <p className="text-sm text-white mt-2 text-center">
            <Typewriter
              words={["Your AI Copilot 🤖", "Code Whisperer ✨", "Frontend Alchemist 🧪", "Sassy Debugger 💅"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
          <div className="flex mt-4 space-x-4">
            <a href="https://github.com/AMAN5559C" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-xl hover:text-gray-400 transition" />
            </a>
            <a href="https://www.linkedin.com/in/aman-bind-0347a7258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-xl hover:text-blue-400 transition" />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="h-[100vh]" />
    </div>
  );
};

export default About;
