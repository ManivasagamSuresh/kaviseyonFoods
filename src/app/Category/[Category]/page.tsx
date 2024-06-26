"use client";

import { useParams, usePathname } from 'next/navigation';
import React from 'react';

function Page() {
  const urlPath = usePathname();
  const params = useParams();
  console.log(params);

  return (
    <div className="w-full flex justify-center">
      <div className='text-center flex items-center justify-center text-white text-[50px] min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] bg-themeGreen pageMountAnimation w-full max-w-[1850px]'>
        {urlPath}
      </div>
    </div>
  );
}

export default Page;
