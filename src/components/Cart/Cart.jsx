import React, { useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { useContext } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  let { getCart ,clearCart , updateQuantityCart , removeItem , isLoading , numOfCartItems , totalCartPrice , productsCart } = useContext(cartContext)

  async function removeItemCart(productId) {
    let flag = await removeItem(productId);
    if(flag){
      toast.success("Product Removed Successfully");
      getCart(); // تحديث البيانات بعد الحذف للتأكد من مزامنتها مع السيرفر
    } else {
      toast.error("Error removing item from cart. Please try again later.");
    }
  }

  useEffect(  ()=> {
    getCart()
  } , [] )

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" />
      </div>
    );
  }

  const handlePayment = () => {
    // استدعاء API الدفع أو الانتقال إلى صفحة الدفع
    console.log("Redirecting to payment...");
    window.location.href = "/payment"; // توجيه المستخدم يدويًا
  };
  

  return <>

      <Helmet>
        <title>Cart</title>
      </Helmet>


      <div className="container mx-auto my-8 p-4 md:p-8 bg-gray-100 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 🛒 سلة التسوق */}
        <div className="md:col-span-2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Shopping Cart</h1>

          {productsCart?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="text-gray-500 border-b text-sm md:text-base">
                    <th className="py-3 text-left">Product</th>
                    <th className="py-3 text-center">Quantity</th>
                    <th className="py-3 text-center">Price</th>
                    <th className="py-3 text-center">Total</th>
                    <th className="py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productsCart.map((product) => (
                    <tr key={product.product._id} className="border-b text-sm md:text-base">
                      <td className="py-4 flex items-center gap-4">
                        <img src={product.product.imageCover} alt={product.product.title} className="w-12 h-12 md:w-16 md:h-16 rounded-lg" />
                        <div>
                          <p className="font-semibold">{product.product.title}</p>
                          <span className="text-xs md:text-sm text-gray-500">{product.product.brand.name}</span>
                        
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => updateQuantityCart(product.product._id, product.count - 1)}
                            className="border px-2 py-1 rounded"
                          >
                            -
                          </button>
                          <span className="mx-3">{product.count}</span>
                          <button
                            onClick={() => updateQuantityCart(product.product._id, product.count + 1)}
                            className="border px-2 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-center">{product.price} EGP</td>
                      <td className="py-4 text-center">{product.count * product.price} EGP</td>
                      <td className="py-4 text-center">
                        <button
                          onClick={() => removeItemCart(product.product._id)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <Link to="/" className="text-blue-500 hover:underline text-sm md:text-base">
              ← Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full md:w-auto"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* 🛍️ ملخص الطلب */}
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 md:mb-3 text-sm md:text-base">
            <span>Items:</span>
            <span>{productsCart?.length || 0}</span>
          </div>
          <div className="flex justify-between mb-2 md:mb-3 text-sm md:text-base">
            <span>Shipping:</span>
            <span>Standard Delivery - 50 EGP</span>
          </div>
          <div className="mb-3 md:mb-4">
            <label className="block text-gray-600 text-sm md:text-base">Promo Code</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded mt-1 text-sm md:text-base"
              placeholder="Enter your code"
            />
            <button className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
              APPLY
            </button>
          </div>
          <div className="flex justify-between text-base md:text-lg font-bold">
            <span>Total Cost:</span>
            <span>{(totalCartPrice || 0) + 50} EGP</span>
          </div>
          <button onClick={handlePayment} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  
  </>
}
