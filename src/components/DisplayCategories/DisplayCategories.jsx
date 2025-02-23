import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function DisplayCategories() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => (await axios.get('https://ecommerce.routemisr.com/api/v1/categories')).data,
  });

  function handleCategoryClick(categoryId) {
    navigate(`/categories/${categoryId}/subcategories`);
  }

  function getSpecificCategories(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then(res => setCategories(res.data.data))
      .catch(() => alert('Category Not Found'));
  }

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center"><FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" /></div>;
  }
  
  if (isError) {
    return <div className="text-red-500 text-center">Error: {error.message}</div>;
  }
  
  return (
    <>
      <Helmet>
        <title>Display Categories</title>
      </Helmet>

      <div className="container mx-auto p-6 mt-20">
        <Link to="/subcategories" className="inline-block bg-green-500  text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition-all text-lg mb-6">
            All SubCategories
        </Link>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {data?.data.map(category => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className="shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105 border border-gray-200 cursor-pointer"
            >
              <img className="w-full h-48 object-cover" src={category.image} alt={category.name} />
              <div className="p-4 text-center">
                <Link to={`/categories/${category._id}/subcategories`} className="text-lg font-semibold text-green-600 hover:underline">
                  {category.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {categories && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-600">{categories.name}</h2>
              <button className="text-red-500 text-lg" onClick={() => setCategories(null)}>✕</button>
            </div>
            <img src={categories.image} alt={categories.name} className="w-full h-60 object-cover rounded-md" />
            <button className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg w-full" onClick={() => setCategories(null)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
