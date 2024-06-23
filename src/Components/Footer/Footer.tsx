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
    <div className=' w-full flex justify-center'>
    <div className='h-fit bg-bgLightGreen  px-3 sm:px-10 lg:px-40 py-5 flex justify-around text-black w-full max-w-[1850px]'>
      <div className='flex flex-col gap-4'>
        <div className='relative w-20 h-14 lg:w-24 lg:h-16'>
          <Image src='/Images/KvLogo.png' alt='logo' fill/>
        </div>
        <div>
          <div className='font-semibold 2xl:text-lg'>Call/WhatsApp</div>
          <div className='text-sm 2xl:text-base'>9626220442</div>
        </div>
        <div>
          <div className='font-semibold 2xl:text-lg'>Email</div>
          <div className='text-sm 2xl:text-base'>kaviseyonfoods@gmail.com</div>
        </div>
        <div className='flex flex-col gap-2 sm:hidden'>
          <div className='font-semibold 2xl:text-lg'>Follow us on</div>
          <div className='flex gap-3'>
            <div><RiInstagramLine className='w-5 h-5 2xl:w-6 2xl:h-6'/></div>
            <div><FaYoutube className='w-5 h-5 2xl:w-6 2xl:h-6'/></div>
          </div>
        </div>
      </div>
      <div className='flex-col gap-2 hidden sm:flex'>
        <div>
        <div className='text-lg lg:text-xl font-semibold'>
          Categories
        </div>
        <div className='text-sm lg:text-base cursor-pointer' onClick={()=>{handleNavigation('Category/Kids')}}>Kids</div>
        <div className='text-sm lg:text-base cursor-pointer' onClick={()=>{handleNavigation('Category/Adults')}}>Adults</div>
        </div>
        
        <div className='flex flex-col gap-2'>
          <div className='font-semibold text-lg lg:text-xl'>Follow us on</div>
          <div className='flex gap-3'>
            <div><RiInstagramLine className='w-5 h-5'/></div>
            <div><FaYoutube className='w-5 h-5'/></div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-lg lg:text-xl font-semibold'>Help & About</div>
        <div className='flex flex-col text-sm gap-1'>
          <div className='cursor-pointer'>Contact us</div>
          <div className='cursor-pointer'>Privacy Policy</div>
          <div className='cursor-pointer'>Terms of Service</div>
          <div className='cursor-pointer'>Return Policy</div>
          <div className='cursor-pointer'>FAQs</div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer