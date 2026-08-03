import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  CircleCheckBig,
  CircleX,
} from "lucide-react";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [status, setStatus] = useState(token ? "loading" : "error");
  // loading | success | error

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`
        );

        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-6 flex justify-center">

          {status === "loading" && (
            <Loader2
              size={60}
              className="animate-spin text-blue-600"
            />
          )}

          {status === "success" && (
            <CircleCheckBig
              size={60}
              className="text-green-600"
            />
          )}

          {status === "error" && (
            <CircleX
              size={60}
              className="text-red-600"
            />
          )}

        </div>

        <h1 className="text-center text-3xl font-bold">

          {status === "loading" && "Verifying Email"}

          {status === "success" && "Email Verified"}

          {status === "error" && "Verification Failed"}

        </h1>

        <p className="mt-4 text-center text-gray-600">

          {status === "loading" &&
            "Please wait while we verify your email."}

          {status === "success" &&
            "Your email has been verified successfully."}

          {status === "error" &&
            "Your verification link is invalid or has expired."}

        </p>

        {status === "success" && (
          <button
            onClick={() => navigate("/login")}
            className="mt-8 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Login
          </button>
        )}

        {status === "error" && (
          <button
            onClick={() => navigate("/register")}
            className="mt-8 w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Register Again
          </button>
        )}

      </div>
    </div>
  );
};

export default EmailVerification;