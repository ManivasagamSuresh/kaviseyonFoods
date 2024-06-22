"use client";
import Image from "next/image";
import "../../styles/AnimationStyles.css"
import React, { useEffect, useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SearchInput from "../SearchInput";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useRouter, usePathname } from "next/navigation";
import ClearIcon from "@mui/icons-material/Clear";
import Link from "next/link";

function Navbar() {
  const [search, setSearch] = useState<boolean>(false);
  const [pathName, setPathName] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleRouteMobMenu = () => {
    router.push("/navMobile");
  };

  const handleClearRoute = () => {
    router.back();
  };

  const isNavMobile = pathname === "/navMobile";

  useEffect(() => {
    setPathName(pathname);
  }, [pathname]);

  return (
    <div className="w-full bg-white text-themeGreen flex items-center justify-between  h-16 lg:h-16 xl:h-20 sticky top-6 lg:top-10 z-50  gap-6 px-5 py-3 sm:px-10 lg:px-14 xl:px-20 shadow-md shadow-lightThemeGreen">
      {search ? (
        <div className="flex gap-1 justify-end items-center w-full SearchInputAnimation">
          <div className="bg-white rounded-lg w-full flex gap-2 px-2 py-2 border border-themeGreen">
            <div>
              <SearchOutlinedIcon className="text-themeGreen" />
            </div>
            <div className="w-full sm:w-[350px]">
              <SearchInput />
            </div>
          </div>
          <div
            onClick={() => {
              setSearch(false);
            }}
          >
            <ClearIcon />
          </div>
        </div>
      ) : (
        <>
          <div className="hidden lg:flex gap-4 items-center justify-start h-full xl:gap-8 flex-1">
            <div className="w-10 h-14 relative xl:w-14 xl:h-20">
              <Image src="/Images/kaviSeyonLogo.png" fill alt="logo" />
            </div>
            <Link
              href="/"
              className={`cursor-pointer text-themeGreen lg:text-sm xl:text-base hover:underline decoration-themeGreen underline-offset-4 ${
                pathName === "/" && "bg-themeGreen rounded-md py-1 px-3 text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/About"
              className={`cursor-pointer text-themeGreen lg:text-sm xl:text-base hover:underline decoration-themeGreen underline-offset-4 ${
                pathName === "/About" && "bg-themeGreen rounded-md py-1 px-3 text-white"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/Contact"
              className={`cursor-pointer text-themeGreen lg:text-sm xl:text-base hover:underline decoration-themeGreen underline-offset-4 ${
                pathName === "/Contact" && "bg-themeGreen rounded-md py-1 px-3 text-white"
              }`}
            >
              Contact Us
            </Link>
          </div>
          <div
            className="block lg:hidden flex-1"
            onClick={isNavMobile ? handleClearRoute : handleRouteMobMenu}
          >
            {isNavMobile ? <ClearIcon /> : <MenuOutlinedIcon />}
          </div>

          <div className="bg-white hidden rounded-full lg:flex gap-2 px-2 py-1 xl:py-2 border border-themeGreen flex-1">
            <div>
              <SearchOutlinedIcon className="text-themeGreen" />
            </div>
            <div className="w-full lg:w-60 xl:w-[280px]">
              <SearchInput />
            </div>
          </div>

          <div className="lg:hidden flex flex-1 justify-center">
            <div className="lg:hidden h-12 w-20 sm:h-14 sm:w-20 relative">
            <Image src="/Images/KvLogo.png" alt="logo" fill />
            </div>
          </div>

          <div className="flex gap-4 xl:gap-6 items-center justify-end h-full flex-1 ">
            <div
              className="lg:hidden"
              onClick={() => {
                setSearch(true);
              }}
            >
              <SearchOutlinedIcon />
            </div>
            <div className="hidden lg:block">
              <FavoriteBorderOutlinedIcon />
            </div>
            <div onClick={()=>{
              router.push("/Cart")
            }}>
              <ShoppingCartOutlinedIcon />
            </div>
            <div className="hidden lg:block">
              <PermIdentityOutlinedIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
