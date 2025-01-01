import React, { useState } from "react";
import { Colors } from "../constant/Colors";

interface CheckBoxProps {
  onPress: (isChecked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ onPress }) => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    const newState = !state;
    setState(newState);
    onPress(newState);
  };

  return (
    <div style={styles.box} onClick={handleClick}>
      {state ? <div style={styles.check}></div> : <div style={{ ...styles.check, backgroundColor: "transparent" }}></div>}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
    box: {
      borderColor: Colors.darkBlue,
      borderWidth: "2px",
      borderRadius: "5px",
      width: "24px",
      height: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    check: {
      backgroundColor: Colors.primary,
      borderRadius: "2px",
      width: "14px",
      height: "14px",
    },
};

export default CheckBox;
