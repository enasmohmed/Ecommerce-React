import React, { useContext, useEffect, useState } from 'react'
import Style from './DisplayProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/WishlistContextProvider';
// import { Circles } from 'react-loader-spinner'

//  https://ecommerce.routemisr.com/api/v1/products
export default function DisplayProducts() {
  const { addToCart } = useContext(cartContext);
  const { addToWishList } = useContext(wishlistContext);
  const [products, setProducts] = useState([]);

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    addProductToWishList(productId); 
  };



  async function addProductToWishList(id) {
    const result = await addToWishList(id);
    console.log("Result from addToWishList:", result);
    if (result.status === "success") {  
        toast.success("Product added to WishList successfully!");

        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === id ? { ...product, isFavorite: !product.isFavorite } : product
            )
        );
    } else {
        toast.error("Error adding product to WishList. Please try again later.");
    }
}


  async function addProductToCart(id) {
    let result = await addToCart(id);
    console.log("Result from addToCart:", result);
    if (result.data) {
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Error adding product to cart. Please try again later.");
    }
  }

  async function callApi() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        console.log("API Response:", response.data); 
        console.log("Products state:", products);

        return response;
    } catch (error) {
        console.error("API Error:", error);
    }
}


  useEffect(() => {
    if (data?.data?.data) {
      setProducts(data.data.data);
    }
  }, []);
  

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: callApi,
    onSuccess: async (response) => {
      if (response?.data?.data) {
        
        const wishlistResponse = await getWishlistProducts();
        const wishlistIds = wishlistResponse?.data?.map(item => item._id) || [];
  
      
        setProducts(response.data.data.map(product => ({
          ...product,
          isFavorite: wishlistIds.includes(product._id)
        })));
      }
    }
  });
  

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="3x"
          className="text-green-500"
        />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center">Error: {error.message}</div>;
  }

  return <>

  <div className="container mx-auto px-4 mt-20">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {(products.length > 0 ? products : data?.data?.data || []).map((product) => (
        <div 
          key={product._id} 
          className="relative shadow-md border border-gray-300 p-2 rounded-lg bg-white transition-all hover:shadow-lg"
        >
          <Link to={`/productDetails/${product._id}/${product?.category?.name}`}>
            
            <img className="w-full rounded" src={product.imageCover} alt={product.title} />

            <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product._id);
                }}
                className="absolute top-2 right-2 p-2 rounded-md hover:bg-red-100 transition-all"
              >
              
                <i className={`fas fa-heart ${favorites[product._id] ? "text-red-500" : "text-gray-500"} text-xl`}></i>
            </button>
          
            <h3 className="text-green-500 text-xs mt-1">{product.category.name}</h3>
            <h2 className="py-1 text-sm font-semibold text-gray-700"> {product.title.split(" ", 2).join(" ")}</h2>

            <div className="flex justify-between items-center text-xs text-gray-600">
              {product.priceAfterDiscount ? (
                <div>
                  <span className="text-red-500 line-through">{product.price}{" "} EGP</span>
                  <span className="ml-1 font-bold text-black">{product.priceAfterDiscount} EGP</span>
                </div>
              ) : (
                <span className="font-bold">{product.price} EGP</span>
              )}
              <span className="flex items-center">
                <i className="fas fa-star text-yellow-500 text-xs">{" "}</i>
                <span className="ml-1">{product.ratingsAverage}</span>
              </span>
            </div>

            {product.priceAfterDiscount && (
                <span className="absolute top-0 bg-red-600 text-white rounded-b-md p-1">
                  Sale
                </span>
              )}
          </Link>

      
          <button
            onClick={(e) => {
              e.preventDefault();
              addProductToCart(product._id);
            }}
            className="hover:bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] hover:text-white transition-all duration-300 border border-[#6D28D9] rounded-md w-full py-2 mt-2 text-[#6D28D9] font-semibold"
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  </div>

  </>
}
