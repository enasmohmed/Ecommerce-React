import React from 'react'
import Style from './Products.module.css'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import { Helmet } from 'react-helmet'

export default function Products() {
  return <>

      <Helmet>
        <title>Products</title>
      </Helmet>
    <DisplayProducts />
  </>
}
