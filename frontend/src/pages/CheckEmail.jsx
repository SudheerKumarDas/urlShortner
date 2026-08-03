import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";

const CheckEmail = () => {
  const location = useLocation();

  const email = location.state?.email;

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/resend-verification`,
        {
          email,
        }
      );

      toast.success(res.data.message);

      setCountdown(60);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex justify-center">
          <Mail className="h-16 w-16 text-blue-600" />
        </div>

        <h1 className="text-center text-3xl font-bold">
          Check Your Email
        </h1>

        <p className="mt-4 text-center text-gray-600">
          We've sent a verification email to
        </p>

        <p className="mt-2 text-center font-semibold text-blue-600">
          {email}
        </p>

        <p className="mt-6 text-center text-gray-500">
          Didn't receive the email?
        </p>

        <button
          disabled={countdown > 0}
          onClick={handleResend}
          className="mt-5 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {countdown > 0
            ? `Resend in ${countdown}s`
            : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default CheckEmail;