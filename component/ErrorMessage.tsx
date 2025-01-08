import React from "react";
import RoundedButton from "./RoundedButton";

interface ErrorMessageProps {
  title: string;
  description: string;
  setOpen: (open: boolean) => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title, description, setOpen }) => {
  return (
    <div style={styles.shadow}>
      <div style={styles.messageContainer}>
        <button style={styles.closeButton} onClick={() => setOpen(false)}>
          <img src="/icon/close.png" alt="Close" />
        </button>
        <div style={styles.titleContainer}>
          <img src="/icon/error-icon.png" alt="Error Icon" />
          <span style={styles.title}>{title}</span>
        </div>
        <p style={styles.description}>{description}</p>
        <RoundedButton
          title="OK"
          style={styles.button}
          focusColor="#9E1111"
          onClick={() => setOpen(false)}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    shadow: {
      position: "fixed",
      top: 0,
      left: 0,
      width: '100vw',
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    messageContainer: {
      zIndex: 999,
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
      padding: "10px",
      width: "375px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      alignItems: "flex-end",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "row",
      gap: "10px",
      width: "100%",
    },
    title: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 700,
      fontSize: "20px",
    },
    description: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      textAlign: "left",
      width: "100%",
      paddingBottom: "10px",
    },
    button: {
      width: "100%",
      height: "34px",
      backgroundColor: "#C71313",
      border: "none",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    closeButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
    },
};

export default ErrorMessage;
