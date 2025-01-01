"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import validateEmail from "../../../../util/validEmail";
import authAPI from "../../../../api/authAPI";
import Input from "../../../../component/Input";
import RoundedButton from "../../../../component/RoundedButton";
import ErrorMessage from "../../../../component/ErrorMessage";
import { Colors } from "../../../../constant/Colors";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const router = useRouter();

  const handleClick = async () => {
    if (email === "") {
      setShowError(true);
      setError({
        title: "Invalid email",
        description: "Email is empty.",
      });
      return;
    }

    if (!validateEmail(email)) {
      setShowError(true);
      setError({
        title: "Invalid email",
        description: "Invalid email format.",
      });
      return;
    }

    try {
      await authAPI.sendCode(email);
      sessionStorage.setItem("email", email);
      router.push("/auth/verify");
    } catch (error) {
      setShowError(true);
      setError({
        title: "Error",
        description: "User not found.",
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>FORGOT PASSWORD</h1>
        <div style={styles.inputContainer}>
          <p style={styles.notice}>
            Please enter your email address. You will receive a 4-digit code
            via email to reset your password.
          </p>
          <Input
            title="Email"
            placeHolder="Enter your email"
            onChangeText={setEmail}
          />
          <RoundedButton title="CONTINUE" onClick={handleClick} />
        </div>
      </div>
      <div style={styles.imageContainer}>
        <img
          src="/ForgotPassword.png"
          alt="Forgot Password"
          style={styles.forgotPasswordImage}
        />
      </div>
      {showError && (
        <ErrorMessage
          title={error.title}
          description={error.description}
          setOpen={setShowError}
        />
      )}
    </div>
  );
}

const styles : { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      height: "100vh",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "500px",
    },
    header: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "48px",
      fontWeight: "bold",
      color: "black",
      paddingBottom: "20px",
      textAlign: "center",
    },
    notice: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "20px",
      color: Colors.gray,
      textAlign: "left",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: "0 20px",
      marginBottom: "20px",
      gap: "20px"
    },
    input: {
      width: "100%",
      marginBottom: "40px",
    },
    imageContainer: {
      marginTop: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    forgotPasswordImage: {
      maxWidth: "100%",
      height: "auto",
    },
};
