"use client"

import React from "react";
import { useRouter } from "next/navigation";
import RoundedButton from "../../../../component/RoundedButton";

export default function PasswordUpdated() {
    const router = useRouter();
    const handleClick = ()=>{ router.push("/auth/login")}

    return (
    <div style={styles.container}>
    <div style={styles.formContainer}>
        <img
          src="/Success.png"
          alt="Success Icon"
          style={styles.icon}
        />
        <h1 style={styles.header}>PASSWORD UPDATED</h1>
        <div style={styles.contentContainer}>
            <p style={styles.notice}>
                Your password has been changed successfully. Use your new password to log in.
            </p>
            <RoundedButton
                title="RETURN"
                style={styles.button}
                onClick={handleClick}>
            </RoundedButton>
      </div>
    </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#fff",
  },
  formContainer:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    padding: "0px 20px"
  },
  contentContainer: {
    maxWidth: "514px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
  },
  icon: {
    width: "174px",
    height: "174px",
  },
  header: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "48px",
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    width: "100%",
  },
  notice: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    color: "gray",
    textAlign: "center",
    width: "100%",
  },
  button:{
    width: "100%",
  }
};
