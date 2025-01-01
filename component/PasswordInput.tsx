import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Colors } from "../constant/Colors";

interface PasswordInputProps {
  title: string;
  placeHolder?: string;
  onChangeText?: (text: string) => void;
}

const PasswordInput = ({ title, placeHolder, onChangeText }: PasswordInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleChangeText = (text: string) => {
    if (onChangeText) onChangeText(text);
  };

  return (
    <div style={styles.container}>
      <span style={styles.title}>{title}</span>
      <div style={styles.inputContainer}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeHolder}
          onChange={(e) => handleChangeText(e.target.value)}
          style={styles.input}
        />
        <div
          style={styles.icon}
          onClick={() => setPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <FaEyeSlash size={24} color={Colors.primary} />
          ) : (
            <FaEye size={24} color={Colors.primary} />
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    title: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "22px",
      textAlign: "left",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "10px",
      borderColor: Colors.gray,
      borderWidth: "1px",
      borderRadius: "5px",
      width: "100%",
      gap: "10px",
    },
    input: {
      fontFamily: "Roboto, sans-serif",
      fontSize: "20px",
      outline: "none",
      width: "100%",
    },
    icon: {
      cursor: "pointer",
    },
};

export default PasswordInput;
