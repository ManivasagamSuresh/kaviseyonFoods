"use client";
import { CartItem } from "@/types/profile";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

type CheckoutProductProps = {
  item: CartItem;
};

function CheckoutProduct({ item }: CheckoutProductProps) {
  const getImageSrc = (url: string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <div className="w-16 h-20 relative border">
          <div className="absolute top-[-12px] right-[-8px] bg-themeColorDark text-milkWhite rounded-full text-xs flex justify-center items-center z-10 h-5 w-5">
            {item.quantity}
          </div>
          <Image src={getImageSrc(item.productImage)} alt="Product Image" fill={true} />
        </div>
        <div>
          <div>{item.name}</div>
          <div>{item.weight_in_grams}gms</div>
        </div>
      </div>
      <div className="flex gap-1 items-center h-fit">
        {" "}
        <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" />
        {item.price * item.quantity}
      </div>
    </div>
  );
}

export default CheckoutProduct;
