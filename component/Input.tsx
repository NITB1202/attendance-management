"use client";

import React from "react";
import { Colors } from "../constant/Colors";

interface InputProps {
  title?: string;
  placeHolder?: string;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  onChangeText?: (text: string) => void;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ title, placeHolder, style, onChangeText, icon, textStyle }) => {

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeText) onChangeText(event.target.value);
  };

  return (
    <div style={styles.container}>
      {title && <label style={styles.title}>{title}</label>}
      <div style={{ ...styles.inputContainer, ...style }}>
        {icon}
        <input
          type="text"
          placeholder={placeHolder}
          style={{...styles.input, ... textStyle}}
          onChange={handleChangeText}
        />
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
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: Colors.gray,
    padding: "10px",
    width: "100%",
    gap: 10,
  },
  input: {
    fontFamily: "Roboto, sans-serif",
    fontSize: "20px",
    outline: "none",
    width: "100%",
  },
};

export default Input;
