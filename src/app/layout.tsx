import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar/Navbar";
import Topbar from "@/Components/Topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

import { Assistant } from 'next/font/google'
 
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
      <body className={assistant.className}>
        <div>
          <Topbar />
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
