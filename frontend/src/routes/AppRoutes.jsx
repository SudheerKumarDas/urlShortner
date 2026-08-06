import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register.jsx";
import EmailVerification from "../pages/EmailVerification.jsx";
import CheckEmail from "../pages/CheckEmail.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import { Navigate } from "react-router-dom";

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
        <Route path="/register" element={<Register />} />

        <Route path="/verify-email" element={<EmailVerification />} />

        <Route path="/check-email" element={<CheckEmail />} />

        <Route path="/reset-password" element={<ResetPassword/>} />

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
