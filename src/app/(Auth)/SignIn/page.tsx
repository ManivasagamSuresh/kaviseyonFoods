"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { loginFailure, loginStart, loginSuccess } from "@/redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { SignInFormValues } from "@/types/profile";
import { clearGuestUser } from "@/redux/GuestSlice";

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useSearchParams();
  const from = params.get("from");
  const [loading, setLoading] = useState<boolean>(false);

  const { cart } = useSelector((state: any) => state.guestUser);
  // const { loading } = useSelector((state: any) => state.user);

  const HandleNavigation = (prop: string) => {
    router.push(`/${prop}`);
  };

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let error: Partial<SignInFormValues> = {};
      if (!values.email) {
        error.email = "Please enter Your Email";
      }
      if (values.email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        error.email = "Please enter valid Email";
      }
      if (!values.password) {
        error.password = "Please enter your Password";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        // dispatch(loginStart());
        setLoading(true);
        if (cart.items.length > 0) {
          var response = await axios.post("/api/AuthenticationApi", {
            action: "signin",
            email: values.email,
            password: values.password,
            cart: cart,
          });
        } else {
          var response = await axios.post("/api/AuthenticationApi", {
            action: "signin",
            email: values.email,
            password: values.password,
          });
        }

        if (response.status === 200) {
          dispatch(loginSuccess(response.data.user));
          setLoading(false);
          dispatch(clearGuestUser());
          localStorage.setItem("kavifoodsAdmin", response.data.user.isAdmin);
          localStorage.setItem("kavifoodsToken", response.data.token);
          toast.success(`Signed-in as ${response.data.user.name}`);
          // HandleNavigation('')
          if (from === "forgot-password" || from === "SignUp") {
            router.push("/");
          } else {
            router.back();
          }
        }
      } catch (error: any) {
        setLoading(false);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="w-full px-5 flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation">
      <div className="text-center flex flex-col gap-5 sm:gap-10 items-center justify-center text-white bg-milkWhite shadow-lg  w-full sm:w-[520px] h-fit py-10 sm:py-12 px-4 sm:px-8">
        <div className="text-2xl font-medium sm:text-4xl text-themeColorDark">Sign-In</div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full items-center">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="border-b w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-themeColorDark text-xs">{formik.errors.email}</div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-b w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-themeColorDark text-xs">{formik.errors.password}</div>
          )}
          <button type="submit" className="bg-themeColorDark px-10 py-2 rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center gap-4">
                Signing-In <ClipLoader loading={loading} color="#fff" size={18} />
              </div>
            ) : (
              "Sign-In"
            )}
          </button>
        </form>
      </div>
      <div
        onClick={() => {
          HandleNavigation("ForgotPassword");
        }}
        className="underline cursor-pointer hover:text-themeColorDark"
      >
        Forgot Password?
      </div>
      <div className="flex gap-3 text-lightGrey">
        Don't have an account?{" "}
        <div
          className="text-themeColorDark cursor-pointer font-semibold"
          onClick={() => {
            HandleNavigation("SignUp");
          }}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}

export default Page;
