'use client'
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthenticatedRoute({ children }) {
  const { kaviFoodUser } = useSelector((state) => state.user);
  const router = useRouter();
  // const pathname = usePathname();
  useEffect(() => {
    if (!kaviFoodUser) {
      router.push("/");
    }
    // console.log(pathname);
  }, [kaviFoodUser]);

  return <div>{children}</div>;
}

export default AuthenticatedRoute;
