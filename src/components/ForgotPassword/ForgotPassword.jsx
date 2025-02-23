import React, { useState } from "react";
import axios from "axios";
import VerifyResetCode from "../VerifyResetCode/VerifyResetCode";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function ForgotPassword({ setShowForgotPassword }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false); 
  const navigate = useNavigate();

  async function handleResetPassword(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
  
      console.log(response.data);
  
      if (response.data.statusMsg === "success") {
        toast.success("Reset code sent to your email.");
        localStorage.setItem("resetEmail", email);
        
        setTimeout(() => {
          setShowForgotPassword(false);
          navigate("/verify-reset-code"); 
        }, 1500);
      } else {
        setMessage("Unexpected response from the server.");
        toast.error("Unexpected response from the server.");
      }
      
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      setMessage(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }
  

  if (showVerifyCode) {
    return <VerifyResetCode setShowVerifyCode={setShowVerifyCode} setShowResetPassword={() => {}} />;
  }

  return <>
      <Helmet>
        <title>ForgetPassword</title>
      </Helmet>


    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* زر الإغلاق */}
        <button
          onClick={() => setShowForgotPassword(false)}
          className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
        {message && <p className="text-red-500">{message}</p>}

        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
    </>

}
