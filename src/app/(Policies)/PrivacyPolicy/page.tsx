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
        <div className="text-themeColorDark text-2xl lg:text-4xl  font-semibold text-center mb-6">
          Privacy Policy & Terms and Conditions
        </div>

        {/* Terms and Conditions */}
        <div className="bg-themeColorLight p-6 rounded-md shadow-sm mb-6">
          <h2 className="text-2xl font-bold mb-4 text-themeColorDark">Terms and Conditions</h2>
          <p className="text-lightGrey mb-2">
            By accessing our website and purchasing our products, you agree to the following terms
            and conditions. Please take a moment to carefully review them.
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Product Usage</h3>
            <p className="text-lightGrey">
              Our products are crafted with the health and well-being of both children and adults in
              mind. While they are designed to meet the nutritional needs of young children, they
              are equally beneficial for adults who seek wholesome, natural, and organic food
              options. Whether it's for a baby, toddler, or adult, following the provided
              instructions guarantees safe and effective consumption, promoting a balanced diet for
              all ages.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Order Acceptance</h3>
            <p className="text-lightGrey">
              We reserve the right to refuse or cancel any order if we suspect fraudulent activity
              or violations of our policies. Any such decision is at our sole discretion.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Pricing and Availability</h3>
            <p className="text-lightGrey">
              Product prices and availability are subject to change without prior notice due to
              fluctuations in market conditions or other factors beyond our control. However, we are
              committed to transparency and will promptly notify you of any significant changes that
              may affect your order. In such cases, you will have the option to either confirm your
              purchase at the updated price or cancel your order without any penalties. Your
              satisfaction is important to us, and we strive to provide a seamless and fair shopping
              experience while maintaining the highest quality in our offerings.
            </p>
          </div>

          {/* <div className="mb-4">
            <h3 className="text-xl font-semibold">Shipping and Delivery</h3>
            <p className="text-lightGrey">
              We strive to deliver products within the estimated timeframes. However, unforeseen circumstances, such as natural events or logistical issues, may cause delays.
            </p>
          </div> */}

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Refunds and Cancellations</h3>
            <p className="text-lightGrey ">
              Please refer to our{" "}
              <span
                className="text-themeColorDark underline cursor-pointer"
                onClick={() => {
                  handleNavigation("CancellationPolicy");
                }}
              >
                Refund and Cancellation Policy
              </span>{" "}
              for more detailed information. Kindly note that we do not offer refunds or
              cancellations once an order is placed.
            </p>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-themeColorLight p-6 rounded-md shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-themeColorDark">Privacy Policy</h2>
          <p className="text-lightGrey mb-2">
            At Kaviseyon Foods, your privacy is of utmost importance to us. This policy outlines how
            we handle your personal information to provide a better shopping experience.
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Data Collection</h3>
            <p className="text-lightGrey">
              At Kaviseyon Foods, we are committed to safeguarding your privacy. To ensure smooth
              order processing and a personalized shopping experience, we collect essential personal
              information, including but not limited to your name, contact details, shipping
              address, and purchase history. This data helps us to process your orders efficiently,
              provide customer support, and tailor our services to your needs. Additionally, we may
              collect non-personal information through cookies and analytics tools to understand
              browsing behavior and enhance the website's usability.{" "}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Data Usage</h3>
            <p className="text-lightGrey">
              The personal data we collect is used strictly for the purposes of fulfilling orders,
              responding to your inquiries, and improving your overall experience on our platform.
              We may use your contact information to send updates regarding your order or to
              communicate relevant promotions and offers. Your data is kept secure and is never
              sold, traded, or shared with third parties, except with trusted logistics partners who
              are responsible for delivering your orders. We adhere to strict data protection
              protocols to ensure your privacy remains uncompromised throughout your interaction
              with our site.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Cookies</h3>
            <p className="text-lightGrey">
              We use cookies to improve website functionality and personalize the shopping
              experience. Cookies help us to remember your preferences and tailor our services
              accordingly.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="text-lightGrey">
              We implement robust security measures, including encryption and secure servers, to
              protect your personal data from unauthorized access, disclosure, or alteration.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Your Rights</h3>
            <p className="text-lightGrey">
              You have the right to access, update, or request the deletion of your personal data.
              To exercise these rights, please contact our support team at{" "}
              <a
                href="mailto:support@kaviseyon-foods.com"
                className="text-themeColorDark underline"
              >
                kaviseyonfoods@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
