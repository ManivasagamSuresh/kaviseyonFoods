"use client";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [otpId, setOtpId] = useState("");
  const [OtpComponent, setOtpComponent] = useState<boolean>(false);
  const [PasswordComponent, setPasswordComponent] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpSend = async () => {
    try {
      setLoading(true);
      //   await wait(3000);
      const payload = {
        action: "handleSendOtp",
        email: email,
      };
      const sendOtp = await axios.post("/api/ForgotPasswordAPI", payload);
      setOtpId(sendOtp.data.otpId);
      console.log(sendOtp.data);
      //   console.log(email);
      setLoading(false);
      setOtpComponent(true);

      if (otpRefs.current[0]) {
        otpRefs.current[0].focus();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong. Try again later");
    }
  };

  const handleOtpVerify = async () => {
    try {
      setLoading(true);
      //   await wait(3000);
      const otpString = otp.join("");
      console.log("OTP entered:", otpString);
      // Handle OTP verification
      const payload = {
        action: "handleVerifyOtp",
        otp: otpString,
        otpId,
      };
      const sendOtp = await axios.post("/api/ForgotPasswordAPI", payload);
      console.log(sendOtp.data);
      if (sendOtp.data === "OTP is valid") {
        setLoading(false);
        setOtpComponent(false);
        setPasswordComponent(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Invalid Otp");
    }
  };

  const handleSetNewPassword = async () => {
    try {
      setLoading(true);
      //   await wait(3000);
      if (password === confirmPassword) {
        console.log("password is same");
        const payload = {
          email,
          password,
        };
        const changePassword = await axios.patch("/api/ForgotPasswordAPI", payload);
        if ((changePassword.data = "Password Changed successfully")) {
          toast.success("Password Changed successfully");
        }
        setLoading(false);
        router.push("/SignIn?from=forgot-password");
      } else {
        setLoading(false);
        toast.error("password and confirm password are not same");
        console.log("password and confirm password are not same");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong. Try again later");
    }
  };

  useEffect(() => {
    if (OtpComponent && otpRefs.current[0]) {
      otpRefs.current[0].focus();
    }
  }, [OtpComponent]);

  const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="w-full flex justify-center">
      <div className="text-center flex items-center justify-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  pageMountAnimation w-full max-w-[1850px]">
        <div className="text-center flex flex-col gap-4 sm:gap-10 items-center justify-center  bg-milkWhite shadow-lg  w-10/12 sm:w-[520px] h-fit py-10 sm:py-12 px-4 sm:px-8">
          <div className="text-2xl font-medium sm:text-4xl text-themeColorDark">
            Forgot Password
          </div>
          {!OtpComponent ? (
            <>
              {PasswordComponent ? (
                <div className="text-themeColorDark text-sm md:text-base">
                  {" "}
                  Set Your New Password
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    className="border-b w-3/4 placeholder:text-sm tracking-wider px-5 py-2 outline-none"
                  />
                  {loading ? (
                    <button className="bg-themeColorDark px-10 py-2 rounded-lg text-milkWhite flex items-center justify center gap-2">
                      Sending OTP <ClipLoader loading={loading} color="#fff" size={18} />
                    </button>
                  ) : (
                    <button
                      className="bg-themeColorDark px-10 py-2 rounded-lg text-milkWhite cursor-pointer"
                      onClick={handleOtpSend}
                    >
                      Send OTP
                    </button>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-fit gap-5">
              <div className="text-xl md:text-2xl font-semibold text-black">OTP Verification</div>
              <div className="text-black">Enter the OTP that you have received via Email</div>
              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    name={`otp${index + 1}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    className="text-center w-10 h-10 border flex justify-center items-center  border-themeColorDark rounded-lg outline-none placeholder:text-black text-black"
                  />
                ))}
              </div>
              {loading ? (
                <button className="bg-themeColorDark px-10 py-2 rounded-lg text-milkWhite flex items-center justify center gap-2">
                  verifying OTP <ClipLoader loading={loading} color="#fff" size={18} />
                </button>
              ) : (
                <button
                  className="bg-themeColorDark px-10 py-2 rounded-lg text-milkWhite cursor-pointer"
                  onClick={handleOtpVerify}
                >
                  Submit OTP
                </button>
              )}
            </div>
          )}
          {PasswordComponent && (
            <>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="border-b w-3/4 placeholder:text-sm tracking-wider px-5 py-2 outline-none"
              />
              <input
                type="password"
                name="forgotpassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                className="border-b w-3/4 placeholder:text-sm tracking-wider px-5 py-2 outline-none"
              />
              {}
              <button
                className="bg-themeColorDark px-10 py-2 rounded-lg text-milkWhite cursor-pointer flex items-center justify center gap-2"
                onClick={handleSetNewPassword}
              >
                Change Password <ClipLoader loading={loading} color="#fff" size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
