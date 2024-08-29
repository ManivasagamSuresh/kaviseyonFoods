import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/UserSlice";
import { toast } from "react-toastify";

const MobNavbar: React.FC<MobNavbarProps> = ({ setMobNav }) => {
  const router = useRouter();
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [category, setCategory] = useState<boolean>(false);
  const [profile, setprofile] = useState<boolean>(false);

  const handleNavigation = (route: string) => {
    setMobNav(false);
    router.push(`/${route}`);
  };

  const handleCategoryChange = (cat: string) => {
    handleNavigation(`Category/${cat}`);
  };

  const HandleSignout = async () => {
    try {
      handleNavigation("");
      dispatch(logout());
      localStorage.removeItem("kavifoodsAdmin");
      localStorage.removeItem("kavifoodsToken");
      toast.success("Logged-out Successfully");
    } catch (error: any) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="w-full flex lg:hidden absolute left-0 top-[64px] z-10 h-[calc(100vh-88px)] mobileMenuAnimation">
      <div className="w-full sm:w-2/4 h-full py-12 px-4  flex flex-col gap-4 items-center sm:shadow-2xl bg-gradient-to-b from-white to-themeColorLight">
        <div
          className="text-xl sm:text-lg font-semibold MobileMenuAnimeFirst"
          onClick={() => {
            handleNavigation("");
          }}
        >
          Home
        </div>
        <hr className="w-48 sm:w-48" />
        {/* <div
          className="text-xl sm:text-lg font-semibold MobileMenuAnimeSecond"
        >
          
          <div className={`p-1 flex gap-2 items-center justify-center  ${profile && 'text-lightGrey' }`} onClick={()=>{setprofile(!profile)}}>Profile {profile ? <IoIosArrowUp/> : <IoIosArrowDown />}</div>
          {
            profile && <div className="flex flex-col items-center MobNavcategoryAnimation">
            <div className="py-2" onClick={()=>{handleCategoryChange('SignIn')}}>Sign-in/Sign-up</div>
            <div className="py-2" onClick={()=>{handleCategoryChange('Profile')}}>My Profile</div>
            <div className="py-2" onClick={()=>{handleCategoryChange('MyOrders')}}>My Orders</div>
            <div className="py-2" >Logout</div>
           </div>
          }
        </div> */}
        {kaviFoodUser ? (
          <>
            <div
              className="text-xl sm:text-lg font-semibold MobileMenuAnimeSecond"
              onClick={() => {
                handleNavigation("Profile");
              }}
            >
              My Profile
            </div>
            <hr className="w-48 sm:w-48" />
            <div
              className="text-xl sm:text-lg font-semibold  MobileMenuAnimeThird"
              onClick={() => {
                handleNavigation(`${kaviFoodUser.isAdmin ? "AllOrders" : "MyOrders"}`);
              }}
            >
              {kaviFoodUser.isAdmin ? "All Orders" : "My Orders"}
            </div>
            {/* <hr className="w-48 sm:w-48" /> */}
            {/* <div
          className={`text-xl sm:text-lg font-semibold MobileMenuAnimeFourth`}
          onClick={() => {
            handleNavigation("Wishlist");
          }}
        >
          Wishlist
        </div> */}
          </>
        ) : (
          <div
            className="text-xl sm:text-lg font-semibold MobileMenuAnimeSecond"
            onClick={() => {
              handleNavigation("SignIn");
            }}
          >
            Sign-in/Sign-up
          </div>
        )}

        {/* <div className="text-xl sm:text-lg font-semibold flex flex-col items-center justify-center MobileMenuAnimeThird">
          <div className={`p-1 flex gap-2 items-center justify-center  ${category && 'text-lightGrey' }`} onClick={()=>{setCategory(!category)}}>Category {category ? <IoIosArrowUp/> : <IoIosArrowDown />}</div>
       {
        category &&
         <div className="flex flex-col items-center MobNavcategoryAnimation">
          <div className="py-2" onClick={()=>{handleCategoryChange('Kids')}}>Kids </div>
          <div className="py-2" onClick={()=>{handleCategoryChange('Adults')}}>Adults</div>
         </div>
        }
          <select
            name="category"
            id="category"
            value={category}
            className="w-full  px-2 rounded-lg bg-transparent"
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
        </div> */}

        <hr className="w-48 sm:w-48" />
        <div
          className={`text-xl sm:text-lg font-semibold ${
            kaviFoodUser ? "MobileMenuAnimeFifth" : "MobileMenuAnimeThird"
          } `}
          onClick={() => {
            handleNavigation("About");
          }}
        >
          About Us
        </div>
        {kaviFoodUser && (
          <>
            <hr className="w-48 sm:w-48" />
            <div
              className="text-xl sm:text-lg font-semibold MobileMenuAnimesixth"
              onClick={HandleSignout}
            >
              Logout
            </div>
          </>
        )}
      </div>
      <div className="hidden sm:block sm:w-2/4 bg-gradient-to-b from-white to-themeColorLight opacity-[60%]"></div>
    </div>
  );
};

export default MobNavbar;
