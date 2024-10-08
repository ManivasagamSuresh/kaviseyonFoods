"use client";
import Image from "next/image";
import React, { useState } from "react";
import { RiInstagramLine } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiArrowDownWideLine } from "react-icons/ri";
import { RiArrowUpWideLine } from "react-icons/ri";

import Link from "next/link";

function Footer() {
  const [contact, setContact] = useState(false);
  const [Policy, setPolicy] = useState(false);
  const [social, setSocial] = useState(false);
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(`/${route}`);
  };

  const handleContactUs = () => {
    setContact(!contact);
  };

  const handlePolicy = () => {
    setPolicy(!Policy);
  };

  return (
    <div className=" w-full flex justify-center  items-center">
      <div className="h-fit hidden md:flex px-4 md:px-10 lg:px-40 py-5 flex-wrap md:flex-row gap-0 md:gap-6 md:justify-around text-textColor w-full max-w-[1850px] bg-[#F0F0F0] rounded-t-3xl md:rounded-t-[36px]">
        <div className="flex flex-col md:flex-row gap-4 justify-center md:gap-20 ">
          <div className="relative hidden md:block w-20 h-10">
            <Image src="/Images/KaviseyonLogo.png" alt="logo" fill />
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="text-lg font-semibold ">Contact Us</div>

            <div>
              <div className="flex gap-2 items-center h-fit">
                <span>
                  <IoCall />
                </span>{" "}
                <span className="text-sm 2xl:text-base">+91 7010099780</span>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center h-fit">
                {" "}
                <span>
                  {" "}
                  <MdEmail />{" "}
                </span>{" "}
                <span className="text-sm 2xl:text-base"> kaviseyonfoods@gmail.com</span>
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-start h-fit">
                {" "}
                <span>
                  {" "}
                  <FaLocationDot />{" "}
                </span>{" "}
                <span className="text-xs 2xl:text-base w-48">
                  2/1077-1, Manikandan street, Thasildhar Nagar, Madurai. Tamil Nadu - 625020{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg lg:text-xl font-semibold ">Policies</div>
          <div className="flex flex-col text-sm gap-1">
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleNavigation("PrivacyPolicy");
              }}
            >
              Privacy Policy and TC
            </div>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleNavigation("CancellationPolicy");
              }}
            >
              Cancellation Policy
            </div>
            <div
              className="cursor-pointer hover:underline"
              onClick={() => {
                handleNavigation("ShippingPolicy");
              }}
            >
              Shipping Policy
            </div>
          </div>
        </div>
        <div className="flex-col gap-2 flex w-full mt-5 md:mt-0 md:w-fit items-center justify-center md:justify-start">
          <div className="flex flex-col gap-2">
            <div className="font-semibold 2xl:text-lg text-center md:text-left">Follow us on</div>
            <div className="flex gap-3">
              {/* TODO ADD LINKS FOR SOCIAL MEDIA(YouTube) */}
              <div>
                <Link href={"https://www.instagram.com/kaviseyonfoods/"} target="blank">
                  <RiInstagramLine className="w-5 h-5 cursor-pointer" />
                </Link>{" "}
              </div>
              <div>
                <FaYoutube className="w-5 h-5 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden h-fit flex flex-col gap-4 py-10 px-16 text-textColor w-full bg-[#F0F0F0] rounded-t-3xl ">
        <div className="flex justify-between items-center h-fit" onClick={handleContactUs}>
          <span className="text-lg font-semibold">Contact Us</span>{" "}
          {contact ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
        </div>

        {contact && (
          <div className="flex flex-col gap-2 transition">
            <div>
              <div className="flex gap-2 items-center h-fit">
                <span>
                  <IoCall />
                </span>{" "}
                <span className="text-sm 2xl:text-base">+91 7010099780</span>
              </div>
            </div>
            <div>
              <div className="flex gap-2 items-center h-fit">
                {" "}
                <span>
                  {" "}
                  <MdEmail />{" "}
                </span>{" "}
                <span className="text-sm 2xl:text-base"> kaviseyonfoods@gmail.com</span>
              </div>
            </div>

            <div>
              <div className="flex gap-2 items-start h-fit">
                {" "}
                <span>
                  {" "}
                  <FaLocationDot />{" "}
                </span>{" "}
                <span className="text-xs 2xl:text-base w-48">
                  2/1077-1, Manikandan street, Thasildhar Nagar, Madurai. Tamil Nadu - 625020{" "}
                </span>
              </div>
            </div>
          </div>
        )}
        <hr className="border-[1.5px]" />
        <div className="flex justify-between items-center h-fit" onClick={handlePolicy}>
          <span className="text-lg font-semibold">Policies</span>{" "}
          {Policy ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
        </div>
        {Policy && (
          <div className="flex flex-col gap-2">
            <div
              className="text-sm cursor-pointer hover:underline"
              onClick={() => {
                handleNavigation("PrivacyPolicy");
              }}
            >
              Privacy Policy and TC
            </div>
            <div
              className="text-sm cursor-pointer hover:underline"
              onClick={() => {
                handleNavigation("CancellationPolicy");
              }}
            >
              Cancellation Policy
            </div>
            <div
              className="text-sm cursor-pointer hover:underline"
              onClick={() => {
                handleNavigation("ShippingPolicy");
              }}
            >
              Shipping Policy
            </div>
          </div>
        )}
        <hr className="border-[1.5px]" />
        <div className="flex items-center w-full justify-center h-fit gap-3">
          <span className="font-semibold">Follow us on: </span>{" "}
          <div className="flex gap-2 h-fit items-center">
            <div >
              <Link href={"https://www.instagram.com/kaviseyonfoods/"} target="blank">
                <RiInstagramLine className="w-5 h-5 cursor-pointer" />
              </Link>{" "}
            </div>
            <div>
              <FaYoutube className="w-5 h-5 cursor-pointer" />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Footer;
