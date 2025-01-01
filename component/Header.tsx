"use client";

import { Colors } from "../constant/Colors";
import NavBar from "./NavBar";
import { FaRegBell } from "react-icons/fa";

export default function Header(){
    return (
        <div style={styles.container}>
            <NavBar>
           </NavBar>
           <div style={styles.rightContainer}>
                <button style={styles.bellButton}>
                    <FaRegBell size={24} color="white"/>
                </button>
                <div style={styles.infoContainer}>
                    <h1 style={styles.role}>MANAGER</h1>
                    <h2 style={styles.username}>Jame</h2>
                </div>
                <img 
                    src="/Avatar.png" 
                    alt="avatar">
                </img>
           </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        display: "flex",
        width: "100%",
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