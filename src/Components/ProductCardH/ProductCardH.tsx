import Image from "next/image";
import React, { useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
// import "../../styles/AnimationStyles.css"
// import '@/styles/AnimationStyles.css'
import { FaCartPlus } from "react-icons/fa6";

function ProductCardH({ prod }: any) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Function to get direct image URL from Google Drive link
  const getImageSrc = (url: string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  return (
    <div
      className={`border border-none p-4 sm:p-0 flex sm:flex-col h-fit w-full max-w-[420px] min-[560px]:w-60 lg:w-[24%] mb-4 rounded-md shadow-lg overflow-hidden text-textColor hover:text-themeColorDark productCardImage bg-[#fff]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[30%] h-32 min-[560px]:w-60 min-[560px]:h-64 relative lg:h-56 xl:h-72 2xl:h-80 overflow-hidden">
        <Image
          src={getImageSrc(prod.image)}
          alt="Product Image"
          className={isHovered ? "hoveredImage" : ""}
          layout="fill" // Ensures the Image fills its container
        />
      </div>
      <div className="px-4 py-3 w-[70%] sm:py-4 text-left flex flex-col gap-2">
        <div className="text-base sm:text-sm font-semibold">{prod.name}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LiaRupeeSignSolid className="w-[14px] h-[14px]" />
            <span className="text-sm sm:text-sm">{prod.price}</span>
          </div>
          <div className="text-sm sm:text-sm">Net Wt: {prod.weight_in_grams}g</div>
        </div>
        <div className="flex justify-center items-center w-full h-fit gap-2 mt-8 sm:mt-4 text-xs sm:text-sm font-semibold bg-themeColorLight text-milkWhite rounded-sm px-2 py-1 text-center">
          <div>Add To Cart</div>
          <FaCartPlus />
        </div>
      </div>
    </div>
  );
}

export default ProductCardH;
