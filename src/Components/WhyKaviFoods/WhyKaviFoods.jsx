import Image from "next/image";
import React from "react";

function WhyKaviFoods() {
  return (
    <div className="flex flex-col gap-10 lg:gap-20 w-full h-fit my-16 lg:my-36">
      <div className="w-full text-center text-2xl md:text-3xl text-themeColorDark font-semibold">
        Why Choose Kaviseyon Foods?
      </div>
      <div className="hidden lg:flex mb-10 lg:mb-0 justify-evenly w-full flex-wrap items-center">
        <div className="relative h-28 w-28 lg:h-32 lg:w-32">
          <Image src={"/Images/Organic.png"} alt fill />
        </div>

        <div className="relative h-28 w-28 lg:h-32 lg:w-32">
          <Image src={"/Images/NoPreservatives.png"} alt fill />
        </div>
        <div className="relative h-28 w-28 lg:h-32 lg:w-32">
          <Image src={"/Images/HomeFood.png"} alt fill />
        </div>
        <div className="relative h-28 w-28 lg:h-32 lg:w-32">
          <Image src={"/Images/FreshMade.png"} alt fill />
        </div>
      </div>
      <div className="flex flex-col mb-10 lg:mb-0  w-full items-center lg:hidden">
        <div className="flex w-full justify-evenly">
          <div className="relative h-28 w-28 lg:h-32 lg:w-32">
            <Image src={"/Images/Organic.jpg"} alt fill />
          </div>

          <div className="relative h-28 w-28 lg:h-32 lg:w-32">
            <Image src={"/Images/NoPreservatives.jpg"} alt fill />
          </div>
        </div>
        <div className="flex w-full justify-evenly mt-10">
          <div className="relative h-28 w-28 lg:h-32 lg:w-32">
            <Image src={"/Images/HomeFood.png"} alt fill />
          </div>
          <div className="relative h-28 w-28 lg:h-32 lg:w-32">
            <Image src={"/Images/FreshMade.jpg"} alt fill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyKaviFoods;
