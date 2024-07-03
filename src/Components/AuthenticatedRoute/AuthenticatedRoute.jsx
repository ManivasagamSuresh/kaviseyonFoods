'use client'
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AuthenticatedRoute({ children }) {
  const { kaviFoodUser } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!kaviFoodUser) {
      router.push("/");
    }
  }, [kaviFoodUser]);

  return <div>{children}</div>;
}

export default AuthenticatedRoute;
