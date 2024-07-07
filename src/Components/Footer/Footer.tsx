"use client"
import Image from 'next/image'
import React from 'react'
import { RiInstagramLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from 'next/navigation';



function Footer() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <div className=' w-full flex justify-center  items-center'>
    <div className='h-fit px-3 sm:px-10 lg:px-40 py-5 flex justify-around text-textColor w-full max-w-[1850px] bg-[#F0F0F0] rounded-t-3xl md:rounded-t-[36px]'>
      <div className='flex flex-col md:flex-row gap-4 justify-center  md:items-center md:gap-20 '>
        <div className='relative hidden md:block w-16 h-20 lg:w-16 lg:h-20'>
          <Image src='/Images/KaviseyonLogo.png' alt='logo' fill/>
        </div>
        <div>
          <div className='font-semibold 2xl:text-lg'>Call/WhatsApp</div>
          <div className='text-sm 2xl:text-base'>+91 7010099780</div>
        </div>
        <div>
          <div className='font-semibold 2xl:text-lg'>Email</div>
          <div className='text-sm 2xl:text-base'>kaviseyonfoods@gmail.com</div>
        </div>
        {/* <div className='flex flex-col gap-2 sm:hidden'>
          <div className='font-semibold 2xl:text-lg'>Follow us on</div>
          <div className='flex gap-3'>
            <div><RiInstagramLine className='w-5 h-5 2xl:w-6 2xl:h-6'/></div>
            <div><FaYoutube className='w-5 h-5 2xl:w-6 2xl:h-6'/></div>
          </div>
        </div> */}
      </div>
      <div className='flex-col gap-2 sm:flex items-center justify-center'>
        <div className='flex flex-col gap-2'>
          <div className='font-semibold 2xl:text-lg'>Follow us on</div>
          <div className='flex gap-3'>
            <div><RiInstagramLine className='w-5 h-5'/></div>
            <div><FaYoutube className='w-5 h-5'/></div>
          </div>
        </div>
      </div>
      {/* <div className='flex flex-col gap-2'>
        <div className='text-lg lg:text-xl font-semibold'>Help & About</div>
        <div className='flex flex-col text-sm gap-1'>
          <div className='cursor-pointer'>Contact us</div>
          <div className='cursor-pointer'>Privacy Policy</div>
          <div className='cursor-pointer'>Terms of Service</div>
          <div className='cursor-pointer'>Return Policy</div>
          <div className='cursor-pointer'>FAQs</div>
        </div>
      </div> */}
    </div>
    </div>
  )
}

export default Footer