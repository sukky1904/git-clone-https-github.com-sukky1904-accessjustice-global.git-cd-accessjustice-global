import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Toaster } from "./components/ui/sonner";
import axios from "axios";

// Pages
import Home from "./pages/Home";
import GetLegalHelp from "./pages/GetLegalHelp";
import ForLawyers from "./pages/ForLawyers";
import AIAssistant from "./pages/AIAssistant";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import ForNGOs from "./pages/ForNGOs";
import ForGovernments from "./pages/ForGovernments";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Auth Context
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/auth/me`, {
        withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // CRITICAL: If returning from OAuth callback, skip the /me check.
    // AuthCallback will exchange the session_id and establish the session first.
    if (window.location.hash?.includes('session_id=')) {
      setLoading(false);
      return;
    }
    checkAuth();
  }, [checkAuth]);

  const login = (userData, token) => {
    setUser(userData);
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#047A6C] border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// App Router with session_id detection
function AppRouter() {
  const location = useLocation();
  
  // Check URL fragment for session_id synchronously during render
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/get-legal-help" element={<><Navbar /><GetLegalHelp /><Footer /></>} />
      <Route path="/for-lawyers" element={<><Navbar /><ForLawyers /><Footer /></>} />
      <Route path="/for-ngos" element={<><Navbar /><ForNGOs /><Footer /></>} />
      <Route path="/for-governments" element={<><Navbar /><ForGovernments /><Footer /></>} />
      <Route path="/ai-assistant" element={<><Navbar /><AIAssistant /><Footer /></>} />
      <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
      <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
      <Route path="/how-it-works" element={<><Navbar /><HowItWorks /><Footer /></>} />
      <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
      <Route path="/register" element={<><Navbar /><Register /><Footer /></>} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navbar />
          <Dashboard />
          <Footer />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <AppRouter />
          <Toaster position="top-right" richColors />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
