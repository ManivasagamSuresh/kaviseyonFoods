import React from "react";
import { Assistant } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const assistant = Assistant({
  subsets: ["latin"],
  display: "swap",
});

function Topbar() {
  return (
    <div className="w-full flex justify-center sticky top-0 z-50 ">
      <div
        className={`w-full h-6 lg:h-10 text-xs lg:text-sm text-white bg-themeColorDark py-1 lg:py-2 text-center tracking-wide ${assistant.className} sticky top-0 z-50 max-w-[1850px]`}
      >
        Carefully curated by a Mom
      </div>
    </div>
  );
}

export default Topbar;
