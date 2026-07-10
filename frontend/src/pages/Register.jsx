import { useState } from "react";

function Register() {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit=()=>{

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
          onChange={(e)=>setUsername(e.target.value)}
        />

        <label htmlFor="email">Email : </label>
        <input 
          type="text" 
          name="email" 
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)} 
        />

        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
        
      </form>
    </div>
  );
}

export default Register;
