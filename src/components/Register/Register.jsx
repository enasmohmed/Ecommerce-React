import React, { useContext, useState } from 'react'
import Style from './Register.module.css'
import { useFormik, validateYupSchema } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import { authContext } from '../../Context/AuthContextProvider';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";

export default function Register() {
  let {setToken} = useContext(authContext)

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate()

  function handleRegister(values){
    setisLoading(true);
    console.log("values", values);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
    .then((res)=>{
      console.log(res);
      navigate('/')
      localStorage.setItem("token", res.data.token)
      setToken(res.data.token)
      setisLoading(false)
    })
    .catch((error)=>{
      console.log(error.response.data.message);

      setErrorMessage(error.response.data.message)
      setisLoading(false)
    }).finally(()=>{
      setisLoading(false)
    })
    
  }

  let validationSchema = Yup.object().shape(
    {
      name: Yup.string()
      .min(3, 'Name must be 3 to 10 letters long')
      .max(10, 'Name must be 3 to 10 letters long')
      .required('Name is required'),
      email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
      password: Yup.string()
      .matches(/^[A-Za-z]\w{6,8}$/)
      .min(8, 'Password Start with letter and min 6 to max 8')
      .required('Password is required'),
      rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password and rePassword not match')
      .required('Confirm rePassword is required'),
      phone: Yup.string()
      .matches(/^01[0125]\d{8}$/, 'Invalid Egyption phone number')
      .required('Phone is required')
    }
  )
  // function validation(values){
  //   let error = {}

  //   if(values.name == ""){
  //     error.name = "Name is required"
  //   }else if(!/^[A-Za-z]{3,6}$/.test(values.name)){
  //     error.name = "name must be 3 to 10 letters long"
  //   }

  //   if(values.phone == ""){
  //     error.phone = "Phone is required"
  //   }else if(!/^01[0125]\d{}8$/.test(values.phone)){
  //     error.phone = "phone must be Egyption phone number"
  //   }

  //   return error
  // }



  let formikRegister = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },

    validationSchema,
    onSubmit: handleRegister    
  })
  formikRegister.errors




  return<>

      <Helmet>
        <title>Register</title>
      </Helmet>

  <div className='container mx-auto mt-20'>
    {errorMessage != null ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
      <span class="font-medium">{errorMessage}</span> 
    </div> : null }
    <form onSubmit={formikRegister.handleSubmit} className="w-[50%] m-auto">
        <h2 className="my-5">Register Now:</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Name:</label>
          <input 
          name='name'
          value={formikRegister.values.name}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="text" id="name" className="bg-gray-100 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
        </div>
        {formikRegister.errors.name && formikRegister.touched.name ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
          <span class="font-medium">{formikRegister.errors.name}</span> 
        </div> : null}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email:</label>
          <input
          name='email'
          value={formikRegister.values.email}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="email" id="email" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John@gmail.com" />
        </div>

        {formikRegister.errors.email && formikRegister.touched.email ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
          <span class="font-medium">{formikRegister.errors.email}</span> 
        </div> : null}

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password:</label>
          <input 
          name='password'
          value={formikRegister.values.password}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="password" id="password" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" />
        </div>
        {formikRegister.errors.password && formikRegister.touched.password ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
          <span class="font-medium">{formikRegister.errors.password}</span> 
        </div> : null}

        <div className="mb-4">
          <label htmlFor="repassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">rePassword:</label>
          <input 
          name='rePassword'
          value={formikRegister.values.rePassword}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="password" id="repassword" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*****"  />
        </div>
        {formikRegister.errors.rePassword && formikRegister.touched.rePassword ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
          <span class="font-medium">{formikRegister.errors.rePassword}</span> 
        </div> : null}

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone:</label>
          <input 
          name='phone'
          value={formikRegister.values.phone}
          onChange={formikRegister.handleChange}
          onBlur={formikRegister.handleBlur}
          type="tel" id="phone" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456789" />
        </div>
        {formikRegister.errors.phone && formikRegister.touched.phone ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
      <span class="font-medium">{formikRegister.errors.phone}</span> 
    </div> : null}

        <button disabled={isLoading?true:false} type='submit' className="bg-green-500 rounded-md  p-2 text-slate-100">{isLoading? <i className='fas fa-spin fa-spinner'></i>: "Register"}</button>
    </form>
  </div>


  </>
}
