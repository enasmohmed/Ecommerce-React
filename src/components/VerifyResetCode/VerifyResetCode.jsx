import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function VerifyResetCode({ setShowVerifyCode, setShowResetPassword }) {
  const [resetCode, setResetCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleVerifyCode(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      console.log(response.data);        
      if (response.data.status === "Success") {
        navigate("/reset-password");
        // setShowVerifyCode(false);
        // setShowResetPassword(true); 
      } else {
        setMessage("Invalid code, please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid reset code.");
    } finally {
      setIsLoading(false);
    }
  }

  return <>
      <Helmet>
        <title>Verify Reset Code</title>
      </Helmet>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        
        <button
          onClick={() => setShowVerifyCode(false)}
          className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4">Verify Reset Code</h2>
        {message && <p className="text-red-500">{message}</p>}

        <form onSubmit={handleVerifyCode}>
          <input
            type="text"
            placeholder="Enter reset code"
            className="border p-2 w-full mb-3 rounded"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  </>
}
