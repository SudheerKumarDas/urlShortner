import { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const responseData = response.data;
      const user = responseData.user;
      const username = user.username;
      const userEmail = user.email;
      console.log(username);
      console.log(userEmail);
      navigate("/dashboard");
    } catch (err) {
        setError(
            err.response?.data?.message || "Something went wrong"
        )
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Login Page</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading?"Logging...":"Login"}
        </button>

        <div>
          <p>Don't have account ? </p>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
