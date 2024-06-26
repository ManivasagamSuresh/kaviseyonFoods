import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { LuBaby } from "react-icons/lu";
import { VscPerson } from "react-icons/vsc";



const Categories: React.FC<CategoriesProps> = ({ setCategory }) => {
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  
  

  const handleNavigation = (url: string) => {
    setCategory(false);
    router.push(`/${url}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setCategory(false); // Set category to false when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className="flex items-center justify-evenly gap-3 rounded-lg shadow-lg bg-[#fff] py-4 px-5 z-[100] absolute top-10 left-4"
    >
      <div className="cursor-pointer hover:scale-110 duration-100 flex items-center gap-2 text-[#fefefa] bg-bgLightGreen py-2 px-3 rounded-md font-semibold" onClick={() => handleNavigation("Category/Kids")}>
       <LuBaby/> Kids
      </div>
     <div>|</div>
      <div className="cursor-pointer hover:scale-110 duration-100 flex items-center gap-1 bg-bgLightGreen py-2 px-3 rounded-md font-semibold" onClick={() => handleNavigation("Category/Adults")}>
        <VscPerson className="w-5 h-5"/> Adults
      </div>
    </div>
  );
};

export default Categories;
