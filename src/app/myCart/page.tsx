"use client";
import CartProduct from "@/Components/CartProduct/CartProduct";
import { CartItem } from "@/types/profile";
import { Assistant } from "next/font/google";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const assistant = Assistant({
  subsets: ['latin'],
  display: 'swap',
});

function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { cart } = useSelector((state: any) => state.guestUser);
  const { kaviFoodUser } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (kaviFoodUser) {
      setCartItems(kaviFoodUser.cart.items);
    } else {
      setCartItems(cart.items);
    }
  }, [kaviFoodUser, cart]);

  console.log(cartItems);
  return (
    <div className={`${assistant.className} w-full flex justify-center mb-56`}>
      <div className="px-7 md:px-28 lg:px-52 xl:px-72 2xl:px-80 py-2 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation w-full max-w-[1850px]">
        <div className="flex justify-between py-10 items-center">
          <div className="text-xl md:text-xl lg:text-2xl 2xl:text-3xl font-semibold">Your Cart</div>
          <div className="text-xs lg:text-sm underline font-semibold cursor-pointer hover:text-themeColorDark">
            <Link href="/">Continue Shopping</Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <div className="w-9/12 md:w-6/12 lg:w-7/12 lg:text-lg 2xl:text-xl">Product</div>
            <div className="hidden md:block md:w-4/12 lg:w-3/12 px-1 lg:text-lg 2xl:text-xl">Quantity</div>
            <div className="w-3/12 md:w-2/12 lg:text-lg 2xl:text-xl">Total</div>
          </div>
          <hr className="mb-2" />
          {cartItems.map((prod) => (
            <CartProduct prod={prod} key={prod._id.toString()} />
          ))}
          <hr className="mt-2" />
        </div>
        <div className="flex mt-5 lg:mt-0">
          <div className="hidden lg:block lg:w-7/12"></div>
          <div className="w-full lg:w-5/12 flex flex-col gap-4 items-center lg:items-end">
            <div className="flex items-center mt-3 lg:text-lg 2xl:text-xl">
              <span className="text-base 2xl:text-lg mr-2">Estimated Total: </span>
              <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" />
              {cart.totalPrice}
            </div>
            <div className="text-xs">Shipping charges calculated at checkout</div>
            <div className="bg-themeColorDark text-milkWhite px-14 lg:px-24 py-2 text-center rounded-sm font-semibold w-fit 2xl:text-xl">
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
