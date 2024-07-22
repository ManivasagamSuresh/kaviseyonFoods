"use client";
import CartProduct from "@/Components/CartProduct/CartProduct";
import React, { useState } from "react";

function Page() {
  const [cart, setCart] = useState([
    {
      name: "Ragi Milk Powder",
      price: 499,
      image: "https://drive.google.com/file/d/1uKw2Cm7ZQ7TBVdYZVBFCGeytMTxWkkcN/view?usp=sharing",
      quantity: 0,
    },
    {
      name: "Ragi Milk Powder",
      price: 299,
      image: "https://drive.google.com/file/d/1uKw2Cm7ZQ7TBVdYZVBFCGeytMTxWkkcN/view?usp=sharing",
      quantity: 0,
    },
  ]);

  return (
    <div className="px-20 py-2 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]   pageMountAnimation w-full max-w-[1850px]">
      <div className="flex justify-between px-5 py-10 items-center">
        <div className="text-4xl font-semibold">Your Cart</div>
        <div className="text-sm underline font-semibold">Continue Shopping</div>
      </div>
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-7/12">Product</div>
          <div className="w-3/12">Quantity</div>
          <div className="w-2/12">Total</div>
        </div>
        <hr className="mb-2" />

        {cart.map((prod) => {
          return <CartProduct prod={prod}/>;
        })}
        <hr className="mt-2" />
      </div>
      <div className="flex">
        <div className="w-10/12"></div>
        <div className="w-2/12 flex flex-col gap-2">
          <div>Estimated Total : 123</div>
          <div className="bg-themeColorDark text-milkWhite">Checkout</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
