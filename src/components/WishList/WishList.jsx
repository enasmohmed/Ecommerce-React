import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../Context/WishlistContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import { cartContext } from '../../Context/CartContextProvider';

export default function WishList() {
  const { getWishlistProducts , updateCartCount , productsWishlist ,removeItem , isLoading  } = useContext(wishlistContext);
  const { addToCart, getCart } = useContext(cartContext);
  // const { removeItemWishList } = useContext(wishlistContext);
    useEffect(  ()=> {
      getWishlistProducts()
    } , [] )
  

 
    
    // console.log('Products in Wishlist:', productsWishlist);

    async function removeItemWishList(productId) {
      let flag = await removeItem(productId)
      if(flag){
        toast.success("Product Removed Successfully")
      }else{
        toast.error("Error removing item from Wishlist. Please try again later.")
      }
    } 
    

    if (isLoading) {
        return (
          <div className="h-screen flex justify-center items-center">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" />
          </div>
        );
      }


  

    
  return <>
      <Helmet>
        <title>WishList</title>
      </Helmet>



      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-5">
          <thead className="text-xs text-gray-700 uppercase bg-green-50 dark:bg-green-100 dark:text-green-800">
            <tr>
              <th scope="col" className="px-16 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {productsWishlist?.data.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-green-50 dark:border-green-700 border-green-200 hover:bg-green-50 dark:hover:bg-green-600"
              >
                <td className="p-4">
                  <img
                    src={product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-green-900 dark:text-green-900">
                  {product.title}
                </td>
                <td className="px-6 py-4 font-semibold text-green-900 dark:text-green-900">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span onClick={()=>{removeItemWishList(product._id)}}
                    
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

<div className="container mx-auto px-4 py-8 mt-20">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
    Wishlist ❤️
  </h2>

  {productsWishlist?.data.length === 0 ? (
    <p className="text-center text-gray-500">Your wishlist is empty.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productsWishlist?.data.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition"
        >
          {/* صورة المنتج */}
          <div className="flex justify-center">
            <img
              src={product.imageCover}
              alt={product.title.split(" ", 2).join(" ")}
              className="w-40 h-40 object-cover rounded-md"
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.title}
            </h3>
            <p className="text-gray-600 mt-1">{product.price} EGP</p>
          </div>

          {/* زر الحذف وزر الإضافة إلى الحقيبة */}
          <div className="mt-4 flex flex-col space-y-2">
            <button onClick={async () => {
                    await addToCart(product._id);  // ✅ إضافة المنتج إلى السلة
                    await removeItemWishList(product._id);  // ✅ حذفه من المفضلة
                    getCart();  // ✅ تحديث عدد المنتجات في أيقونة السلة
                  }}  className="bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-700">
              MOVE TO BAG
            </button>
            <button
              onClick={() => removeItemWishList(product._id)}
              className="text-red-600 font-medium hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


  
  </>
}
