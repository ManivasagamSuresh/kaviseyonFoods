import React, { useState } from "react";
import { useRouter } from "next/navigation";

const MobNavbar: React.FC<MobNavbarProps> = ({ setMobNav }) => {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");

  const handleNavigation = (route: string) => {
    setMobNav(false);
    router.push(`/${route}`);
  };

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
    console.log(e);
    handleNavigation(`Category/${e.target.value}`);
  };

  return (
    <div className="w-full flex lg:hidden absolute left-0 top-[64px] z-10 h-[calc(100vh-88px)] mobileMenuAnimation">
      <div className="w-full sm:w-2/4 h-full py-12 px-4  flex flex-col gap-4 items-center sm:shadow-2xl bg-gradient-to-b from-white to-lightThemeGreen">
        <div
          className="text-xl sm:text-lg font-semibold MobileMenuAnimeFirst"
          onClick={() => {
            handleNavigation("");
          }}
        >
          Home
        </div>
        <hr className="w-48 sm:w-48" />
        <div
          className="text-xl sm:text-lg font-semibold MobileMenuAnimeSecond"
          onClick={() => {
            handleNavigation("Profile");
          }}
        >
          Profile
        </div>
        <hr className="w-48 sm:w-48" />
        <div className="text-xl sm:text-lg font-semibold MobileMenuAnimeThird">
          <select
            name="category"
            id="category"
            value={category}
            className="w-full  px-2 rounded-lg"
            onChange={(e) => {
              handleCategoryChange(e);
            }}
          >
            <option value="" className="disable">
              Category
            </option>
            <option value="Kids">Kids</option>
            <option value="Adults">Adults</option>
          </select>
        </div>
        <hr className="w-48 sm:w-48" />
        <div
          className="text-xl sm:text-lg font-semibold MobileMenuAnimeFourth"
          onClick={() => {
            handleNavigation("Wishlist");
          }}
        >
          Wishlist
        </div>
        <hr className="w-48 sm:w-48" />
        <div
          className="text-xl sm:text-lg font-semibold MobileMenuAnimeFifth"
          onClick={() => {
            handleNavigation("About");
          }}
        >
          About Us
        </div>
      </div>
      <div className="hidden sm:block sm:w-2/4 bg-gradient-to-b from-white to-lightThemeGreen opacity-[60%]"></div>
    </div>
  );
};

export default MobNavbar;
