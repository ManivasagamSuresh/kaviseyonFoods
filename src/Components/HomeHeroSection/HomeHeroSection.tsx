import Image from 'next/image'
import React from 'react'

function HomeHeroSection() {

  //TODO: REMOVE BORDER AND BACKGROUND

  return (
    <div>
        <div className="w-full lg:h-[calc(100vh-244px)] xl:h-[calc(100vh-210px)] relative hidden lg:block bg-themeColorDark shadow-md">
            <Image src={'/Images/sample2.jpeg'} alt='' fill />
        </div>
        <div className="w-full h-[470px] sm:h-[620px] md:h-[680px] relative lg:hidden bg-themeColorDark border">
            {/* <Image src={'/Images/mainB.png'} alt='image' fill /> */}
        </div>
    </div>
  )
}

export default HomeHeroSection