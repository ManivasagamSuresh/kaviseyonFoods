"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";


function Page() {
  const router = useRouter();

  const HandleNavigation = (prop: string) => {
    router.push(`/${prop}`);
  };

  const formik = useFormik<SignUpFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: "",
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
      if (!values.password) {
        error.password = "Please enter your Password";
      }
      if (values.password && values.password.length < 5) {
        error.password = "Please enter atleat 5 letters";
      }
      if (!values.confirmpassword) {
        error.confirmpassword = "Please enter confirmpassword";
      }

      if (values.password && values.confirmpassword && values.password !== values.confirmpassword) {
        error.confirmpassword = "Confirm password does not match";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/AuthenticationApi', {
          action: 'signup',
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmpassword: values.confirmpassword,
        });
        if(response.status === 201){
          toast.success(response.data.message);
          HandleNavigation("SignIn");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="w-full px-5 flex flex-col gap-4 py-10 justify-center items-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  pageMountAnimation ">
      <div className="text-center flex flex-col gap-5 sm:gap-10 items-center justify-center text-white bg-milkWhite shadow-lg w-full sm:w-[520px] h-fit py-10 sm:py-8 px-4 sm:px-8">
        <div className="text-2xl font-medium sm:text-4xl text-themeColorDark">Sign Up</div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 w-full items-center">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border-b w-4/5 sm:w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <div className="text-themeColorDark text-xs">{formik.errors.name}</div>
          )}

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="border-b w-4/5 sm:w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="text-themeColorDark  text-xs">{formik.errors.email}</div>
          )}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="border-b w-4/5 sm:w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-themeColorDark text-xs">{formik.errors.phone}</div>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-b w-4/5 sm:w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="text-themeColorDark text-xs">{formik.errors.password}</div>
          )}

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            className="border-b w-4/5 sm:w-3/4 placeholder:text-sm tracking-wider px-5 py-2 text-themeColorDark outline-none"
            value={formik.values.confirmpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.confirmpassword && formik.touched.confirmpassword && (
            <div className="text-themeColorDark text-xs">{formik.errors.confirmpassword}</div>
          )}
          <button type="submit" className="bg-themeColorDark px-10 py-2 rounded-lg">
            Sign-Up
          </button>
        </form>
      </div>
      <div className="flex gap-3 text-lightGrey">
        Already have an account?{" "}
        <div
          className="text-themeColorDark cursor-pointer font-semibold"
          onClick={() => {
            HandleNavigation("SignIn");
          }}
        >
          Sign In
        </div>
      </div>
    </div>
  );
}

export default Page;
