import React from 'react'
import Style from './Footer.module.css'
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";


export default function Footer() {
  return <>
  <footer className="bg-slate-100 text-gray-400 py-8 px-4 md:px-16">
    <div className="container mx-auto flex flex-col items-center text-center">
      {/* App Promotion */}
      <h2 className="text-xl font-semibold text-[#6D28D9]">Get the Storezy app</h2>
      <p className="text-sm text-gray-700">
        We will send you a link, open it on your phone to download the app.
      </p>

      {/* Email Input */}
      <div className="mt-4 flex w-full max-w-md">
        <input
          type="email"
          placeholder="Email .."
          className="p-2 rounded-l-md text-black focus:outline-none w-full"
        />
        <button className="bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] text-white w-48 p-2 rounded-r-md hover:bg-[#452046]">
          Share App Link
        </button>
      </div>

      {/* Payment & App Download Section */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between w-full max-w-4xl">
        {/* Payment Partners */}
        <div className="mb-4 md:mb-0 flex flex-col items-center">
          <p className="font-medium">Payment Partners:</p>
          <div className="flex space-x-4 mt-2">
            {/* Amazon Pay */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/2560px-Amazon_Pay_logo.svg.png"
              alt="Amazon Pay"
              className="h-6"
            />
            
            {/* American Express */}
            <img
              src="https://block9consulting.com/wp-content/uploads/2023/03/American-Express-Color.png"
              alt="American Express"
              className="h-6"
            />

            {/* Mastercard */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="h-6"
            />

            {/* PayPal */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="PayPal"
              className="h-6"
            />
          </div>
        </div>


        {/* App Download Links */}
        <div className="flex flex-col items-center">
            <p className="font-medium">Get deliveries with Storezy:</p>
            <div className="flex space-x-4 mt-2">
              {/* App Store Button */}
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-10"
                />
              </a>
              
              {/* Google Play Button */}
              <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10"
                />
              </a>
            </div>
        </div>

      </div>

      {/* Social Icons & Copyright */}
      <div className="mt-6 flex flex-col items-center w-full">
        <div className="flex space-x-4 text-[#6D28D9] text-2xl">
          <FaInstagram />
          <FaFacebook />
          <FaTwitter />
          <FaLinkedin />
        </div>
        <p className="mt-2 text-sm">
          © 2025 <span className="font-semibold text-[#6D28D9]">Storezy</span>. All rights reserved.
          Made with <span className="text-red-500">❤️</span> by <span className="font-semibold text-[#6D28D9]">Enas Mohamed</span>
        </p>
      </div>
    </div>
  </footer>
  
  </>
}
