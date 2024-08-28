import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import '@/styles/globals.css'
import Navbar from "@/Components/Navbar/Navbar";
import Topbar from "@/Components/Topbar/Topbar";
import AuthenticatedRoute  from "@/Components/AuthenticatedRoute/AuthenticatedRoute"
const inter = Inter({ subsets: ["latin"] });

import { Assistant } from 'next/font/google'
import Footer from "@/Components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Providers  from '@/Components/Provider/Provider'
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Script from "next/script";
// import { PersistGate } from "redux-persist/integration/react";
 
// If loading a variable font, you don't need to specify the font weight
const assistant = Assistant({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Kavi Seyon Foods",
  description: "Carefully curated by a Mom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body className={assistant.className} style={{overflow: "scroll"}}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Providers>
        <div className="min-h-screen  flex flex-col scroll-auto">
          <Topbar />
          <Navbar />
          <AuthenticatedRoute>
          {children}
          </AuthenticatedRoute>
            
          <ToastContainer />
          <Footer/>
        </div>    
      </Providers>
      </body>
    </html>
  );
}
