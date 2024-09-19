import Image from 'next/image'
import React from 'react'

function HomeHeroSection() {

  //TODO: REMOVE BORDER AND BACKGROUND
  
  return (
    <div>
        <div className="w-full lg:h-[calc(100vh-144px)] xl:h-[calc(100vh-170px)] relative hidden lg:block bg-themeColorDark border ">
            {/* <Image src={'/Images/mainBanner.jpeg'} alt='' fill /> */}
        </div>
        <div className="w-full h-[calc(100vh-118px)]  relative lg:hidden bg-themeColorLight border">
            <Image src={'/Images/mainB.png'} alt='' fill />
        </div>
    </div>
  )
}

export default HomeHeroSection