import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

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
                navigate("/login");
            } catch (error) {
                console.error(error);
            }
    }
  return (
    <div className="w-full flex justify-center items-center">
        <form onSubmit={handleRegister}>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="username">username</label>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={(e)=>setUsername(e.target.value)}
                    className="p-2 text-2xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="email">email</label>
                <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    className="p-2 text-2xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="password">password</label>
                <input 
                    type="text" 
                    name="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    className="p-2 text-2xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-blue-500"
                />
            </div>

            <button type="submit" className="mt-3 p-3 bg-blue-500 border-none rounded-2xl cursor-pointer">Register</button>

        </form>
    </div>
  )
}

export default Register