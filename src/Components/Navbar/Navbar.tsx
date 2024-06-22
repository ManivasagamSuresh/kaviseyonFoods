"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchInput from "../SearchInput";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();

 const  handleRouteMobMenu = () =>{
  router.push("/navMobile")
 }

  return (
    <div className="w-full h-28 lg:h-16 xl:h-20 sticky top-0 z-50 flex flex-col gap-6 px-5 py-3 sm:px-10 lg:p-0 shadow-md shadow-lightThemeGreen">
      <div className="bg-white text-themeGreen  w-full flex items-center justify-between lg:px-14 xl:px-20 ">
        <div className="hidden lg:flex gap-6 items-center justify-start h-full xl:gap-10 ">
          <div className="w-10 h-14 relative xl:w-14 xl:h-20">
            <Image src="/Images/kaviSeyonLogo.png" fill alt="logo" />
          </div>
          <div className="cursor-pointer   lg:text-sm xl:text-base">Home</div>
          <div className="cursor-pointer lg:text-sm  xl:text-base">About Us</div>
          <div className="cursor-pointer lg:text-sm xl:text-base">Contact Us</div>
        </div>
        <div className="block lg:hidden" onClick={handleRouteMobMenu}>
          <MenuOutlinedIcon />
        </div>

        <div className="bg-white hidden rounded-full lg:flex gap-2 px-2 py-1 xl:py-2 border border-themeGreen">
          <div>
            <SearchOutlinedIcon className="text-themeGreen" />
          </div>
          <div className="">
            <SearchInput />
          </div>
        </div>

        <div className="flex gap-4 xl:gap-6 items-center justify-start h-full ">
          <div>
            <FavoriteBorderOutlinedIcon />
          </div>
          <div>
            <ShoppingCartOutlinedIcon />
          </div>
          <div>
            <PermIdentityOutlinedIcon />
          </div>
        </div>
      </div>
      <div className="sm:flex sm:justify-center ">
        <div className="lg:hidden bg-white w-full sm:w-[350px]  rounded-full flex gap-2 px-2 py-1 border border-themeGreen">
          <div>
            <SearchOutlinedIcon className="text-themeGreen" />
          </div>
          <div className="">
            <SearchInput />
          </div>
        </div>
      </div>
    </div>
  );
}

// #4F7942

export default Navbar;
