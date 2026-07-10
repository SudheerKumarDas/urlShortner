import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api.js";

function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
            const response = await api.post('/auth/register',{
              username,
              email,
              password
            })
            const responseData = response.data;
            console.log(responseData);
            navigate('/login');
      } catch (error) {
          console.error(error);
      }
    }
  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="username">Username : </label>
        <input 
          type="text" 
          name="username" 
          placeholder="Enter your username"
          value={username} 
          onChange={(e)=>setUsername(e.target.value)}
        />

        <label htmlFor="email">Email : </label>
        <input 
          type="text" 
          name="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)} 
        />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
        
      </form>
    </div>
  );
}

export default Register;
