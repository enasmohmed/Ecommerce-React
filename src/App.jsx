import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'
import Brands from './components/Brands/Brands'
import Products from './components/Products/Products'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import AuthContextProvider from './Context/AuthContextProvider'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CartContextProvider } from './Context/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import WishList from './components/WishList/WishList'
import DisplayCategories from './components/DisplayCategories/DisplayCategories'
import WishlistContextProvider from './Context/WishlistContextProvider'
import AllSubCategories from './components/AllSubCategories/AllSubCategories'
import SubCategoryDetails from './components/SubCategoryDetails/SubCategoryDetails'
import SubCategoryDetailPage from './components/SubCategoryDetailPage/SubCategoryDetailPage'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import { ToastContainer } from 'react-toastify'
import ChangePassword from './components/ChangePassword/ChangePassword'
import VerifyToken from './components/VerifyToken/VerifyToken'
import AddAddressForm from './components/AddAddressForm/AddAddressForm'




let client = new QueryClient()


function App() {


  let router = createHashRouter ([
    {path:"", element:<Layout />, children: [
      {path:"", element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path:"cart", element:<ProtectedRoute><Cart /></ProtectedRoute>},
      {path:"wishlist", element:<ProtectedRoute><WishList /></ProtectedRoute>},
      {path:"payment", element:<ProtectedRoute><Payment /></ProtectedRoute>},
      {path:"products", element:<ProtectedRoute><Products /></ProtectedRoute>},
      {path:"categories", element:<ProtectedRoute><DisplayCategories /></ProtectedRoute>},


      {path:"subcategories", element:<ProtectedRoute><AllSubCategories /></ProtectedRoute>},

      {path:"subcategory/:subcategoryId", element:<ProtectedRoute><SubCategoryDetailPage /></ProtectedRoute>},

      {path:"categories/:categoryId/subcategories", element:<ProtectedRoute><SubCategoryDetails /></ProtectedRoute>},
      
      
      {path:"allorders", element:<ProtectedRoute><AllOrders /></ProtectedRoute>},




      {path:"productDetails/:id/:category", element:<ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path:"brands", element:<ProtectedRoute><Brands /></ProtectedRoute>},

      


      {path:"forgetpassword", element:<ForgotPassword />},

      {path:"verify-reset-code", element:<VerifyResetCode />},

      {path:"update-Me", element:<VerifyResetCode />},

      {path:"reset-password", element:<ResetPassword />},

      {path:"change-password", element:<ProtectedRoute><ChangePassword /></ProtectedRoute>},
      
      {path:"verify-token", element:<ProtectedRoute><VerifyToken /></ProtectedRoute>},

      {path:"addresses", element:<ProtectedRoute><AddAddressForm /></ProtectedRoute>},


      {path:"login", element:<Login />},
      {path:"register", element:<Register />},
      {path:"*", element:<NotFound />}
    ]}
  ])

  return <>
      <AuthContextProvider>

          <CartContextProvider>

            <WishlistContextProvider >

              <QueryClientProvider client={client}>
                  <ToastContainer position="top-center" autoClose={3000} />
                  <Toaster />
                  <RouterProvider router={router} />

              </QueryClientProvider>

            </WishlistContextProvider>

          </CartContextProvider>

      </AuthContextProvider>
  
    </>
}

export default App
