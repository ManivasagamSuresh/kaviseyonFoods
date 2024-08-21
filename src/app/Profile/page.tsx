"use client";
import { updateProfile } from "@/redux/UserSlice";
import { EditProfileFormValues, SignUpFormValues } from "@/types/profile";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function Page() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const route = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik<EditProfileFormValues>({
    initialValues: {
      name: kaviFoodUser.name,
      email: kaviFoodUser.email,
      phone: kaviFoodUser.phone,
      address: kaviFoodUser.address || '',
      city: kaviFoodUser.city || '',
      state: kaviFoodUser.state || '',
      landmark: kaviFoodUser.landmark || '',
      pincode: kaviFoodUser.pincode || '',
    },
    validate: (values) => {
      let error: Partial<SignUpFormValues> = {};
      if (!values.name) {
        error.name = "Please enter your name";
      }
      if (!values.email) {
        error.email = "Please enter Your Email";
      }
      if (values.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        error.email = "Please enter valid Email";
      }
      if (!values.phone) {
        error.phone = "Please enter Your Mobile Number";
      }
      if (values.phone && values.phone.length !== 10) {
        error.phone = "Please enter valid Mobile Number";
      }
      // if (!values.password) {
      //   error.password = "Please enter your Password";
      // }
      // if (values.password && values.password.length < 5) {
      //   error.password = "Please enter at least 5 letters";
      // }
      // if (!values.confirmpassword) {
      //   error.confirmpassword = "Please enter confirmpassword";
      // }

      // if (values.password && values.confirmpassword && values.password !== values.confirmpassword) {
      //   error.confirmpassword = "Confirm password does not match";
      // }
      return error;
    },
    onSubmit: async (values) => {
      // console.log("Form submitted"); 
      // console.log(values); 

      dispatch(updateProfile(values));

      try {
        // Uncomment and configure this part when ready to make API calls
        // const response = await axios.post('/api/AuthenticationApi', {
        //   action: 'editProfile',
        //   name: values.name,
        //   email: values.email,
        //   phone: values.phone,
        //   password: values.password,
        // });
        // if(response.status === 201){
        //   toast.success(response.data.message);
        // }
        
        handleEditProfile();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    },
  });

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleNavigation = (url: string) => {
    route.push(`/${url}`)
  }

  // const handleSaveprofile = () => {
  //   formik.handleSubmit();

  // }

  return (
    <div className="w-full px-5 flex flex-col gap-4 py-10 justify-center items-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  pageMountAnimation ">
      <div className="text-center flex flex-col gap-5 sm:gap-10 items-center justify-center bg-gradient-to-b from-white to-themeColorLight  w-full md:w-[720px] shadow-lg h-fit py-10 sm:py-8 px-2 sm:px-8">
        <div className="text-2xl font-medium sm:text-4xl text-themeColorDark">My Profile</div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full items-center">
          <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
              Name: {" "}
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent tracking-wider text-base sm:text-lg px-3 py-2  outline-none`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />{" "}
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="text-themeColorDark text-xs">{formik.errors.name}</div>
          )}
          <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
              Email: {" "}
            </span>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm text-base sm:text-lg bg-transparent tracking-wider px-3 py-2  outline-none`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="text-themeColorDark  text-xs">{formik.errors.email}</div>
          )}
          <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
              Phone: {" "}
            </span>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent text-base sm:text-lg tracking-wider px-3 py-2  outline-none`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-themeColorDark text-xs">{formik.errors.phone}</div>
          )}
           <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
            Address: {" "}
            </span>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent text-base sm:text-lg tracking-wider px-3 py-2  outline-none`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.address && formik.touched.address && (
            <div className="text-themeColorDark text-xs">{formik.errors.address}</div>
          )}
           <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
            City: {" "}
            </span>
            <input
              type="text"
              name="city"
              placeholder="City"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent text-base sm:text-lg tracking-wider px-3 py-2  outline-none`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.city && formik.touched.city && (
            <div className="text-themeColorDark text-xs">{formik.errors.city}</div>
          )}
           <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
            State: {" "}
            </span>
            <input
              type="text"
              name="state"
              placeholder="State"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent text-base sm:text-lg tracking-wider px-3 py-2  outline-none`}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.state && formik.touched.state && (
            <div className="text-themeColorDark text-xs">{formik.errors.state}</div>
          )}
           <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
              Pincode: {" "}
            </span>
            <input
              type="text"
              name="pincode"
              placeholder="pincode"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent text-base sm:text-lg tracking-wider px-3 py-2  outline-none`}
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.pincode && formik.touched.pincode && (
            <div className="text-themeColorDark text-xs">{formik.errors.pincode}</div>
          )}
          <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
              Landmark: {" "}
            </span>
            <input
              type="text"
              name="landmark"
              placeholder="landmark"
              className={`${
                editMode && "border-b"
              } w-8/12 sm:w-7/12 placeholder:text-sm bg-transparent text-base sm:text-lg tracking-wider px-3 py-2  outline-none`}
              value={formik.values.landmark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!editMode}
            />
          </div>
          {formik.errors.landmark && formik.touched.landmark && (
            <div className="text-themeColorDark text-xs">{formik.errors.landmark}</div>
          )}
          {editMode ? (
            <button
            type="submit"
              className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite"
            >
              Update Profile
            </button>
          ) : (
            
            <div className="flex flex-col sm:flex-row items-center sm:justify-evenly w-full mt-10 gap-4 sm:gap-0">

            <div  className="bg-themeColorDark px-6 py-2 rounded-lg cursor-pointer text-milkWhite w-[200px] sm:w-fit">
              Change Password
            </div>
            <div
              className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite w-[200px] sm:w-fit"
              onClick={handleEditProfile}
              >
              Edit Profile
            </div>
            <div  className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite w-[200px] sm:w-fit" onClick={()=>{handleNavigation('MyOrders')}}>
              My orders
            </div>
              
                </div>
            
          )}
        </form>
      </div>
    </div>
  );
}

export default Page;
