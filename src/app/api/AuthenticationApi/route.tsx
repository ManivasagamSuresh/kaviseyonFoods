// src/app/api/AuthApi/route.tsx
import { DBconnect, closeConnection } from '@/MongoDb/mongoDb';
import { SignInFormValues, SignUpFormValues, User } from '@/types/profile';
import { NextRequest, NextResponse } from 'next/server';
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


export const POST = async (request: NextRequest) => {
  const { action, email, password, name, phone, confirmpassword } = await request.json();
  
  switch (action) {
    case 'signin':
      return handleLogin({ email, password });
    case 'signup':
      return handleSignup({ name, email, password, confirmpassword, phone });
    case 'logout':
      return handleLogout();
    default:
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }
}

async function handleLogin({ email, password }: SignInFormValues) {
  // Add your authentication logic here
  // console.log(email, password);
  const request: SignInFormValues = {
    email: email,
    password: password,
  }
  const mongoConnection = await DBconnect();
  const user = await mongoConnection?.collection('user').findOne({email:email});
  // console.log(user);
  if(user){
    const compare = await bcrypt.compare(password, user.password);
    // console.log('compare: ',compare);
    if(compare){
     
      const token = await jwt.sign({id: user._id},JWT_SECRET);
      // console.log(token);
      return NextResponse.json({ user: user , token: token }, { status: 200 });
    }else{
      return NextResponse.json({ message: 'Email/Phone or Password Incorrect', token: 'exampleToken' }, { status: 400 });
    }
  }else{
    return NextResponse.json({ message: 'Email Id not Found', token: 'exampleToken' }, { status: 400 });
  }
  
}

async function handleSignup({ name, email, password, phone }: SignUpFormValues) {
  const hashedPAssword = await bcrypt.hash(password, 10);
  const request: User = {
    name:name,
    email: email,
    password: hashedPAssword,
    phone: phone ,
    wishlist: [],
    cart: {
      totalPrice: 0,
      items : []
    },
    myOrder: [],
    isAdmin: false   
  }
  const mongoConnection  = await DBconnect();
  const user = await mongoConnection?.collection('user').findOne({email: email});
  if(user){
    await closeConnection();
   return  NextResponse.json({ message: 'Email Already Exist' }, { status: 409 });
  }
  const AddUser = await mongoConnection?.collection('user').insertOne(request);

  await closeConnection();
  return NextResponse.json({ message: "User Added Successfully" }, { status: 201 });
}

async function handleLogout() {
  // Add your logout logic here
  // console.log(localStorage)
  return NextResponse.json({ message: 'Logout successful' });
}


export const GET = async (req: Request) => {
  try {
    
  } catch (error) {
   
  }
};