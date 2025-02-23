import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("userToken");

  async function handleChangePassword(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          currentPassword: oldPassword,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Password updated successfully!"); 
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return <>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Current Password"
          className="border p-2 w-full mb-3 rounded"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3 rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
    </>
}
