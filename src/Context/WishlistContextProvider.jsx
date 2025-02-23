import axios from 'axios';
import React, { createContext, useState } from 'react'


export let wishlistContext = createContext()
export default  function WishlistContextProvider({ children }) {
    
    let token = localStorage.getItem('token');
    // console.log("Token:", token);
    const [productsWishlist, setProductsWishlist] = useState(null)
    const [wishlistCount, setwishlistCount] = useState(null)

    

    async function addToWishList(productId) {
        try {
            const response = await axios.post(
                'https://ecommerce.routemisr.com/api/v1/wishlist',
                { productId },
                { headers: { token } }
            );
    
            console.log('Product added to wishlist successfully:', response.data);
            
            // ✅ تحديث قائمة المفضلة مباشرة بعد الإضافة
            await getWishlistProducts();
    
            return response.data; 
        } catch (err) {
            console.error('Error adding product to wishlist:', err);
            return err.response?.data || { message: 'Something went wrong' };
        }
    }
    

    async function getWishlistProducts() {
        try {
            if (!token) {
                console.error('No token found in local storage');
                return;
            }
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token },
            });
    
            setProductsWishlist(response.data);
            setwishlistCount(response.data.count ?? response.data.length ?? 0); // ✅ تحديث العدد مباشرة
        } catch (err) {
            console.error('Error getting wishlist products:', err);
        }
    }
    
    

    async function removeItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , 
            {
                headers: { token }
            }
        )
        .then((response)=>{
            console.log(response);
            getWishlistProducts()
            return true
        })
        .catch((err)=>{
            console.error("Error removing item from Wishlist", err);
            return err.response?.data || { message: "Something went wrong" };
        })
    }






    return <wishlistContext.Provider value={{ addToWishList , getWishlistProducts , productsWishlist , removeItem , wishlistCount  }}>
        { children }
    </wishlistContext.Provider>
}

