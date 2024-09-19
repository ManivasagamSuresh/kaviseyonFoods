import Image from 'next/image'
import React from 'react'

function HomeHeroSection() {
  return (
    <div>
        <div className="w-full h-40 min-[560px]:h-48 relative  lg:h-64 xl:h-80">
            <Image src={'/Images/mainBanner.jpeg'} alt='' fill />
        </div>
    </div>
  )
}

export default HomeHeroSection