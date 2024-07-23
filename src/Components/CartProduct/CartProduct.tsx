import Image from "next/image";
import React from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
// import { FaMinus } from "react-icons/fa6";

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
      <div className="w-7/12 flex gap-3 lg:gap-6">
        <div className="w-24 h-28 md:h-44 md:w-36 2xl:w-44 2xl:h-52 relative">
          <Image
            src={getImageSrc(prod.image)}
            alt="Product Image"
            fill={true} // Ensures the Image fills its container
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm md:text-base xl:text-lg 2xl:text-xl">{prod.name}</div>
          <div className="flex text-sm md:text-base xl:text-lg 2xl:text-xl items-center">
            <LiaRupeeSignSolid className="w-[14px] h-[14px]" /> {prod.price}
          </div>
        </div>
      </div>
      <div className="w-3/12 px-2">
        <div className="border flex items-center justify-around h-fit py-1 w-16 md:w-20 lg:w-24">
          <span className="cursor-pointer">
           -
          </span>
          <span>{prod.quantity}</span>
          <span className="cursor-pointer">+</span>
        </div>
      </div>
      <div className="w-2/12 flex items-center h-fit ">
        <LiaRupeeSignSolid className="w-[14px] h-[14px]" /> <span className="xl:text-lg 2xl:text-xl">{prod.price}</span>
      </div>
    </div>
  );
};

export default CartProduct;
