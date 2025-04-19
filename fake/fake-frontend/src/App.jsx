import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import DeepfakeDetector from './components/DeepfakeDetector';
import AuthPage from './pages/AuthPage';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './index.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from "./pages/About";
import HowItWasMade from "./pages/HowItWasMade";
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AnimatePresence, motion } from 'framer-motion';

// ✨ Animation Wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

// ✨ App Content with AnimatePresence
const AppContent = ({ user, handleLogout }) => {
  const location = useLocation();

  return (
    <>
      <div className="background-image" />
      <Navbar user={user} handleLogout={handleLogout} />

      <main className="p-6 relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/how-it-was-made" element={<PageWrapper><HowItWasMade /></PageWrapper>} />
            <Route path="/auth" element={<PageWrapper><AuthPage /></PageWrapper>} />
            <Route
              path="/detector"
              element={
                <PageWrapper>
                  <ProtectedRoute>
                    <DeepfakeDetector />
                  </ProtectedRoute>
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!', {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bold',
        }
      });
    } catch (error) {
      toast.error(`Logout error: ${error.message}`, {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bold',
        }
      });
    }
  };

  return (
    <Router>
      <AppContent user={user} handleLogout={handleLogout} />
    </Router>
  );
};

export default App;
