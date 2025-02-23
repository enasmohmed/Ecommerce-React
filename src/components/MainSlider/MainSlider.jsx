import React from 'react'
import Style from './MainSlider.module.css'
import grocery1 from "../../assets/images/grocery-banner.png"
import grocery2 from "../../assets/images/grocery-banner-2.jpeg"

import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import Slider from 'react-slick';

export default function MainSlider() {

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // للأجهزة اللوحية (تابلت)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // للهواتف المتوسطة
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true, // يمكن إخفاء النقاط لو احتجتِ
        }
      },
      {
        breakpoint: 480, // للهواتف الصغيرة
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true, 
          arrows: false, // إخفاء الأسهم في الشاشات الصغيرة
        }
      }
    ]
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] my-10">
        <div className="overflow-hidden">
          <Slider {...settings} className="my-10">
            <div>
              <img className="h-[400px] w-full object-cover" src={slider1} alt="" />
            </div>
            <div>
              <img className="h-[400px] w-full object-cover" src={slider2} alt="" />
            </div>
            <div>
              <img className="h-[400px] w-full object-cover" src={slider3} alt="" />
            </div>
          </Slider>
        </div>
        <div className="hidden md:block my-10"> 
          <img src={grocery1} alt="" className="h-[200px] w-full object-cover" />
          <img src={grocery2} alt="" className="h-[200px] w-full object-cover"/>
        </div>
      </div>
    </>
  );
}
