import axios from "axios";

export default function VerifyToken() {
  
  async function verifyToken() {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("No token found");
        return null;
      }
  
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("✅ Token verification response:", response.data);
      return response.data; 
    } catch (error) {
      console.error("Token verification failed:", error.response?.data || error);
      return null;
    }
  }
}
