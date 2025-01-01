"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../enum/RoleEnum";

export default function Home() {
  const router = useRouter();
  const {authState} = useAuth();

  useEffect(() => {
    if(!authState.authenticated)
      router.push("/auth/login");
    else
    {
      switch (authState.role)
      {
        case Role.STUDENT:
          router.push("/student/dashboard");
          break;
        case Role.MANAGER:
          router.push("/manager/dashboard");
          break;
        case Role.TEACHER:
          router.push("/teacher/dashboard");
          break; 
      }
    }
  }, [router, authState]);

  return null;
}
