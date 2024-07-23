import Image from "next/image";
import React from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
// import { FaMinus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ProductComponentProps {
  prod: CartProduct;
}

const CartProduct: React.FC<ProductComponentProps> = ({ prod }) => {
  const getImageSrc = (url: string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  return (
    <div className="flex my-2 lg:my-4">
      <div className="w-8/12 md:w-6/12 lg:w-7/12 flex gap-3 lg:gap-6">
        <div className="w-20 h-24 lg:w-16 lg:h-24 2xl:w-32 2xl:h-40 relative">
          <Image
            src={getImageSrc(prod.image)}
            alt="Product Image"
            fill={true} // Ensures the Image fills its container
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">

          <div className="text-sm md:text-base 2xl:text-lg">{prod.name}</div>
          <div className="flex text-sm md:text-base 2xl:text-lg  items-center">
            <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" /> {prod.price}
          </div>
          </div>
          <div className="flex gap-2 items-center h-fit md:hidden">
            <div className="border flex items-center justify-around h-fit py-0 w-20">
              <span className="cursor-pointer">-</span>
              <span className="text-base 2xl:text-lg">{prod.quantity}</span>
              <span className="cursor-pointer">+</span>
            </div>
            <RiDeleteBin6Line className="" />
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-4/12 lg:w-3/12 px-2 gap-2 items-center h-fit">
        <div className="border flex items-center justify-around h-fit py-1 w-16 md:w-20 lg:w-24">
          <span className="cursor-pointer">-</span>
          <span className="text-base 2xl:text-lg">{prod.quantity}</span>
          <span className="cursor-pointer">+</span>
        </div>
        <RiDeleteBin6Line className="" />
      </div>
      <div className="w-4/12 md:w-2/12 flex items-center h-fit ">
        <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" />{" "}
        <span className="xl:text-lg 2xl:text-xl">{prod.price}</span>
      </div>
    </div>
  );
};

export default CartProduct;
