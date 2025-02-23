import React, { useEffect, useState } from "react";
import Style from "./AllOrders.module.css";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);


  // استخراج userId من الـ token
  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  async function getUserOrders() {
    try {
      if (!token || !userId) {
        throw new Error("User not authenticated");
      }
  
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
        headers: { token },
      });
  
      console.log("API Response:", response.data);
  
      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data.data);
        localStorage.setItem("userOrders", JSON.stringify(response.data)); // حفظ الطلبات في LocalStorage
      } else {
        console.warn("Unexpected API response format:", response.data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }
  
  

  useEffect(() => {
    const savedOrders = localStorage.getItem("userOrders");
  
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      
      // ✅ تحديث فقط إذا كانت البيانات الجديدة مختلفة عن الحالية
      if (JSON.stringify(parsedOrders) !== JSON.stringify(orders)) {
        console.log("Loaded orders from localStorage:", parsedOrders);
        setOrders(parsedOrders);
      }
  
      setLoading(false);
    } else {
      getUserOrders();
    }
  }, []); // ✅ تحميل الطلبات مرة واحدة عند تحميل الصفحة فقط
  

  if (loading) return <p>Loading orders...</p>;

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
  
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          My Orders
        </h2>
        <p className="text-gray-600 mb-6 text-center sm:text-left">
          Track and manage all your orders easily.
        </p>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr className="text-xs sm:text-sm">
                  <th className="py-3 px-2 sm:px-6 text-left">Order ID</th>
                  <th className="py-3 px-2 sm:px-6 text-left">Date</th>
                  <th className="py-3 px-2 sm:px-6 text-left">Items</th>
                  <th className="py-3 px-2 sm:px-6 text-left">Status</th>
                  <th className="py-3 px-2 sm:px-6 text-left">Total</th>
                  <th className="py-3 px-2 sm:px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="py-4 px-2 sm:px-6 text-blue-500 font-semibold">
                      #{order.id}
                    </td>
                    <td className="py-4 px-2 sm:px-6">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-2 sm:px-6">
                      {order.cartItems.map((item, index) => (
                        <div key={index} className="flex flex-wrap items-center gap-2">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <span className="text-xs sm:text-sm">{item.product.title}</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-2 sm:px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm ${
                          order.isDelivered ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-2 sm:px-6 font-bold">{order.totalOrderPrice} EGP</td>
                    <td className="py-4 px-2 sm:px-6 text-center">
                      <button className="bg-blue-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md mr-1 sm:mr-2 text-xs sm:text-sm hover:bg-blue-700">
                        🚚 Track
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm hover:bg-red-700">
                        ✖ Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
  
}
