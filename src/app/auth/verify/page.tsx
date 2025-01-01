"use client";

import React, { useState, useEffect } from "react";
import RoundedButton from "../../../../component/RoundedButton";
import authAPI from "../../../../api/authAPI";
import ErrorMessage from "../../../../component/ErrorMessage";
import { useRouter } from "next/navigation";
import SuccessfulMessage from "../../../../component/SuccessfulMesage";
import NumberInput from "../../../../component/NumberInput";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(120);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("error");
  const [content, setContent] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          if (interval) clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleResend = async () => {
    const email = sessionStorage.getItem("email");
    if (email === null) {
      setShowPopup(true);
      setPopupType("error");
      setContent({
        title: "Error",
        description: "Unable to locate recovered email.",
      });
    } else {
      try {
        await authAPI.sendCode(email);
        setShowPopup(true);
        setPopupType("success");
        setContent({
          title: "Send successfully",
          description: "The verification code has been resent to your email address.",
        });
        setTimer(120);
      } catch (error) {
        setShowPopup(true);
        setPopupType("error");
        setContent({
          title: "Error",
          description: "An unexpected error has occurred.",
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };
  
  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleConfirm = async () => {
    if(timer === 0)
    {
      setShowPopup(true);
      setPopupType("error");
      setContent({
        title: "Expired code",
        description: "The verification code has expired. Please click Resend to obtain a new code."
      });
      return;
    }

    const email = await sessionStorage.getItem("email");
    if(email === null)
    {
      setShowPopup(true);
      setPopupType("error")
      setContent({
        title: "Error",
        description: "Unable to locate recovered email."
      });
    }
    else
    {
      try{
        const response = await authAPI.verify(email, code.join(""));
        console.log(response);
        router.push("/auth/reset");
      }
      catch(error)
      {
        console.log(error);
        setShowPopup(true);
        setPopupType("error");
        setContent({
          title: "Verification failed",
          description: "Incorrect verification code. Please try again."
        });
      }
    }
  };


  return (
    <div style={styles.container}>
        <div style={styles.formContainer}>
          <h1 style={styles.header}>VERIFICATION</h1>
          <p style={styles.notice}>
            Enter 4-digit code that you receive on your email.
          </p>
          <div style={styles.codeContainer}>
            {code.map((digit, index) => (
              <NumberInput
                key={"numInput-" + index}
                index={index}
                value={digit}
                onChangeText={handleChange}
              />
            ))}
          </div>
          <p style={styles.timerText}>{formatTime(timer)}</p>
          <RoundedButton
            title="CONFIRM"
            onClick={handleConfirm}
            style={styles.input}
          />
          <div style={styles.resendContainer}>
            <p style={styles.resendText}>Didn't receive a code? </p>
            <button onClick={handleResend} style={styles.resendLink}>
              Resend
            </button>
          </div>
        </div>
      {showPopup && popupType === "error" && (
        <ErrorMessage
          title={content.title}
          description={content.description}
          setOpen={setShowPopup}
        />
      )}
      {showPopup && popupType === "success" && (
        <SuccessfulMessage
          title={content.title}
          description={content.description}
          setOpen={setShowPopup}
        />
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "100vh",
    padding: "20px"
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "48px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "20px",
  },
  notice: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    color: "gray",
    textAlign: "center",
    marginBottom: "20px",
  },
  codeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px",
    gap: "20px",
  },
  codeInput: {
    width: "80px",
    height: "80px",
    borderWidth: "5px",
    borderColor: "#3A6D8C",
    textAlign: "center",
    fontSize: "18px",
    margin: "5px 0px",
    borderRadius: "10px",
  },
  timerText: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "26px",
    fontWeight: 600,
    color: "black",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    marginBottom: "20px",
  },
  resendContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "22px",
    color: "black",
  },
  resendLink: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
    fontSize: "22px",
    color: "#3A6D8C",
    marginLeft: "10px",
    cursor: "pointer",
  },
};
