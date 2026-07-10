import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const responseData = response.data;
      const user = responseData.user;
      const username = user.username;
      const userEmail = user.email;
      console.log(username);
      console.log(userEmail);
      navigate('/dashboard');
    } catch (error) {
        console.error(error);
    } finally{
        setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={setIsLoading}>Login</button>

        <div>
          <p>Don't have account ? </p>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
