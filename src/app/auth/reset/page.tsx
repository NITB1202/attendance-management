"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import authAPI from "../../../../api/authAPI";
import PasswordInput from "../../../../component/PasswordInput";
import RoundedButton from "../../../../component/RoundedButton";
import ErrorMessage from "../../../../component/ErrorMessage";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState({ title: "", description: "" });
  const router = useRouter();

  const handleConfirm = async () => {
    if (password === "") {
      setShowError(true);
      setError({
        title: "Invalid password",
        description: "Password is empty.",
      });
      return;
    }

    if (confirmPassword === "") {
      setShowError(true);
      setError({
        title: "Invalid password",
        description: "Confirm password is empty.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setShowError(true);
      setError({
        title: "Error",
        description: "Password and confirmed password do not match.",
      });
      return;
    }

    const email = sessionStorage.getItem("email");
    if (!email) {
      setShowError(true);
      setError({
        title: "Error",
        description: "Unable to locate recovered email.",
      });
    } else {
      try {
        await authAPI.reset(email, password);
        sessionStorage.removeItem("email");
        router.push("/auth/success");
      } catch (error) {
        setShowError(true);
        setError({
          title: "Duplicated password",
          description: "The new password is the same as the old password.",
        });
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>RESET PASSWORD</h1>
      <div style={styles.formContainer}>
      <p style={styles.notice}>Create a new password for your account</p>
      <PasswordInput
        title="Password"
        onChangeText={setPassword}
        placeHolder="Enter your password">
      </PasswordInput>
      <PasswordInput
        title="Confirm password"
        placeHolder="Retype your password"
        onChangeText={setConfirmPassword}>
      </PasswordInput>
      <RoundedButton
        title="CONFIRM"
        style={styles.button}
        onClick={handleConfirm}>
      </RoundedButton>
      </div>
      {showError && (
        <ErrorMessage
          title={error.title}
          description={error.description}
          setOpen={setShowError}>
        </ErrorMessage>
      )}
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
    padding: "0px 20px",
    backgroundColor: "white",
    textAlign: "center",
  },
  formContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "48px",
    fontWeight: "bold",
    color: "black",
  },
  notice: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    color: "gray",
  },
  button:{
    marginTop: 20,
  }
};
