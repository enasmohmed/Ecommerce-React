import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = token ? jwtDecode(token).id : null;

  async function getUserOrders() {
    try {
      if (!token || !userId) {
        throw new Error("User not authenticated");
      }

      const url = `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`;
      console.log("Orders URL:", url);
      console.log("Token:", token);

      const response = await axios.get(url, {
        headers: { token },
      });

      console.log("API Response:", response.data);

      // ✅ بعض الـ APIs بترجع Array على طول، وبعضها بيرجع جوة data
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else if (Array.isArray(response.data.data)) {
        setOrders(response.data.data);
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
    getUserOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>

      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 mt-10">
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center sm:text-left">
            My Orders
          </h2>
          <p className="text-gray-600 mb-6 text-center sm:text-left">
            Track and manage all your orders easily.
          </p>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr className="text-xs sm:text-sm">
                    <th className="py-3 px-2 sm:px-6 text-left">Order ID</th>
                    <th className="py-3 px-2 sm:px-6 text-left">Date</th>
                    <th className="py-3 px-2 sm:px-6 text-left">Items</th>
                    <th className="py-3 px-2 sm:px-6 text-left">Status</th>
                    <th className="py-3 px-2 sm:px-6 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id || order._id}
                      className="border-b hover:bg-gray-100 transition"
                    >
                      <td className="py-4 px-2 sm:px-6 text-blue-500 font-semibold">
                        #{order.id || order._id}
                      </td>
                      <td className="py-4 px-2 sm:px-6">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="py-4 px-2 sm:px-6">
                        {order.cartItems?.map((item, index) => (
                          <div
                            key={index}
                            className="flex flex-wrap items-center gap-2"
                          >
                            <img
                              src={item.product?.imageCover}
                              alt={item.product?.title}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <span className="text-xs sm:text-sm">
                              {item.product?.title}
                            </span>
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
                      <td className="py-4 px-2 sm:px-6 font-bold">
                        {order.totalOrderPrice} EGP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
}
