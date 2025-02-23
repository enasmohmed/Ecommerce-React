import React, { useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brand, setBrand] = useState(null)

  async function getBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  let { data , error , isError , isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  })

  function getSpecificBrands(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{
      setBrand(res.data.data)
    })
    .catch(()=>{
      error("Product Not Found")
    })
  }

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" />
      </div>
    );
  }
  
  
  if (isError) {
    return <div className="text-red-500 text-center">Error: {error.message}</div>;
  }


  function handleCardClick(id) {
    getSpecificBrands(id); 
  }

  

  return <>

      <Helmet>
        <title>Brands</title>
      </Helmet>
    {/* {data?.data.data.map((brand)=>
      <div key={brand._id} className='mr-2'>
        <img className='w-10 h-10' src={brand.image} alt={brand.name} />
      </div> */}

  <div className="container mx-auto p-4 mt-20">
      <h2 className="text-center text-2xl font-bold text-green-600 mb-6">All Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data.data.map((brand) => (
          <div
            key={brand._id}
            className="bg-white shadow-lg border border-green-400 rounded-md overflow-hidden hover:shadow-lg hover:shadow-green-500 hover:border-green-500 transition-all duration-300 text-center cursor-pointer"
            onClick={() => handleCardClick(brand._id)}>
            <div className="p-4">
              <img className="w-full h-32 object-cover mb-4" src={brand.image}  alt={brand.name} />
              <h3 className="text-black text-lg font-medium">{brand.name}</h3>
            </div>
          </div>
        ))}
    </div>
  </div>


   {/* Modal */}
      {brand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-600">{brand.name}</h2>
              <button
                className="text-gray-500 hover:text-red-600"
                onClick={() => setBrand(null)}
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-48 object-contain"
              />
              {/* <p className="mt-4 text-gray-600">{selectedBrand.slug}</p> */}
            </div>
            <div className="mt-6 text-right">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                onClick={() => setBrand(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    


  </>
}
