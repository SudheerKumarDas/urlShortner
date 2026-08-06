import axios  from "axios";
import { useState } from "react";
const ForgetPassword = () => {
  const [email,setEmail]= useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forget-password`,{
        email
      });
      console.log(response.data)
    } catch (error) {
      console.error(`Error in forget password ${error}`);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-blue-50 to-slate-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
            S
          </div>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-3xl font-bold text-gray-800">
          Forgot Password?
        </h1>

        <p className="mt-3 text-center text-gray-500">
          Enter your email address and we'll send you a password reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword