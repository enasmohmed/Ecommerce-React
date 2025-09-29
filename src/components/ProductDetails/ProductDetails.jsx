import React, { useContext, useEffect } from 'react'
import Style from './ProductDetails.module.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Circles } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/CartContextProvider'


export default function ProductDetails() {
  let {id, category} = useParams()

  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState(null)
  const [error, setError] = useState(null)
  const { addToCart } = useContext(cartContext);



  async function addProductToCart(id) {
    let result = await addToCart(id);
    console.log("Result from addToCart:", result);
    if (result.data) {
      toast.success("Product added to cart successfully!");
    } else {
      toast.error("Error adding product to cart. Please try again later.");
    }
  }

  async function getProducts(){
    let res = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    console.log(res.data.data);
    let newProduct = res.data.data.filter((product)=>product.category.name == category)
    // console.log("Related Producttttt",newProduct);
    setRelatedProducts(newProduct);
    
    // setRelatedProducts(res.data.data);
    // let products = res.data.data
    
  }

  
  function getSpecificProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      setProduct(res.data.data)
    })
    .catch(()=>{
      setError("Product Not Found")
    })
  }

  useEffect( ()=> {
    getSpecificProduct(id)  
    getProducts()
  } , [id])

  function LoadingSpinner() {
    return <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" />;
  }

  if(error){
    return <div className='text-center text-red-500'>Error: {error}</div>
  }
  

  return <>

      <Helmet>
        <title>Product Details</title>
      </Helmet>


    {/* تفاصيل المنتج */}
      <div className="container mx-auto px-4 mt-20">
        {product ? (
          <div className="bg-white shadow-xl rounded-lg p-6 md:p-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div>
              <img className="w-full max-w-sm mx-auto rounded-lg" src={product?.imageCover} alt="" />
            </div>
            <div>
              <h2 className="py-2 text-2xl font-bold">{product?.title}</h2>
              <h3 className="text-green-500 text-lg my-3">{product?.category?.name}</h3>
              <p className="text-gray-500">{product?.description}</p>
    
              <div className="flex justify-between text-lg mt-4">
                {product?.priceAfterDiscount ? (
                  <div>
                    <span className="text-red-600 line-through">{product?.price} </span>
                    <span className="font-bold">{product?.priceAfterDiscount} EGP</span>
                  </div>
                ) : (
                  <span className="font-bold">{product?.price} EGP</span>
                )}
                <span>
                  <i className="fas fa-star text-yellow-500"></i> {product?.ratingsAverage}
                </span>
              </div>
    
              <button
              onClick={(e) => {
                e.preventDefault();
                addProductToCart(product._id);
              }}
              className="mt-4 w-full py-2 text-white bg-green-500 hover:bg-green-600 transition-all rounded-md font-semibold">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <LoadingSpinner />
        </div>
      )}
    </div>

    <hr className="my-12 border-gray-300" />

      {/* المنتجات ذات الصلة */}
      <div className="container mx-auto px-4 mt-5">
        <h2 className='text-[20px] font-semibold text-center my-6'>Related Products</h2>
        {relatedProducts ? (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {relatedProducts.map((product) => (
              <div key={product._id} className="cursor-pointer group shadow-lg p-3 rounded-md transition-transform hover:scale-105">
                <Link to={`/productDetails/${product._id}/${product?.category?.name}`}>
                  <img className="w-full max-w-sm mx-auto rounded-md" src={product.imageCover} alt={product.title} />
                  <h3 className="text-green-500 text-sm mt-2">{product.category.name}</h3>
                  <h2 className="py-2 text-lg font-semibold">{product.title.split(" ", 2).join(" ")}</h2>

                  <div className="flex justify-between text-sm">
                    {product.priceAfterDiscount ? (
                      <div>
                        <span className="text-red-600 line-through">{product.price} </span>
                        <span className="font-bold">{product.priceAfterDiscount} EGP</span>
                      </div>
                    ) : (
                      <span className="font-bold">{product.price} EGP</span>
                    )}
                    <span>
                      <i className="fas fa-star text-yellow-500"></i> {product.ratingsAverage}
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
                className="mt-3 w-full py-2 text-white bg-green-500 hover:bg-green-600 transition-all rounded-md font-semibold">
                  Add To Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-screen flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    
    
  </>
}
