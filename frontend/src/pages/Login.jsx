import { useState } from "react";

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit = () => {

    }
  return (
    <div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>

            <label htmlFor="email">Email : </label>
            <input type="text" name="email" placeholder="Enter your email" />

            <label htmlFor="password">Password : </label>
            <input type="password" name="password" placeholder="Enter your password"/>

            <button type="submit">Login</button>
            
            <div>
                <p>Don't have account ? </p>
                <span>Register</span>
            </div>
            
        </form>
    </div>
  )
}

export default Login