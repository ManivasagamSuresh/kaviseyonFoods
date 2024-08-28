import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';

export const POST = async (req) => {
  
    const { amount, currency, receipt } = await req.json();
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEYID, // Store these in environment variables
        key_secret: process.env.RAZORPAY_KEYSECRET,
      });

      const options = {
        amount: amount * 100, // Amount in paise, so multiply by 100
        currency: currency,
        receipt: receipt,
      };
      try {
        // console.log(razorpay, options);
        const order = await razorpay.orders.create(options);
        return new NextResponse(JSON.stringify(order), { status: 200 });
      } catch (error) {
        console.log(error);
        return new NextResponse("Error occurred", { status: 500 });
      }
   
    
  }
