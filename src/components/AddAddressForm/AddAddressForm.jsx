import { useState } from "react";
import { useNavigate } from "react-router-dom";  // 📌 استيراد useNavigate
import axios from "axios";

export default function AddAddressForm() {
  const navigate = useNavigate(); 
  const [address, setAddress] = useState({ alias: "", details: "", phone: "", city: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("⏳ Adding address...");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");

      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        address,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(" Address added successfully!");
      setAddress({ details: "", phone: "", city: "" });

    
      setTimeout(() => {
        navigate("/payment"); 
      }, 1500);
      
    } catch (error) {
      setMessage(error.response?.data?.message || " Failed to add address.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4"> Add New Address</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
      
        <input type="text" placeholder="Address Details" className="border p-2 w-full rounded"
          value={address.details} onChange={(e) => setAddress({ ...address, details: e.target.value })} required />
        <input type="text" placeholder="Phone Number" className="border p-2 w-full rounded"
          value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} required />
        <input type="text" placeholder="City" className="border p-2 w-full rounded"
          value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />

        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Address"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
