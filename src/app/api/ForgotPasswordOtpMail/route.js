import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
const emailUser = process.env.EMAIL_USER; // Replace with actual environment variable for email
const emailPassword = process.env.EMAIL_PASSWORD;

export const POST = async (request) => {
  try {
    const { otp, email } = await request.json();

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "Kavi Seyon Foods OTP",
      text: `Your otp for change password is ${otp}. This otp will be valid for 10 mins`,
    };

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Mail sent successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
