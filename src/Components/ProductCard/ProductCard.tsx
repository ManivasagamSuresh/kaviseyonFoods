import Image from 'next/image';
import React from 'react';

function ProductCard({ prod }:any) {
  // Function to get direct image URL from Google Drive link
  const getImageSrc = (url:string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  return (
    <div className='border border-themeGreen w-60'>
      <div className="w-10 h-20 relative xl:w-full xl:h-60 bg-black">
        <Image src={getImageSrc(prod.image)} alt="Product Image" fill/>
      </div>
      <div>{prod.name}</div>
      <div>{prod.price}</div>
      <div>add to cart</div>
    </div>
  );
}

export default ProductCard;
