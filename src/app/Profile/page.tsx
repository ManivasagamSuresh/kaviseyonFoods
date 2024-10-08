"use client";
import { updateProfile } from "@/redux/UserSlice";
import { EditProfileFormValues, SignUpFormValues } from "@/types/profile";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function Page() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik<EditProfileFormValues>({
    initialValues: {
      name: kaviFoodUser ? kaviFoodUser.name : "",
      email: kaviFoodUser ? kaviFoodUser.email : "",
      phone: kaviFoodUser ? kaviFoodUser.phone : "",
      address: kaviFoodUser ? kaviFoodUser.address : "",
      city: kaviFoodUser ? kaviFoodUser.city : "",
      state: kaviFoodUser ? kaviFoodUser.state : "",
      landmark: kaviFoodUser ? kaviFoodUser.landmark : "",
      pincode: kaviFoodUser ? kaviFoodUser.pincode : "",
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
      if (values.phone && !/^\d+$/.test(values.phone)) {
        error.phone = "Mobile Number should contain only digits";
      }

      // Check for the presence of address, city, state, and pincode
      const addressFields = [values.address, values.city, values.state, values.pincode];
      const areAnyAddressFieldsFilled = addressFields.some((field) => field?.trim() !== "");

      // Ensure all address-related fields are filled or none
      if (areAnyAddressFieldsFilled) {
        if (!values.address) {
          error.address = "Please enter your Address";
        }
        if (!values.city) {
          error.city = "Please enter your City";
        }
        if (!values.state) {
          error.state = "Please enter your State";
        }
        if (!values.pincode) {
          error.pincode = "Please enter your Pincode";
        }
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const response = await axios.patch("/api/AuthenticationApi", {
          _id: kaviFoodUser._id,
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
          landmark: values.landmark,
        });
        if (response.status === 201) {
          dispatch(updateProfile(values));
          toast.success(response.data.message);
          setLoading(false);
        }

        handleEditProfile();
      } catch (error: any) {
        setLoading(false);
        toast.error("Oops, Something went wrong");
      }
    },
  });

  const handleEditProfile = () => {
    setEditMode(!editMode);
  };

  const handleNavigation = (url: string) => {
    route.push(`/${url}`);
  };

  return (
    <div className="w-full px-5 flex flex-col gap-4 py-10 justify-center items-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  pageMountAnimation ">
      <div className="text-center flex flex-col gap-5 sm:gap-10 items-center justify-center bg-gradient-to-b from-white to-themeColorLight  w-full md:w-[720px] shadow-lg h-fit py-10 sm:py-8 px-2 sm:px-8">
        <div className="text-2xl font-medium sm:text-4xl text-themeColorDark">My Profile</div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full items-center">
          <div className="w-full flex justify-center">
            <span className="bg-transparent tracking-wider text-base sm:text-lg text-right py-2 px-3 outline-none w-4/12 sm:w-5/12">
              Name:{" "}
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
              Email:{" "}
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
              Phone:{" "}
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
              Address:{" "}
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
              City:{" "}
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
              State:{" "}
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
              Pincode:{" "}
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
              Landmark:{" "}
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

          {editMode ? (
            <>
              {loading ? (
                <div className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite flex items-center justify-center gap-2">
                  <span>Updating</span>{" "}
                  <span>
                    <ClipLoader loading={loading} color="#fff" size={16} />
                  </span>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite"
                  >
                    Update Profile
                  </button>
                  <div
                    className="bg-milkWhite px-10 py-2 rounded-lg cursor-pointer border border-themeColorDark text-themeColorDark"
                    onClick={handleEditProfile}
                  >
                    Cancel
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col sm:flex-row items-center sm:justify-evenly w-full mt-10 gap-4 sm:gap-0">
              {/* <div className="bg-themeColorDark px-6 py-2 rounded-lg cursor-pointer text-milkWhite w-[200px] sm:w-fit">
                Change Password
              </div> */}
              <div
                className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite w-[200px] sm:w-fit"
                onClick={handleEditProfile}
              >
                Edit Profile
              </div>
              {kaviFoodUser && kaviFoodUser.isAdmin ? (
                <></>
              ) : (
                <div
                  className="bg-themeColorDark px-10 py-2 rounded-lg cursor-pointer text-milkWhite w-[200px] sm:w-fit"
                  onClick={() => {
                    handleNavigation("MyOrders");
                  }}
                >
                  My orders
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Page;
