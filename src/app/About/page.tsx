import React from "react";

function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className=" flex py-5 px-5 my-3 flex-col  min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] shadow-lg mb-20  pageMountAnimation w-full min-[560px]:w-3/4 lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px] max-w-[1850px]">
       <div className="bg-themeColorLight py-10 px-10">
        <div className="text-themeColorDark text-2xl lg:text-4xl font-semibold text-center">
          About
        </div>
        <div className="my-4 lg:text-lg text-justify lg:text-left text-lightGrey">
          Welcome to Kaviseyon Foods, where we believe that healthy eating should be a joyful
          adventure for both kids and parents! Founded by a new mom who experienced the daily
          challenges of providing nutritious meals for her little one, our mission is to make
          wholesome eating accessible and enjoyable for families everywhere..
        </div>
        <div className="my-4 ">
          <div className="text-themeColorDark text-xl font-semibold ">Our Mission and Vision</div>
          <div className="lg:text-lg my-4 text-justify lg:text-left text-lightGrey flex flex-col gap-4">
               <span >At Kaviseyon Foods, our mission is to create high-quality, nutritious, and delightful
            food products that both kids and parents love. We are committed to using the finest
            ingredients and innovative recipes to ensure every product not only meets but exceeds
            the standards of taste and nutrition. Our goal is to make mealtime easier, healthier,
            and more enjoyable for families everywhere.</span>
            <span >Our team, composed of passionate parents,
            and culinary professionals, works tirelessly to ensure that each product we offer is
            crafted with love and care.</span>
            <span >Thank you for choosing Kaviseyon Food’s. We’re excited to be
            a part of your family's mealtime moments and look forward to growing together in a
            future filled with joy and good food.
</span>
            
            <div className="my-14"> With warm regards, <br/>The Kaviseyon Foods Team</div>
          </div>
        </div>
        {/* <div className="my-4">
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
        </div> */}
        </div>
      </div>
    </div>
  );
}

export default Page;
