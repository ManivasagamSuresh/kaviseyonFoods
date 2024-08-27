import { DBconnect, closeConnection } from "@/MongoDb/mongoDb";
import { SignInFormValues, SignUpFormValues, User } from "@/types/profile";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
var bcrypt = require("bcrypt");
import { v4 as uuidv4 } from "uuid";

let otpDatabase: any = {};

export const POST = async (request: NextRequest) => {
  const { action, email, otp, otpId } = await request.json();

  switch (action) {
    case "handleSendOtp":
      return handleSendOtp(email);
    case "handleVerifyOtp":
      return handleVerifyOtp(otpId, otp);

    default:
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
};

const handleSendOtp = async (email: string) => {
  try {
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    // Generate OTP and hash it for storage
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    console.log(otp);
    const payload = {
      otp: otp,
      email: email
    }
    console.log(payload)
    const sendMailtoUser = await axios.post('http://localhost:3000/api/ForgotPasswordOtpMail', payload); 
    // console.log(sendMailtoUser);
    const hashedOtp = await bcrypt.hash(otp, 10);
    const otpId = uuidv4();
    otpDatabase[otpId] = hashedOtp;
    // otp will expire in 10 mins
    setTimeout(() => {
      delete otpDatabase[otpId];
    }, 600000);

    //TODO Integrate Nodemailer here to send Otp.
    closeConnection();
    return new NextResponse(JSON.stringify({ otpId }), { status: 200 });
       
  } catch (error) {
    console.error("Error sending OTP:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

const handleVerifyOtp = async (otpId: string, otp: string) => {
  try {
    if (!otpId || !otp) {
      return new NextResponse('OTP and OTP ID are required', { status: 400 });
    }

    const storedHashedOtp = otpDatabase[otpId];
    if (!storedHashedOtp) {
      return new NextResponse('Invalid or expired OTP', { status: 400 });
    }

    const isOtpValid = await bcrypt.compare(otp, storedHashedOtp);
    if (isOtpValid) {
        // OTP is valid, proceed with password reset
        delete otpDatabase[otpId];
        closeConnection();
        return new NextResponse('OTP is valid', { status: 200 });
      } else {
        closeConnection();
        return new NextResponse('Invalid OTP', { status: 400 });
      }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};


export const PATCH = async (req: Request) => {
    try {
        const { email, password } = await req.json();
        const mongoConnection = await DBconnect();
        const hashedPAssword = await bcrypt.hash(password, 10);
    const updateResult = await mongoConnection?.collection('user').updateOne(
      { email: email },
      { $set: {
        password: hashedPAssword
      } }
    );
    closeConnection();
    return new NextResponse('Password Changed successfully', { status: 200 });
    } catch (error) {
        
    }
}