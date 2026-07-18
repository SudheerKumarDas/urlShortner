import { useState } from "react"
import axios from "axios";

const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleRegister=async(e)=>{
            e.preventDefault();
            try {
                const res = await axios.post('http://localhost:3000/api/auth/register',{
                    username,
                    email,
                    password
                },{ 
                    withCredentials: true 
                })
                const responseData = res.data;
                alert(responseData.message)
                console.log(responseData.user);
            } catch (error) {
                console.error(error);
            }
    }
  return (
    <div>
        <form onSubmit={handleRegister}>

            <label htmlFor="username">username</label>
            <input 
                type="text" 
                name="username" 
                value={username} 
                onChange={(e)=>setUsername(e.target.value)} 
            />

            <label htmlFor="email">email</label>
            <input 
                type="text" 
                name="email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
            />

            <label htmlFor="password">password</label>
            <input 
                type="text" 
                name="password" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
            />

            <button type="submit" >Register</button>

        </form>
    </div>
  )
}

export default Register