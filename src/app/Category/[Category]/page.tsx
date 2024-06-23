"use client"

import { usePathname } from 'next/navigation'
import React from 'react'

function page() {

const urlPath = usePathname();

  return (
    <div className="w-full flex justify-center">
    <div className='text-center  flex items-center justify-center text-white text-[50px] min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  bg-themeGreen pageMountAnimation w-full max-w-[1850px]'>{urlPath}</div>
    </div>
  )
}

export default page