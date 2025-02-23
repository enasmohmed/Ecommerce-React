import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/icon-logo.png'
import { authContext } from '../../Context/AuthContextProvider'
import { cartContext } from '../../Context/CartContextProvider'
import { wishlistContext } from '../../Context/WishlistContextProvider'

export default function Navbar() {

  let {token , setToken} = useContext(authContext)
  let navigate = useNavigate()
  let { numOfCartItems } = useContext(cartContext);
  const { wishlistCount, getWishlistProducts } = useContext(wishlistContext);



  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation();

  function logout(){
    navigate("/login")
    localStorage.removeItem("token")
    setToken(null)
  }

  useEffect(() => {
    getWishlistProducts(); 
  }, []);

  return <>

  <nav className="bg-slate-100 py-1 fixed top-0 start-0 end-0 z-[999] shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} className="w-[120px] -mr-7" alt="Logo" />
            <span className="text-4xl font-extrabold mt-4 capitalize italic bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] text-transparent bg-clip-text">
              Storezy
            </span>
          </Link>
        </div>

        {/* Icons Cart , heart , bar*/}
        <div className="flex items-center gap-4">
          <Link to="/wishlist" className="relative">
            <i className="fas fa-heart fa-lg text-red-500 hover:text-red-700"></i>
            
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#a2a2a3] border-2 border-white rounded-full -top-4 -end-2">
              {wishlistCount ?? 0}  
              </div>
            
          </Link>

          <Link to="/cart" className="relative">
            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#a2a2a3] border-2 border-white rounded-full -top-4 -end-2">
              {numOfCartItems}
            </div>
            <i className="fa fa-shopping-cart fa-lg text-[#EC4899] hover:text-[#e3368c]"></i>
          </Link>

          <button
            className="lg:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className={`fas fa-bars fa-2x ${isOpen ? "hidden" : ""}`}></i>
          </button>
        </div>

        <ul
          className={`lg:flex lg:gap-4 items-center absolute lg:relative top-[70px] lg:top-0 left-0 w-full lg:w-auto bg-slate-100 lg:bg-transparent flex-col lg:flex-row py-4 lg:py-0 transition-all ${
            isOpen ? "flex space-y-4" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className={`relative text-md font-semibold transition-all capitalize px-3 py-2 rounded-lg ${location.pathname === "/" ? "bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`}>
              Home
            </Link>
          </li>
          {["Cart", "WishList", "Products", "Categories", "Brands"].map(
            (item, index) => {
              const isActive = location.pathname === `/${item.toLowerCase()}`;
              return (
                <li key={index}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className={`relative text-md font-semibold transition-all capitalize px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] text-white"
                        : "text-gray-600 hover:bg-gray-300 hover:text-black"
                    }`}
                  >
                    {item}
                  </Link>
                </li>
              );
            }
          )}
          <Link to="/allorders" className={`relative text-md font-semibold transition-all capitalize px-3 py-2 rounded-lg ${location.pathname === "/" ? "bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`}>
              Orders
            </Link>

          {token && (
            <li className="flex items-center gap-2 mt-2">
              
              <span  className="block w-full text-md font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-[#EC4899] to-[#a2a2a3] px-4 py-2 rounded-lg hover:opacity-90"
                onClick={logout}>
                <i className="fas fa-sign-out-alt fa-lg text-white hover:text-red-500"></i> Logout
              </span>
            </li>
          )}
        </ul>

      </div>
    </nav>

  </>
}
