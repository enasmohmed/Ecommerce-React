import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

  if(localStorage.getItem('token')){
    return children
  }else {
    return <>
      <Navigate to={"/Login"} />
    </>
  }

  
}
