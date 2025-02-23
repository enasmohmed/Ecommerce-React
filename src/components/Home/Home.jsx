import React from 'react'
import Style from './Home.module.css'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return <>

      <Helmet>
        <title>Home</title>
      </Helmet>
    <MainSlider />
    <div className='my-10'>
      <CategorySlider />
    </div>
    <DisplayProducts />
  </>
}
