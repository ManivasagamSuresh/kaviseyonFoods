"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const router = useRouter();
  const handleNavigation = (route: string) => {
    router.push(`/${route}`);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex py-10 px-5 my-6 flex-col bg-white shadow-lg rounded-md min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] bg-themeColorLight/45 pageMountAnimation w-full min-[560px]:w-3/4 lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px] max-w-[1850px]">
        <div className="text-themeColorDark text-2xl lg:text-4xl font-semibold text-center mb-6">
          Shipping Policy
        </div>

        <div className="bg-themeColorLight p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Shipping Timeline</h3>
          <p className="text-lightGrey mb-2">
            We aim to deliver within 2-5 business days for local orders and 7-10 business days for remote areas.
          </p>

          <h3 className="text-xl font-semibold mb-4">Shipping Charges</h3>
          <p className="text-lightGrey mb-2">
            Shipping is free for orders above ₹500. A flat charge of ₹50 is applicable for smaller orders.
          </p>

          <h3 className="text-xl font-semibold mb-4">Order Tracking</h3>
          <p className="text-lightGrey mb-2">
            You will receive an email with tracking details once your order is shipped.
          </p>

          <h3 className="text-xl font-semibold mb-4">Delays</h3>
          <p className="text-lightGrey mb-2">
            While we aim for prompt delivery, there could be delays due to external factors like weather, strikes, or lockdowns.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
