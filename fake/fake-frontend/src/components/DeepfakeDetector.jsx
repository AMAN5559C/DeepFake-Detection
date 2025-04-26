// DeepfakeDetector.jsx

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "../index.css";

const DeepfakeDetector = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [detectionResult, setDetectionResult] = useState(null);

  const userEmail = "user@example.com"; // 🔁 Replace this with actual user email from auth if needed
  const userId = userEmail.split("@")[0]; // ✅ Extracted user_id

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      setFileName(uploadedFile.name);
      setFileSelected(true);
      setDetectionResult(null);
      setShowAlert("");
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName("");
    setFileSelected(false);
    setDetectionResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setShowAlert("Please select a file before detecting deepfake!");
      return;
    }
    if (!isOnline) {
      setShowAlert("Please check your internet connection!");
      return;
    }

    setUploading(true);
    setShowAlert("");

    try {
      const formData = new FormData();
      const actualFile = document.querySelector('input[type="file"]').files[0];
      formData.append("file", actualFile);
      formData.append("user_email", userEmail); // Still keeping this for backend ref
      formData.append("user_id", userId); // 🆕 Send the extracted user_id

      const response = await fetch("https://d926-171-61-61-124.ngrok-free.app/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze file");

      const data = await response.json();
      setDetectionResult(data.result);
      setShowAlert("Detection completed!");
    } catch (error) {
      console.error(error);
      setShowAlert("Error during upload or detection.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-4 text-white"
      style={{ backgroundImage: "url('/mainbkg.png')" }}
    >
      <AnimatePresence>
        {showAlert && (
          <motion.div
            key="alert"
            className={`absolute top-5 z-50 px-4 py-2 rounded-lg shadow-lg ${
              showAlert.includes("completed") ? "bg-green-600" : "bg-red-600"
            } text-white`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            {showAlert}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="deepfake-card bg-black bg-opacity-70 rounded-xl p-6 w-full max-w-xl shadow-2xl backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
          Deepfake Detector
        </h2>

        <div className="flex items-center justify-center relative w-full flex-wrap">
          <motion.label
            className="cursor-pointer bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-lg inline-block text-center"
            initial={{ x: 0 }}
            animate={fileSelected ? { x: -50 } : { x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose File
            <input
              type="file"
              accept="image/*,video/*,audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </motion.label>

          {fileName && (
            <motion.div
              className="flex items-center ml-2 bg-gray-800 px-2 py-1 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gray-300 text-sm truncate max-w-xs overflow-hidden">
                {fileName}
              </span>
              <button
                onClick={handleRemoveFile}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          {file && (
            <motion.div
              className="border border-gray-600 rounded-lg p-2 bg-[#222] w-full max-w-md relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {file.includes("video") ? (
                <video
                  src={file}
                  controls
                  className="w-full h-auto rounded-lg"
                />
              ) : file.includes("audio") ? (
                <audio src={file} controls className="w-full" />
              ) : (
                <img
                  src={file}
                  alt="Uploaded preview"
                  className="w-full h-auto rounded-lg object-cover"
                />
              )}
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          {uploading ? (
            <Button
              disabled
              className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg"
            >
              Uploading...
            </Button>
          ) : (
            <motion.button
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all shadow-lg"
              onClick={handleUpload}
              disabled={!file}
              initial={{ width: "150px" }}
              animate={fileSelected ? { width: "100%" } : { width: "150px" }}
              transition={{
                duration: fileSelected ? 1.2 : 0.5,
                ease: "easeInOut",
              }}
            >
              Detect Deepfake
            </motion.button>
          )}
        </div>

        {detectionResult && (
          <div className="mt-6 text-center">
            <h3
              className={`text-xl font-bold ${
                detectionResult.verdict === "Fake"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {detectionResult.verdict === "Fake"
                ? "🚫 Deepfake Detected"
                : "✅ Authentic Media"}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Confidence: {detectionResult.confidence.toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepfakeDetector;
