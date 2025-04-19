import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser?.emailVerified) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await sendEmailVerification(userCredential.user);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setStep(2);
          setTimer(30);
          setShowResend(false);
          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
        }, 1500);
      } catch (error) {
        alert(error.message);
      }
    } else if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        if (!userCredential.user.emailVerified) {
          alert("Please verify your email before logging in.");
          return;
        }
        alert("Login successful!");
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Check your email and click the verification link to activate your account.");
    }
  };

  useEffect(() => {
    let checkInterval;
    if (step === 2) {
      checkInterval = setInterval(() => {
        auth.currentUser?.reload().then(() => {
          if (auth.currentUser?.emailVerified) {
            navigate("/");
          }
        });
      }, 3000);
    }
    return () => clearInterval(checkInterval);
  }, [step, navigate]);

  useEffect(() => {
    let countdown;
    if (step === 2 && timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setShowResend(true);
    }
    return () => clearTimeout(countdown);
  }, [step, timer]);

  const handleResend = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setShowPopup(true);
        setShowResend(false);
        setTimer(30);
        setTimeout(() => setShowPopup(false), 1500);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 🔲 Static Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/mainbkg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🔳 Dark + Blur Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-10" />

      {/* 🔳 Login Box with motion */}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <motion.div
          key={isLogin ? "login" : "signup"}
          className="bg-[#1a1a1a] p-8 rounded-2xl shadow-xl w-full max-w-md text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-red-500">
            {isLogin ? "Login" : step === 1 ? "Sign Up" : "Email Verification"}
          </h2>

          {showPopup && (
            <div className="bg-green-600 text-white text-center p-2 mb-4 rounded-lg">
              Verification email sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {(isLogin || step === 1) && !showPopup && (
              <>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white focus:outline-none"
                  value={formData.password}
                  onChange={handleChange}
                />
                {!isLogin && (
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full px-4 py-2 rounded-lg bg-[#2a2a2a] text-white focus:outline-none"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                )}
              </>
            )}

            {!isLogin && step === 2 && (
              <>
                <p className="text-sm text-gray-400 text-center">
                  Please check your inbox and verify your email.
                </p>
                {showResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="w-full mt-2 text-sm text-red-400 hover:underline"
                  >
                    Resend Email
                  </button>
                ) : (
                  <p className="text-center text-sm text-gray-400">
                    Resend available in {timer}s
                  </p>
                )}
              </>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg transition-all font-semibold"
            >
              {isLogin
                ? "Login"
                : step === 1
                ? "Send Verification Email"
                : "Continue"}
            </button>
          </form>

          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStep(1);
                setShowPopup(false);
              }}
              className="text-red-500 hover:underline"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
