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
        Cancellation Policy
        </div>

        <div className="bg-themeColorLight p-6 rounded-md shadow-sm">
          {/* <h2 className="text-2xl font-bold mb-4 text-themeColorDark"></h2> */}
          <p className="text-lightGrey mb-2">
            At Kaviseyon Foods, customer satisfaction is our priority, but due to the perishable nature of our products, we cannot accept returns, cancellations, or offer refunds once an order has been placed.
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Product Quality Issues</h3>
            <p className="text-lightGrey">
              While we do not accept returns or cancellations, we take product quality very seriously. If you encounter any issues with the quality of our products, please contact us within 48 hours of receiving your order. Our team will review your concern, and if the product is found to be defective or unsatisfactory, we will provide a replacement.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Refunds</h3>
            <p className="text-lightGrey">
              As a general policy, we do not offer refunds. In cases where a replacement cannot be arranged due to a product defect, refunds may be considered on a case-by-case basis. Refunds, if approved, will be processed within 7-10 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
