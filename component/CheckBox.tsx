import React, { useEffect, useState } from "react";
import { Colors } from "../constant/Colors";

interface CheckBoxProps {
  onPress: (isChecked: boolean) => void; // Callback được gọi khi checkbox được click
  checked?: boolean; // Trạng thái checkbox được điều khiển từ bên ngoài
}

const CheckBox: React.FC<CheckBoxProps> = ({ onPress, checked = false }) => {
  const [state, setState] = useState(checked); // Trạng thái nội bộ

  useEffect(() => {
    setState(checked); // Đồng bộ trạng thái khi prop `checked` thay đổi
  }, [checked]);

  const handleClick = () => {
    const newState = !state;
    setState(newState);
    onPress(newState); // Gọi callback khi trạng thái thay đổi
  };

  return (
    <div style={styles.box} onClick={handleClick}>
      {state ? (
        <div style={styles.check}></div>
      ) : (
        <div style={{ ...styles.check, backgroundColor: "transparent" }}></div>
      )}
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
