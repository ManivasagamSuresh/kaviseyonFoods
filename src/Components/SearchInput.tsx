// src/SearchInput.jsx
import React, { useEffect, useState } from "react";

const SearchInput = () => {
  const [placeholder, setPlaceholder] = useState("");
  const placeholderText = "Search";
  const animationSpeed = 400; // Speed of animation in milliseconds

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setPlaceholder(placeholderText.substring(0, currentIndex + 1));
      currentIndex = (currentIndex + 1) % (placeholderText.length + 1);
    }, animationSpeed);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <input
      type="text"
      className= "w-full border-none bg-transparent outline-none text-themeColorDark placeholder-themeColorDark"
      placeholder={placeholder}
    />
  );
};

export default SearchInput;
