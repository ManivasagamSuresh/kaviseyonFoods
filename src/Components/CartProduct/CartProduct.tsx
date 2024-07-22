import Image from 'next/image';
import React from 'react'
import { LiaRupeeSignSolid } from "react-icons/lia";


interface ProductComponentProps {
    prod: CartProduct;
  }
  
  const CartProduct: React.FC<ProductComponentProps> = ({ prod }) => {

    const getImageSrc = (url:string) => {
        const id = url.match(/[-\w]{25,}/);
        return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
      };
    
  return (
    <div className="flex">
              <div className="w-7/12 flex">
                <div className='w-20 h-28 relative'>
                <Image
          src={getImageSrc(prod.image)} 
          alt="Product Image" 
          layout="fill" // Ensures the Image fills its container
        />

                </div>
                <div>
                    <div>{prod.name}</div>
                    <div className='flex'><LiaRupeeSignSolid className='w-[14px] h-[14px]'/> {prod.price}</div>
                </div>
              </div>
              <div className="w-3/12 border"><span>-</span><span>{prod.quantity}</span><span>+</span></div>
              <div className="w-2/12 flex"><LiaRupeeSignSolid className='w-[14px] h-[14px]'/> {prod.price}</div>
            </div>
  )
}

export default CartProduct