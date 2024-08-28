'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux';

function page() {
const router = useRouter();
// const { kaviFoodUser } = useSelector((state: any) => state.user);

const handleNavigation = (url:string) => {
    router.push(`/${url}`);
}



  return (
    <div className="w-full flex justify-center">
      <div className='text-center flex flex-col items-center justify-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] text-themeColorDark w-full max-w-[1850px]'>
      <div>Yay, Your Order has been Placed</div>
      <div onClick={()=>{handleNavigation('')}} className='underline cursor-pointer'>Go to Home</div>
      </div>
    </div>
      
  )
}

export default page