import React, { useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useRecoilState } from "recoil";
import  {cartIncrease, cartItem}  from "../../store/atoms";

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "#home",
  },
  {
    id: 2,
    name: "Shop",
    link: "#shop",
  },
  {
    id: 3,
    name: "About",
    link: "#about",
  },

];


const Navbar = ({ handleOrderPopup }) => {
  const section1Ref = useRef(null);
  const [increase,setIncrease]=useRecoilState(cartIncrease)
  const [cartItemList, setCartItemList] = useRecoilState(cartItem)
  
  const naviagte=useNavigate();
  return (
    <div className="bg-white w-full dark:bg-gray-900 dark:text-white duration-200 fixed top-0 z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
            >
              InnoSphere
            </a>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data) => (
                  <li key={data.id}> {/* Use data.id as the key */}
                    <a
                      href={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      
                      {data.name}
                    </a>
                  </li>
                ))}
                {/* Dropdown  */}
                
              </ul>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar section */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="
                  search-bar
                "
              />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>

            {/* Order-button section */}
            <button className="relative p-3" onClick={()=>naviagte("/cart")}>
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                {increase}
              </div>
            </button>
            {/* Dark Mode section */}
            <div>
              <DarkMode />
            </div>
            {/* profile section */}
            <div className="hidden lg:block" onClick={()=>naviagte("/register")}>
              <FaUser className="w-5 h-5 rounded-full object-cover"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center