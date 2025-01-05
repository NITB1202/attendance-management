"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Role } from "../../enum/RoleEnum";
import Login from "./auth/login/page";
import Loading from "../../component/Loading";

export default function Home() {
  const router = useRouter();
  const { authState } = useAuth();
  const [getRoute, setGetRoute] = useState(false);

  useEffect(() => {
    const handleRedirect = () => {
      if (!authState.authenticated) {
        router.push("/auth/login");
      } else {
        switch (authState.role) {
          case Role.STUDENT:
            router.push("/student/dashboard");
            break;
          case Role.MANAGER:
            router.push("/manager/dashboard");
            break;
          case Role.TEACHER:
            router.push("/teacher/dashboard");
            break;
          default:
            router.push("/auth/login");
        }
      }

      setGetRoute(true);
    };

    if (authState.authenticated !== undefined) {
      handleRedirect();
    }
  }, [authState, router]);


  if (!getRoute) {
    return <Login/>;
  }

  return (
    <Loading/>  
  );
}