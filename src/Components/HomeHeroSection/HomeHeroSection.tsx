import Image from 'next/image'
import React from 'react'

function HomeHeroSection() {

  //TODO: REMOVE BORDER AND BACKGROUND

  return (
    <div>
        <div className="w-full lg:h-[calc(100vh-244px)] xl:h-[calc(100vh-210px)] relative hidden lg:block  shadow-md">
            <Image src={'/Images/mainBannerDesktop.png'} alt='' fill />
        </div>
        {/* h-[580px]  */}
        <div className="w-full h-[calc(100vh-88px)] sm:h-[calc(100vh-108px)] relative lg:hidden">
            <Image src={'/Images/mainBannerMobile.png'} alt='image' fill />
        </div>
    </div>
  )
}

export default HomeHeroSection