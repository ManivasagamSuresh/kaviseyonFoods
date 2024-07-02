// src/app/api/AuthApi/route.tsx
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { action, email, password, name, phone, confirmpassword } = await request.json();

  if (!action) {
    return NextResponse.json({ message: 'Action not specified' }, { status: 400 });
  }

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
  console.log(email, password);
  return NextResponse.json({ message: 'Login successful', token: 'exampleToken' }, { status: 201 });
}

async function handleSignup({ name, email, password, confirmpassword, phone }: SignUpFormValues) {
  // Add your signup logic here
  return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
}

async function handleLogout() {
  // Add your logout logic here
  return NextResponse.json({ message: 'Logout successful' });
}
