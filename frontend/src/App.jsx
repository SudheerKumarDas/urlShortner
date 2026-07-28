import "./App.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
   console.log("App mounted");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          withCredentials: true,
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
    return () => {
      console.log("App unmounted");
    };
  }, []);
  console.log({
    isLoading,
    isAuthenticated,
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </div>
  );
}

export default App;
