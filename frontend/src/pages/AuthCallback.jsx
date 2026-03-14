import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API, useAuth } from "../App";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login, checkAuth } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Use ref to prevent double processing in StrictMode
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const processAuth = async () => {
      try {
        // Get session_id from URL fragment
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.substring(1));
        const sessionId = params.get("session_id");

        if (!sessionId) {
          toast.error("Authentication failed: No session ID");
          navigate("/login", { replace: true });
          return;
        }

        // Exchange session_id for user data
        const response = await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId },
          { withCredentials: true }
        );

        login(response.data.user);
        toast.success("Welcome!");
        
        // Clear the hash and navigate to dashboard
        window.history.replaceState(null, "", window.location.pathname);
        navigate("/dashboard", { replace: true, state: { user: response.data.user } });
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("Authentication failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };

    processAuth();
  }, [navigate, login, checkAuth]);

  return (
    <main className="flex-1 flex items-center justify-center bg-[#F8FAFC]" data-testid="auth-callback">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#047A6C] mx-auto mb-4" />
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </main>
  );
};

export default AuthCallback;
