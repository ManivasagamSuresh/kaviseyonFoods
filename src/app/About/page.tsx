import React from "react";

function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className=" flex py-5 px-10 my-3 flex-col  min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] bg-themeColorLight/45  pageMountAnimation w-full min-[560px]:w-3/4 lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px] max-w-[1850px]">
        <div className="text-themeColorDark text-2xl lg:text-4xl font-semibold text-center">About</div>
        <div className="my-4 lg:text-lg text-justify lg:text-left">
          Welcome to Kaviseyon Foods where we’re dedicated to making mealtime a joyful and
          nourishing experience for kids. Our journey began with a simple belief: that every child
          deserves delicious, wholesome food that supports their growth and brings a smile to their
          face.
        </div>
        <div className="my-4 ">
          <div className="text-themeColorDark text-xl font-semibold ">Our Mission</div>
          <div className="lg:text-lg my-4 text-justify lg:text-left">
            At Kaviseyon Foods, our mission is to create high-quality, nutritious, and delightful
            food products that both kids and parents love. We are committed to using the finest
            ingredients and innovative recipes to ensure every product not only meets but exceeds
            the standards of taste and nutrition. Our goal is to make mealtime easier, healthier,
            and more enjoyable for families everywhere.
          </div>
        </div>
        <div className="my-4">
          <div className="text-themeColorDark text-xl font-semibold">Our Vision</div>
          <div className="my-4 lg:text-lg text-justify lg:text-left">
            We envision a world where every child enjoys the benefits of wholesome, delicious food
            that fuels their adventures and learning. We strive to be a leader in the kids’ food
            industry, setting new standards for quality, transparency, and sustainability. By
            fostering a culture of care, creativity, and responsibility, we aim to inspire healthier
            eating habits and a greater connection to the foods that nourish us.
          </div>

          <div className="my-4 lg:text-lg text-justify lg:text-left">
            Our team, composed of passionate parents, nutrition experts, and culinary professionals,
            works tirelessly to ensure that each product we offer is crafted with love and care.
            From playful snacks to balanced meals, our products are designed to delight little taste
            buds while providing essential nutrients for healthy growth.
          </div>
          <div className="my-4  lg:text-lg text-justify lg:text-left">
            We also believe in being good stewards of the environment and supporting our
            communities. Our commitment to sustainability is reflected in our practices, from
            sourcing ingredients responsibly to reducing our environmental footprint.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
