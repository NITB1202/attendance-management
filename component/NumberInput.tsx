import React, { useState } from 'react';
import { Colors } from '../constant/Colors';

interface NumberInputProps {
  index: number;
  value: string;
  onChangeText: (text: string, index: number) => void;
}

export default function NumberInput({ index, value, onChangeText }: NumberInputProps) {
  const [isFocus, setFocus] = useState(false);

  return (
    <div style={{ ...styles.container, ...(isFocus ? styles.focus : {}) }}>
      <input
        type="text"
        style={styles.text}
        maxLength={1}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChangeText(e.target.value, index)}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3A6D8C',
    borderWidth: '4px',
    borderRadius: '10px',
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '40px',
    width: '64px',
    height: '64px',
    textAlign: 'center',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    outlineWidth: 0,
  },
  focus: {
    borderColor: Colors.green,
  },
};
