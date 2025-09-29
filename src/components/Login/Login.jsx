import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import { useFormik, validateYupSchema } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import * as Yup from "yup";
import { authContext } from '../../Context/AuthContextProvider';
import { Helmet } from 'react-helmet';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import VerifyResetCode from '../VerifyResetCode/VerifyResetCode';

export default function Login() {
  let {setToken} = useContext(authContext)

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate()
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);

  function handleLogin(values){
    setisLoading(true);
    console.log("values", values);
    axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
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
      email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
      password: Yup.string()
      .matches(/^[A-Za-z]\w{6,8}$/)
      .min(8, 'Password Start with letter and min 6 to max 8')
      .required('Password is required'),
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



  let formikLogin = useFormik({
    initialValues: {
      email: 'test@shop.com',
      password: 'A1234567', 
    },

    validationSchema,
    onSubmit: handleLogin    
  })
  formikLogin.errors




  return<>

      <Helmet>
        <title>Login</title>
      </Helmet>

  <div className='container mx-auto mt-20'>
    {errorMessage != null ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
      <span class="font-medium">{errorMessage}</span> 
    </div> : null }
    <form onSubmit={formikLogin.handleSubmit} className="w-[50%] m-auto">
        <h2 className="my-5">Login Now:</h2>
    
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email:</label>
          <input
          name='email'
          value={formikLogin.values.email}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          type="email" id="email" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John@gmail.com" />
        </div>

        {formikLogin.errors.email && formikLogin.touched.email ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
          <span class="font-medium">{formikLogin.errors.email}</span> 
        </div> : null}

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password:</label>
          <input 
          name='password'
          value={formikLogin.values.password}
          onChange={formikLogin.handleChange}
          onBlur={formikLogin.handleBlur}
          type="password" id="password" className="bg-gray-50 border border-gray-900 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" />
        </div>
        {formikLogin.errors.password && formikLogin.touched.password ? <div class="p-4 mb-4 text-sm text-center text-red-900 rounded-lg bg-red-50 dark:bg-red-100 dark:text-red-900" role="alert">
          <span class="font-medium">{formikLogin.errors.password}</span> 
        </div> : null}

    
        <button disabled={isLoading?true:false} type='submit' className="bg-green-500 rounded-md  p-2 text-slate-100">{isLoading? <i className='fas fa-spin fa-spinner'></i>: "Login"}</button>

        <p className="mt-4 text-center">
          <button type="button" className="text-blue-600" onClick={() => setShowForgotPassword(true)}>
            Forgot Password?
          </button>
        </p>
    </form>
    {showForgotPassword && (
        <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
      )}

    
      {showVerifyCode && (
        <VerifyResetCode setShowVerifyCode={setShowVerifyCode} setShowResetPassword={() => {}} />
      )}
  </div>


  </>
}
