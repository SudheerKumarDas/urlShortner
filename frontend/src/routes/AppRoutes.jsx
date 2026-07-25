import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";

const AppRoutes = () =>{
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/forget-password" element={<ForgetPassword/>} />
            </Routes>
        </div>
    )
}

export default AppRoutes;