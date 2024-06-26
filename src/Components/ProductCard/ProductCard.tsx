import Image from 'next/image';
import React, { useState } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import "../../styles/AnimationStyles.css"
import { FaCartPlus } from "react-icons/fa6";


function ProductCard({ prod }:any) {
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  // Function to get direct image URL from Google Drive link
  const getImageSrc = (url:string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  return (
    <div 
      className={`border border-none h-fit w-60 lg:w-[24%] mb-4 rounded-md shadow-lg overflow-hidden text-black hover:text-themeGreen productCardImage`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full h-40 relative xl:w-full xl:h-64 overflow-hidden">
        <Image 
          src={getImageSrc(prod.image)} 
          alt="Product Image" 
          className={isHovered ? 'hoveredImage' : ''}
          layout="fill" // Ensures the Image fills its container
        />
      </div>
      <div className='px-2 py-4 text-left flex flex-col gap-2'>
        <div className='text-sm font-semibold'>{prod.name}</div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <LiaRupeeSignSolid className='w-[14px] h-[14px]'/>
            <span className='text-sm'>{prod.price}</span>
          </div>
          <div className='text-sm'>Net Wt: {prod.weight_in_grams}g</div>
        </div>
        <div className='flex justify-center items-center w-full h-fit gap-2 mt-4 tex-sm font-semibold bg-lightThemeGreen text-[#fefefa] rounded-sm px-2 py-1 text-center'>
          <div>Add To Cart</div>
          <FaCartPlus/>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
