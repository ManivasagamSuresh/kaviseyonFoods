// src/app/api/AuthApi/route.tsx
import { DBconnect, closeConnection } from "@/MongoDb/mongoDb";
import { SignInFormValues, SignUpFormValues, User } from "@/types/profile";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const POST = async (request: NextRequest) => {
  const { action, email, password, name, phone, confirmpassword, cart } = await request.json();

  switch (action) {
    case "signin":
      return handleLogin({ email, password, cart });
    case "signup":
      return handleSignup({ name, email, password, confirmpassword, phone });
    case "logout":
      return handleLogout();
    default:
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  }
};

async function handleLogin({ email, password, cart }: SignInFormValues) {
  const request: SignInFormValues = {
    email: email,
    password: password,
  };
  const mongoConnection = await DBconnect();
  const user = await mongoConnection?.collection("user").findOne({ email: email });

  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      const token = await jwt.sign({ id: user._id }, NEXT_PUBLIC_JWT_SECRET);
      // TODO
      // coNFIRM LOGIN WITH MOBILE NUMBER ALSO
      if (cart) {
        const addCartToUser = await mongoConnection
          ?.collection("user")
          .updateOne({ email: email }, { $set: { cart: cart } });
        user.cart = cart;
      }

      return NextResponse.json({ user: user, token: token }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Email/Phone or Password Incorrect", token: "exampleToken" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Email Id not Found", token: "exampleToken" },
      { status: 400 }
    );
  }
}

async function handleSignup({ name, email, password, phone }: SignUpFormValues) {
  const hashedPAssword = await bcrypt.hash(password, 10);
  const request: User = {
    name: name,
    email: email,
    password: hashedPAssword,
    phone: phone,
    wishlist: [],
    cart: {
      totalPrice: 0,
      items: [],
    },
    isAdmin: false,
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  };
  const mongoConnection = await DBconnect();
  const user = await mongoConnection?.collection("user").findOne({
    $or: [{ email: email }, { phone: phone }],
  });
  if (user) {
    await closeConnection();
    // Determine which field caused the conflict
    const conflictField = user.email === email ? "Email" : "Mobile number";
    return NextResponse.json({ message: `${conflictField} already exists` }, { status: 409 });
  }
  const AddUser = await mongoConnection?.collection("user").insertOne(request);

  await closeConnection();
  return NextResponse.json({ message: "User Added Successfully" }, { status: 201 });
}

async function handleLogout() {
  return NextResponse.json({ message: "Logout successful" });
}

export const PATCH = async (req: Request) => {
  try {
    const data = await req.json();

    const { _id, name, email, phone, address, city, state, pincode, landmark } = data;

    if (!_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updateData: any = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;

    if (address) {updateData.address = address;}else{updateData.address = '';}
    if (city) {updateData.city = city;}else{updateData.city = '';}
    if (state) {updateData.state = state;}else{updateData.state = '';}
    if (pincode) {updateData.pincode = pincode;}else{updateData.pincode = ''}
    if (landmark) {updateData.landmark = landmark;}else{updateData.landmark = '';}

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }
    const mongoConnection = await DBconnect();

    const updateResult = await mongoConnection
      ?.collection("user")
      .updateOne({ _id: new ObjectId(`${_id}`) }, { $set: updateData });

    await closeConnection();

    if (updateResult && updateResult.modifiedCount > 0) {
      return NextResponse.json({ message: "Profile updated successfully" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in PATCH handler:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};
