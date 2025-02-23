import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios';

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          dots: true,
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true, 
          arrows: false, 
        }
      }
    ]
  };

  return (
    <>
      <h2 className='text-[20px] font-semibold text-center my-6'>Shop Popular Categories</h2>
      <Slider {...settings} className='mb-14 mt-6'>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="px-2">
              <img 
                className='w-full h-[200px] block object-cover rounded-lg shadow-md' 
                src={category.image} 
                alt={category.name} 
              />
              <p className='text-center mt-2 text-gray-700 font-medium'>{category.name}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading categories...</p>
        )}
      </Slider>
    </>
  );
}
