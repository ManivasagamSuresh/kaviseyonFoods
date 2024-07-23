"use client";
import CartProduct from "@/Components/CartProduct/CartProduct";
import Link from "next/link";
import React, { useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";

function Page() {
  const [cart, setCart] = useState([
    {
      name: "Ragi Milk Powder",
      price: 14499,
      image: "https://drive.google.com/file/d/1uKw2Cm7ZQ7TBVdYZVBFCGeytMTxWkkcN/view?usp=sharing",
      quantity: 0,
      _id:1
    },
    {
      name: "Ragi Milk Powder",
      price: 299,
      image: "https://drive.google.com/file/d/1uKw2Cm7ZQ7TBVdYZVBFCGeytMTxWkkcN/view?usp=sharing",
      quantity: 0,
      _id:2
    },
  ]);

  return (
    <div className="w-full flex justify-center">
    <div className="px-5 lg:px-10 py-2 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]   pageMountAnimation w-full max-w-[1850px]">
      <div className="flex justify-between py-10 items-center">
        <div className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold">Your Cart</div>
        <div className="text-xs lg:text-sm underline font-semibold cursor-pointer hover:text-themeColorDark"><Link href='/'>Continue Shopping</Link></div>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-7/12 md:text-lg lg:text-xl 2xl:text-2xl">Product</div>
          <div className="w-3/12 px-1 md:text-lg lg:text-xl 2xl:text-2xl">Quantity</div>
          <div className="w-2/12 md:text-lg lg:text-xl 2xl:text-2xl">Total</div>
        </div>
        <hr className="mb-2" />

        {cart.map((prod) => {
          return <CartProduct prod={prod} key={prod._id}/>;
        })}
        <hr className="mt-2" />
      </div>
      <div className="flex">
        <div className="hidden lg:block w-6/12 lg:w-10/12"></div>
        <div className="w-full lg:w-2/12 flex flex-col gap-2 items-center lg:items-end">
          <div className="flex items-center mt-3 lg:mt-0 lg:text-lg 2xl:text-xl"><span className="text-base lg:text-lg 2xl:text-xl mr-2">Estimated Total : </span><LiaRupeeSignSolid className="w-[14px] h-[14px]" /> 123000</div>
          <div className="bg-themeColorDark text-milkWhite px-5 py-2 text-center rounded-lg font-semibold w-fit 2xl:text-xl">Checkout</div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Page;
