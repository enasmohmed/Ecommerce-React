import React, { useContext, useState } from 'react'
import Style from './Payment.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Payment() {

  const [cash, setcash] = useState(false)

  let navigate = useNavigate()

  let { cartId } = useContext(cartContext)

  function cashPayment(values){
    console.log(values);
    
    
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` , values ,{
      headers : {
        token: localStorage.getItem("token")
      }
    })
    .then((res)=>{
      toast.success("Payment Successful");
      // console.log("Payment Successful" , res);
      navigate("/allorders")
      // getCart()
    })
    .catch((err)=>{
      console.error("Payment Error", err);
      toast.error("Error in payment");
    })
  }

  function onlinePayment(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/allorders`, values , {
      headers : {
        token: localStorage.getItem("token")
      }
    })
    .then((res)=>{
      // console.log(res.data.session.url);
      toast.success("Payment Successful");
      window.open(res.data.session.url , "_self")
    })
    .catch((err)=>{
      console.error("Payment Error", err);
      toast.error("Error in payment");
    })
  }

  function paymentMethod(values){
    let apiObj = {
      shippingAddress: values
    }

    if(cash){
      cashPayment(apiObj)
    }else{
      onlinePayment(apiObj)
    }
  }


  let formikPayment = useFormik({
    initialValues: {
      details:'',
      phone: '',
      city: '',
    },
    // validationSchema: {},
    onSubmit:paymentMethod
  })

  async function handlePaymentSuccess() {
    
    navigate("/all-orders"); 
  }

  return <>

 
      <Helmet>
        <title>Payment</title>
      </Helmet> 


      <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
        <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Payment Details</h2>

          <form onSubmit={formikPayment.handleSubmit} className="space-y-6">

            {/* Details */}
            <div className="relative">
              <input
                name="details"
                value={formikPayment.values.details}
                onChange={formikPayment.handleChange}
                type="text"
                className="peer block w-full border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-gray-900 focus:border-green-500 focus:outline-none"
                placeholder=" " required
              />
              <label className="absolute top-3 text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-green-600">
                Details
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <input
                name="phone"
                value={formikPayment.values.phone}
                onChange={formikPayment.handleChange}
                type="tel"
                className="peer block w-full border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-gray-900 focus:border-green-500 focus:outline-none"
                placeholder=" " required
              />
              <label className="absolute top-3 text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-green-600">
                Phone
              </label>
            </div>

            {/* City */}
            <div className="relative">
              <input
                name="city"
                value={formikPayment.values.city}
                onChange={formikPayment.handleChange}
                type="text"
                className="peer block w-full border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-gray-900 focus:border-green-500 focus:outline-none"
                placeholder=" " required
              />
              <label className="absolute top-3 text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-green-600">
                City
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setcash(true)}
                type="submit"
                className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-all ${
                  cash ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                Cash Payment
              </button>
              <button
                onClick={() => setcash(false)}
                type="submit"
                className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-all ${
                  !cash ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                Online Payment
              </button>
            </div>

          </form>
        </div>
      </div>

  </>
}
