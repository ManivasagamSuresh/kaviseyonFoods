import Image from 'next/image'
import React from 'react'

function HomeHeroSection() {

  //TODO: REMOVE BORDER AND BACKGROUND

  return (
    <div>
        <div className="w-full lg:h-[calc(100vh-244px)] xl:h-[calc(100vh-210px)] relative hidden lg:block bg-themeColorDark shadow-md">
            <Image src={'/Images/mainBannerDesktop.png'} alt='' fill />
        </div>
        <div className="w-full h-[580px] sm:h-[860px] md:h-[90px] relative lg:hidden bg-themeColorDark ">
            <Image src={'/Images/mainBannerMobile.png'} alt='image' fill />
        </div>
    </div>
  )
}

export default HomeHeroSection