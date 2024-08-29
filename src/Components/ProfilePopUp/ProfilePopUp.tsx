import { logout } from "@/redux/UserSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfilePopup: React.FC<ProfilePopupProps> = ({ setprofilePop }) => {
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { kaviFoodUser } = useSelector((state: any) => state.user);

  const handleNavigation = (url: string) => {
    setprofilePop(false);
    router.push(`/${url}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setprofilePop(false);
    }
  };

  const HandleSignout = async () => {
    try {
      handleNavigation("");
      localStorage.removeItem("kavifoodsAdmin");
      localStorage.removeItem("kavifoodsToken");
      dispatch(logout());
      toast.success("Logged-out Successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className="flex flex-col items-center justify-evenly gap-3 rounded-lg shadow-lg bg-milkWhite w-[180px]  py-4 px-5 z-[100] absolute top-10 right-1 "
    >
      {!kaviFoodUser ? (
        <div
          className="cursor-pointer hover:scale-110 duration-100 flex items-center gap-2 py-2 px-3 rounded-md font-semibold"
          onClick={() => handleNavigation("SignIn")}
        >
          Sign-in/Sign-up
        </div>
      ) : (
        <>
          <div
            className="cursor-pointer hover:scale-110 duration-100 flex items-center gap-2 py-2 px-3 rounded-md font-semibold"
            onClick={() => handleNavigation("Profile")}
          >
            My Profile
          </div>
          <hr className="bg-themeColorDark w-full h-[0.4px]" />
          <div
            className="cursor-pointer hover:scale-110 duration-100 flex items-center gap-1 py-2 px-3 rounded-md font-semibold"
            onClick={() => handleNavigation(`${kaviFoodUser.isAdmin ? "AllOrders" : "MyOrders"}`)}
          >
            {kaviFoodUser.isAdmin ? "All Orders" : "My Orders"}
          </div>
          <hr className="bg-themeColorDark w-full h-[0.4px]" />
          <div
            className="cursor-pointer hover:scale-110 duration-100 py-2 px-3 rounded-md font-semibold"
            onClick={HandleSignout}
          >
            Logout
          </div>
        </>
      )}

      {/* <hr className="bg-themeColorDark w-full h-[0.4px]" /> */}
    </div>
  );
};

export default ProfilePopup;
