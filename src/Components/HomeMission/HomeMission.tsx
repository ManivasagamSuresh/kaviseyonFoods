import Image from "next/image";
import React from "react";

function HomeMission() {
  return (
    <div className="h-[720px] sm:h-[600px] lg:h-[480px] my-2 lg:my-20 flex flex-col lg:flex-row w-full ">
      <div className="flex flex-1 justify-center items-center gap-4 lg:gap-10 h-full p-4 lg:p-8 flex-col text-justify">
        <div className="text-2xl lg:text-4xl font-semibold text-themeColorDark">Our Mission</div>
        <div>
          {" "}
          At Kaviseyon Foods, our mission is to create high-quality, nutritious, and delightful food
          products that both kids and parents love. We are committed to using the finest ingredients
          and innovative recipes to ensure every product not only meets but exceeds the standards of
          taste and nutrition. Our goal is to make mealtime easier, healthier, and more enjoyable
          for families everywhere.
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center h-full relative">
        <div className="relative h-5/6 sm:h-full w-8/12 sm:w-7/12 lg:w-10/12">
          <Image src={"/Images/EatingBaby1.png"} fill alt="Image" />
        </div>
      </div>
    </div>
  );
}

export default HomeMission;
