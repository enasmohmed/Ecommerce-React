import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    if (!storedEmail) {
      toast.error("No email found, please request a new reset link.");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  async function handleResetPassword(e) {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, newPassword: password }
      );

      toast.success("Password reset successfully. Redirecting...");
      localStorage.removeItem("resetEmail");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>

      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-3 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  </>
}
