import { useState } from "react"
import axios from "axios"

const Dashboard = () => {
    const [longUrl,setLongUrl]=useState("");

    const handleClick = async () => {
        axios
    }

  return (
    <div className="w-full flex items-center justify-center flex-col pt-3">
        <h2>Shorten your longUrl URL</h2>
        <div className="mt-10 gap-3">
            <input
                type="text"
                placeholder="Enter your long url"
                name="longUrl"
                value={longUrl}
                onChange={(e)=>setLongUrl(e.target.value)}
                className="w-full border-green-300 p-3 mx-2"
            />
            <button onClick={handleClick} className="cursor-pointer border-none bg-blue-400 rounded-2xl p-3">
                Shorten URL
            </button>
        </div>
    </div>
  )
}

export default Dashboard