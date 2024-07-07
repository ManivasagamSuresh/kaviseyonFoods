"use client";
import Image from "next/image";
// import "../../styles/AnimationStyles.css"
// import '@/styles/AnimationStyles.css'
import React, { useEffect, useState } from "react";
import SearchInput from "../SearchInput";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClear } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import MobNavbar from "../MobileNav/MobNavbar";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import Categories from "../Categories/Categories";
import ProfilePopup from "../ProfilePopUp/ProfilePopUp";
import path from "node:path/win32";
import { useSelector } from "react-redux";



function Navbar() {
  const [search, setSearch] = useState<boolean>(false);
  const [pathName, setPathName] = useState("");
  const [MobNav, setMobNav] = useState<boolean>(false);
  const [Category,setCategory] = useState<boolean>(false)
  const [profilePop,setprofilePop] = useState<boolean>(false); 
  const router = useRouter();
  const pathname = usePathname();
  const { kaviFoodUser } = useSelector((state: any) => state.user);

  console.log('kaviFoodUser: ',kaviFoodUser);
  
  const HandleNavigation = (url: string) =>{
    router.push(`/${url}`)
  }

  useEffect(() => {
    setPathName(pathname);
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="w-full flex justify-center sticky top-6 lg:top-10 z-50">

   
    <div className="w-full bg-white fallback-blur text-textColor flex items-center justify-between  h-16 lg:h-16 xl:h-20 sticky top-6 lg:top-10 z-50 px-5 py-3 sm:px-10 lg:px-8 xl:px-16 shadow shadow-themeColorLight max-w-[1850px]">
      {search ? (
        <div className="flex gap-1 justify-end items-center w-full SearchInputAnimation ">
          <div className="bg-white rounded-lg w-full flex items-center gap-2 px-2 py-2 border border-themeColorDark">
            <div>
              <IoSearchOutline className="text-textColor w-5 h-5" />
            </div>
            <div className={`w-full sm:w-[350px]`}>
              <SearchInput />
            </div>
          </div>
          <div
            onClick={() => {
              setSearch(false);
            }}
          >
            <MdClear className="text-textColor w-5 h-5"/>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden lg:flex gap-4 items-center justify-start h-full xl:gap-8 2xl:gap-10 flex-1">
            <div className="w-14 h-14 relative xl:w-20 xl:h-14">
              <Image src="/Images/KaviseyonLogo.png" fill alt="logo" />
            </div>
            <Link
              href="/"
              className={`cursor-pointer text-textColor lg:text-sm xl:text-base hover:underline decoration-themeColorDark underline-offset-4 ${
                pathName === "/" && "bg-themeColorDark rounded-md py-1 px-3 text-white"
              }`}
            >
              Home
            </Link>
            <div className="relative">

            <div
              onClick={()=>{setCategory(!Category)}}
              className={`cursor-pointer text-text-textColor lg:text-sm xl:text-base hover:underline decoration-themeColorDark underline-offset-4  ${
                pathName === "/Category" && "bg-themeColorDark rounded-md py-1 px-3 text-white"
              }`}
              >
              Categories
            </div>
            {Category && <Categories setCategory={setCategory}/>}
            </div>
            <Link
              href="/About"
              className={`cursor-pointer text-textColor lg:text-sm xl:text-base hover:underline decoration-themeColorDark underline-offset-4 ${
                pathName === "/About" && "bg-themeColorDark rounded-md py-1 px-3 text-white"
              }`}
            >
              About Us
            </Link>
            {/* <Link
              href="/Contact"
              className={`cursor-pointer text-text-textColor lg:text-sm xl:text-base hover:underline decoration-themeColorDark underline-offset-4 ${
                pathName === "/Contact" && "bg-themeColorDark rounded-md py-1 px-3 text-white"
              }`}
            >
              FAQs
            </Link> */}
          </div>
          <div
            className="block lg:hidden flex-1"
            onClick={()=>{setMobNav(!MobNav)}}
          >
            {MobNav ? <MdClear className="text-textColor w-5 h-5" /> : <GiHamburgerMenu className="text-textColor w-5 h-5" />}
          </div>
              
          <div className={`bg-white hidden rounded-full items-center gap-2 px-2 py-1 xl:py-2 border border-themeColorDark flex-1 ${pathName === '/SignIn' ? 'lg:hidden' : "lg:flex"} ${ pathName === '/SignUp' ? 'lg:hidden' : "lg:flex"}`}>
            <div>
              <IoSearchOutline className="text-textColor" />
            </div>
            <div className="w-full lg:w-48 xl:w-[240px] relative">
              <SearchInput />
            </div>
          </div>

          <div className="lg:hidden flex flex-1 justify-center">
            <div className="lg:hidden h-[65px] w-20 sm:h-14 sm:w-20 relative">
            <Image src="/Images/kaviseyonLogo.png" alt="logo" fill />
            </div>
          </div>

          <div className="flex gap-4 xl:gap-6 items-center justify-end h-full flex-1 ">
            {/* TODO : change hidden if user not logged in */}
            <div
              className={`lg:hidden cursor-pointer ${pathName === '/SignIn' && 'hidden'} ${pathName === '/SignUp' && 'hidden'}`}
              onClick={() => {
                setSearch(true);
              }}
            >
              <IoSearchOutline className="w-5 h-5"/>
            </div>
           
            {/* <div className={`hidden cursor-pointer ${!kaviFoodUser ? 'lg:hidden' :  "lg:block" } `} onClick={()=>{HandleNavigation('Wishlist')}}>
              <FaRegHeart className="lg:w-4 lg:h-4 xl:w-5 xl:h-5"/>
            </div> */}
            <div className={`cursor-pointer relative`} onClick={()=>{
              HandleNavigation("myCart")
            }}>
              <MdOutlineShoppingCart className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5"/>
              <div className="absolute top-0 right-0 bg-themeColorDark text-milkWhite rounded-full px-1 py-0.5 text-xs leading-none transform translate-x-1/2 -translate-y-1/2">1</div>
            </div>
            <div className="hidden lg:block cursor-pointer relative" onClick={()=>{setprofilePop(!profilePop)}}>
              <IoPersonSharp  className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5"/>
              {
                profilePop && <ProfilePopup setprofilePop={setprofilePop}/>
              }
            </div>
          </div>
        </>
      )}
      {
        MobNav &&  <MobNavbar setMobNav={setMobNav}/>
      }
      
    </div>
    </div>
  );
}

export default Navbar;
