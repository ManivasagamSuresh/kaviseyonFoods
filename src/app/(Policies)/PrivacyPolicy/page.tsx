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
      <div className="flex py-10 px-5 mt-10 mb-20 flex-col bg-white shadow-lg rounded-md min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] bg-themeColorLight/45 pageMountAnimation w-full min-[560px]:w-3/4 lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px] max-w-[1850px]">
        <div className="text-themeColorDark text-2xl lg:text-4xl font-semibold text-center mb-6">
          Privacy Policy & Terms and Conditions
        </div>

        {/* Terms and Conditions */}
        <div className="bg-themeColorLight p-6 rounded-md shadow-sm mb-6">
          <h2 className="text-2xl font-bold mb-4 text-themeColorDark">Terms and Conditions</h2>
          <p className="text-lightGrey mb-2">
            Welcome to Kaviseyon Foods. By using our website and purchasing our products, you agree
            to the following terms and conditions. Please read them carefully.
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Acceptance of Terms</h3>
            <p className="text-lightGrey">
              By accessing or using our site, you agree to comply with these terms. If you do not
              agree, please refrain from using our services.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Product Information</h3>
            <p className="text-lightGrey">
              We strive to provide accurate product descriptions and images. However, we do not
              warrant that the information is error-free, complete, or current. All product
              availability is subject to change.
            </p>
          </div>

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
            <h3 className="text-xl font-semibold">Ordering and Payment</h3>
            <p className="text-lightGrey">
              By placing an order, you agree to provide accurate and complete information. Payment
              must be made in full at the time of purchase. We accept various payment methods, which
              will be outlined at checkout.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Shipping and Delivery</h3>
            <p className="text-lightGrey">
              We aim to process and ship orders promptly. Delivery times may vary based on location
              (approximately 6 to 7 days). We are not responsible for delays caused by third-party
              carriers or other circumstances beyond our control.
            </p>
          </div>

          {/* <div className="mb-4">
            <h3 className="text-xl font-semibold">Cancellations and Refunds</h3>
            <p className="text-lightGrey">
             <ul className="list-disc list-inside ml-4"> <li>Cancellations made within 24 hours will receive a full refund. </li><li>Cancellations made before dispatch will receive a 50% refund.</li><li>No cancellations are accepted after 3 days of booking.</li><li> Damaged or spilled products will be replaced at no additional cost.</li> 
             </ul></p>
          </div> */}
          {/* 
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Privacy Policy</h3>
            <p className="text-lightGrey">
              Your privacy is important to us. Please refer to our Privacy Policy for more details.
            </p>
          </div> */}

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="text-lightGrey">
              If you have any questions or concerns regarding these terms, please contact us at:
              <br />
              <strong>WhatsApp:</strong> 7010099780
              <br />
              <strong>Mail:</strong>{" "}
              <a href="mailto:kaviseyonfoods@gmail.com" className="text-themeColorDark underline">
                kaviseyonfoods@gmail.com
              </a>
              <br />
              <strong>Operating Address:</strong>
              <br />
              1011-1, Manikandan Street, Thasildar Nagar, Madurai 625020
            </p>
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="bg-themeColorLight p-6 rounded-md shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-themeColorDark">Privacy Policy</h2>
          <p className="text-lightGrey mb-2">
            At Kaviseyon Foods, your privacy is of utmost importance. This policy outlines how we
            handle your personal information to provide a better shopping experience.
          </p>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Information We Collect</h3>
            <p className="text-lightGrey">
              Personal Information: When you place an order, create an account, or contact us, we
              may collect personal information such as your name, email address, phone number,
              shipping address, and payment information.
            </p>
            <p className="text-lightGrey">
              Non-Personal Information: We may also collect non-personal information such as browser
              type, IP address, and pages visited on our site. This information helps us improve our
              services and user experience.
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">How We Use Your Information</h3>
            <p className="text-lightGrey">
              We use the information we collect for various purposes, including:
              <ul className="list-disc list-inside ml-4">
                <li>To process and fulfill your orders</li>
                <li>To communicate with you about your order or inquiries</li>
                <li>To improve our website and services</li>
                <li>
                  To send promotional emails and marketing communications (you may opt-out at any
                  time)
                </li>
                <li>To comply with legal obligations</li>
              </ul>
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Information Sharing</h3>
            <p className="text-lightGrey">
              We do not sell, trade, or transfer your personal information to outside parties
              without your consent, except in the following cases:
              <ul className="list-disc list-inside ml-4">
                <li>
                  Service Providers: We may share your information with trusted third-party service
                  providers who assist us in operating our website and conducting our business, such
                  as payment processors and shipping companies.
                </li>
                <li>
                  Legal Compliance: We may disclose your information if required by law or in
                  response to valid requests by public authorities.
                </li>
              </ul>
            </p>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold">Your Rights</h3>
            <p className="text-lightGrey">
              You have the right to access, update, or request deletion of your personal
              information. To exercise these rights, please contact us at:{" "}
              <a href="mailto:kaviseyonfoods@gmail.com" className="text-themeColorDark underline">
                kaviseyonfoods@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
