import { useState } from "react";
import { useEffect } from "react";
import { getCurrentUser } from "../services/auth.service.js";
import AuthContext from "./AuthContext.jsx";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
