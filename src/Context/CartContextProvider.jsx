import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [productsCart, setProductsCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState(null);

  // ✅ تحميل بيانات السلة عند تشغيل التطبيق إذا كان هناك Token
  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]); // 🔄 يشتغل فقط عند تغيير الـ token

  // ✅ جلب بيانات السلة من API
  function getCart() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token } })
      .then((response) => {
        console.log("Cart Response:", response.data);
        setNumOfCartItems(response.data.numOfCartItems || 0);
        setTotalCartPrice(response.data.data.totalCartPrice || 0);
        setProductsCart(response.data.data.products || []);
        setCartId(response.data.data._id || null);
      })
      .catch((err) => {
        console.error("Error getting cart", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ✅ إضافة منتج إلى السلة وتحديث العدد فورًا
  async function addToCart(productId) {
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers: { token } })
      .then((response) => {
        console.log("Added to cart:", response.data);
        setNumOfCartItems((prev) => prev + 1); // ✅ زيادة العدد مباشرة
        return response.data;
      })
      .catch((err) => {
        console.error("Error adding product to cart", err);
        return err.response?.data || { message: "Something went wrong" };
      });
  }

  // ✅ حذف منتج من السلة وتحديث العدد فورًا
  async function removeItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: { token } })
      .then((response) => {
        console.log("Removed from cart:", response.data);
        setNumOfCartItems((prev) => Math.max(prev - 1, 0)); // ✅ تقليل العدد مباشرة
        setProductsCart((prev) => prev.filter((item) => item._id !== productId)); // ✅ تحديث المنتجات بدون API
        return true;
      })
      .catch((err) => {
        console.error("Error removing item from cart", err);
        return err.response?.data || { message: "Something went wrong" };
      });
  }

  // ✅ تحديث كمية منتج داخل السلة
  function updateQuantityCart(productId, count) {
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, { headers: { token } })
      .then((response) => {
        console.log("Updated quantity:", response.data);
        setProductsCart((prev) =>
          prev.map((item) => (item._id === productId ? { ...item, count } : item))
        ); // ✅ تحديث الكمية محليًا لتجنب استدعاء API
      })
      .catch((err) => {
        console.error("Error updating item in cart", err);
      });
  }

  // ✅ تفريغ السلة وتحديث البيانات فورًا
  function clearCart() {
    axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token } })
      .then(() => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setProductsCart([]);
        setCartId(null);
      })
      .catch((err) => {
        console.error("Error clearing cart", err);
      });
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        clearCart,
        cartId,
        updateQuantityCart,
        isLoading,
        removeItem,
        getCart,
        numOfCartItems,
        totalCartPrice,
        productsCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
