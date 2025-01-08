"use client";
import React from "react";
import { Colors } from "../constant/Colors";

interface DropdownProps {
  title: string;
  options: string[];
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  style,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(event.target.value);
  };

  return (
    <div style={styles.container}>
      <label style={styles.title}>{title}</label>
      <div style={{ ...styles.inputContainer, ...style }}>
        <select style={styles.select} onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
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
    fontSize: 16,
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
  },
  select: {
    fontFamily: "Roboto",
    fontSize: "16px",
    outline: "none",
    width: "100%",
    border: "none",
    backgroundColor: "transparent",
  },
};

export default Dropdown;
