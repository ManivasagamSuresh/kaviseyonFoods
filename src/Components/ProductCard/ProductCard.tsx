import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
// import "../../styles/AnimationStyles.css"
// import '@/styles/AnimationStyles.css'
import { FaCartPlus } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AddGuestCart } from '@/redux/GuestSlice';
import { AddUserCart } from '@/redux/UserSlice';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";


function ProductCard({ prod }:any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false); // State to track hover
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any)=> state.guestUser);

  // Function to get direct image URL from Google Drive link
  const getImageSrc = (url:string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  const handleNavigation=(productId: string)=>{
      router.push(`/Product/${productId}`)
  }

  const addToCart = () => {
    if(kaviFoodUser){
      dispatch(AddUserCart({...prod, quantity:1}))
    }else{
      dispatch(AddGuestCart({...prod, quantity:1}))
    }
  }

  const OpenCart = () =>{
    router.push("/myCart")
  }


  useEffect(()=>{
    if(kaviFoodUser){
    const added =  kaviFoodUser.cart.items.findIndex((p: any)=> p._id === prod._id)
    // console.log(added);
    if(added  !== -1){setIsAdded(true)}
    }
    else{
      const added = cart.items.findIndex((p: any)=> p._id === prod._id)
      // console.log(added);
      if(added !== -1){setIsAdded(true)}
    }
  },[cart, kaviFoodUser])

  return (
    <div 
      className={`border border-none h-fit w-40 min-[560px]:w-60 lg:w-[24%] mb-4 rounded-md shadow-lg overflow-hidden text-textColor hover:text-themeColorDark productCardImage bg-[#fff] `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
     
    >
      <div className="w-full h-28 min-[560px]:h-40 relative lg:h-36 xl:h-44 min-[1600px]:h-56 overflow-hidden">
        <Image 
          src={getImageSrc(prod.image)} 
          alt="Product Image" 
          className={isHovered ? 'hoveredImage' : ''}
          fill // Ensures the Image fills its container
        />
      </div>
      <div className='px-4 py-2 sm:py-4 text-left flex flex-col gap-2 cursor-pointer'>
        <div  onClick={()=>handleNavigation(prod._id)} className='flex flex-col gap-2'>
        <div className='text-xs sm:text-sm font-semibold'>{prod.name}</div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <LiaRupeeSignSolid className='w-[14px] h-[14px]'/>
            <span className='text-xs sm:text-sm'>{prod.price}</span>
          </div>
          <div className='text-xs sm:text-sm'>Net Wt: {prod.weight_in_grams}g</div>
        </div>
        </div>
        {
          isAdded ?
          <div className='flex justify-center items-center w-full h-fit gap-2 sm:mt-4 text-xs sm:text-sm font-semibold bg-themeColorDark text-milkWhite rounded-sm px-2 py-1 text-center'>
          <div onClick={OpenCart}>Added To Cart</div>
          <FaArrowUpRightFromSquare />
        </div>
          :   
        <div className='flex justify-center items-center w-full h-fit gap-2 sm:mt-4 text-xs sm:text-sm font-semibold bg-themeColorDark text-milkWhite rounded-sm px-2 py-1 text-center'>
        <div onClick={addToCart}>Add To Cart</div>
        <FaCartPlus/>
      </div>
        }
       
        
      </div>
    </div>
  );
}

export default ProductCard;
