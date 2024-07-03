'use client'
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

  const formik = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: ""
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
        const response = await axios.post('/api/AuthenticApi', {
          action: 'signin',
          email: values.email,
          password: values.password
        });
       
        console.log(response.data);
        if(response.status === 201){
          // localStorage.setItem("accessToken", user.data.token)
          toast.success('Signed In Successfully');
        }
      } catch (error) {
        console.log(error);
        toast.error('Email and Password mismatch');
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
            placeholder="Email/Phone"
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
          <button type="submit" className="bg-themeColorLight px-10 py-2 rounded-lg">Sign-In</button>
        </form>
      </div>
      <div>Forgot Password?</div>
      <div className="flex gap-3 text-lightGrey">
        Don't have an account?{" "}
        <div className="text-themeColorDark cursor-pointer font-semibold" onClick={() => { HandleNavigation('SignUp') }}>Sign Up</div>
      </div>
    </div>
  );
}

export default Page;
