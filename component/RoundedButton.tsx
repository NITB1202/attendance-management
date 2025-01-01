import React from "react";
import { Colors } from "../constant/Colors";

interface RoundedButtonProps {
  title: string;
  onClick: () => void;
  style?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  focusColor?: string;
  icon?: React.ReactNode;
}

const RoundedButton = ({
  title,
  onClick,
  style,
  textStyle,
  icon,
  focusColor = "#1E3A8A",
}: RoundedButtonProps) => {
  return (
    <button
      style={{ ...styles.button, ...style }}
      onClick={onClick}
      onFocus={(e) => (e.target.style.borderColor = focusColor)}
    >
      <div style={styles.infoContainer}>
        {icon}
        <span style={{ ...styles.text, ...textStyle }}>{title}</span>
      </div>
    </button>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    button: {
      borderRadius: "5px",
      backgroundColor: Colors.primary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    },
    text: {
      fontFamily: "Roboto, sans-serif",
      fontWeight: "bold",
      fontSize: "24px",
      color: "white",
    },
    infoContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
      gap: "5px",
    },
  };  

export default RoundedButton;


