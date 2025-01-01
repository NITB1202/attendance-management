"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { Role } from "../../../../enum/RoleEnum";
import RoundedButton from "../../../../component/RoundedButton";
import ErrorMessage from "../../../../component/ErrorMessage";
import CheckBox from "../../../../component/CheckBox";
import PasswordInput from "../../../../component/PasswordInput";
import Input from "../../../../component/Input";
import { Colors } from "../../../../constant/Colors";

export default function Login() {
  const { onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showError, setShowError] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [error, setError] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogin = async () => {
    if (username === "") {
      setShowError(true);
      setError({ title: "Invalid username", description: "Username is empty." });
      return;
    }

    if (password === "") {
      setShowError(true);
      setError({ title: "Invalid password", description: "Password is empty." });
      return;
    }

    const authState = await onLogin(username, password, remember);

    if (authState.authenticated) {
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
    } else {
      setShowError(true);
      setError({
        title: "Unrecognized account",
        description: "Email or password is incorrect.",
      });
    }
  };

  return (
    <div style={screenWidth > 500 ? styles.container : styles.mobile }>
      <div style={styles.partContainer}>
        <div style={styles.formContainer}>
          <h1 style={styles.header}>SIGN IN</h1>
          <div style={styles.inputContainer}>
            <Input title="Username" placeHolder="Enter your username" onChangeText={setUsername} />
            <PasswordInput title="Password" placeHolder="Enter your password" onChangeText={setPassword} />
            <div style={styles.bottom}>
              <div style={styles.checkBoxContainer}>
                <CheckBox onPress={() => setRemember(!remember)} />
                <span style={styles.text}>Remember me</span>
              </div>
              <button
                style={styles.highlight}
                onClick={() => {
                  router.push("/auth/forgot");
                }}
              >
                Forgot password?
              </button>
            </div>
          </div>
          <RoundedButton title="SIGN IN" onClick={handleLogin} />
        </div>
      </div>
      <div style={styles.partContainer}>
        <div style={styles.imageContainer}>
          <img
            style={styles.formatImage}
            src="/Login.png"
            alt="Login"
          />
        </div>
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

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "row",
      height: "100vh",
      backgroundColor: "white",
    },
    mobile:{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "white",
    },
    partContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
      fontSize: "3rem",
      textAlign: "center",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    checkBoxContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "0.625rem",
    },
    text: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "1.125rem",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "20px",
      width: "100%",
      padding: "0px 20px",
      maxWidth: "26rem",
    },
    highlight: {
      fontSize: "1.125rem",
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
      color: Colors.primary,
      cursor: "pointer",
    },
    bottom: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    formatImage: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    imageContainer: {
      width: "80%",
      height: "80%",
      overflow: "hidden",
    },
};

