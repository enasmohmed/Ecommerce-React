import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function UpdateUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/auth/getMe", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function handleUpdate(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/updateMe",
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage(response.data.message || "Profile updated successfully.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return <>
      <Helmet>
        <title>Update Logged user data</title>
      </Helmet>
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Your Profile</h2>
      {message && <p className="text-green-600">{message}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  </>
}
