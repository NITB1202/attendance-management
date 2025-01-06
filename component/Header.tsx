"use client";

import { useEffect, useState } from "react";
import { Colors } from "../constant/Colors";
import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";
import { FaRegBell } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Header() {
    const { authState } = useAuth();
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
      }
    }, []);

    const handleClick = async ()=> {
        try {
            await router.push("/general/profile");
        }
        catch(error){
            console.log("Navigate error");
        }
    }
  
    return (
      <div style={styles.container}>
        <NavBar role={authState.role} />
        <div style={styles.rightContainer} onClick={handleClick}>
          <button style={styles.bellButton}>
            <FaRegBell size={24} color="white" />
          </button>
          <div style={styles.infoContainer}>
            <h1 style={styles.role}>{authState.role}</h1>
            <h2 style={styles.username}>{username || "Guest"}</h2>
          </div>
          <img src="/Avatar.png" alt="avatar" />
        </div>
      </div>
    );
  }

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        display: "flex",
        width: "100vw",
        justifyContent: "flex-end",
        alignItems: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        padding: 10,
    },
    rightContainer:{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 20,
    },
    infoContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        cursor: "pointer",
    },
    role:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 16,
        color: "rgba(0,0,0,0.5)",
        textAlign: "right",
        width: "100%",
    },
    username:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 16,
        color: "black",
        textAlign: "right",
        width: "100%",
    },
    bellButton:{
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.darkBlue,
        borderRadius: "50%",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    }
}