import { useState } from "react"

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


  return (
    <div className="w-full h-screen">
        <form className="max-w-2xl  flex justify-center items-center bg-amber-300">

        <div className="flex flex-col">
            <label htmlFor="email">Email : </label>
            <input 
                type="text"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)} 
            />
        </div>

        <div className="flex flex-col">
            <label htmlFor="password">Password : </label>
            <input 
                type="text"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)} 
            />
        </div>
    </form>
    </div>
  )
}

export default Login