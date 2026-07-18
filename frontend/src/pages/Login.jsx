import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login",{
                email,
                password
            },{
                withCredentials:true
            })
            alert("Login successful")
            const responseData = res.data;
            console.log(responseData.user);
            navigate("/dashboard");
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={(e)=>setEmail(e.target.value)}
                    className="p-2 text-2xl border border-gray-200"
                     />
            </div>

            <div className="flex flex-col gap-1.5 mt-3">
                <label htmlFor="password">Password</label>
                <input 
                    type="text"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e)=>setPassword(e.target.value)}
                    className="p-2 text-2xl border border-gray-200"
                     />
            </div>

            <button type="submit" className="mt-3 p-3 border-none bg-blue-500 text-2xl rounded-2xl cursor-pointer">Login</button>
        </form>
    </div>
  )
}

export default Login