import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../component/Input";
import { Colors } from "../constant/Colors";

const SearchBar = ({
  placeholder = "Search...",
  style = {},
  onSearch,
}: {
  placeholder?: string;
  style?: React.CSSProperties;
  onSearch?: (searchTerm: string) => void;
}) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <Input
        placeHolder={placeholder}
        icon={<IoSearchOutline color={Colors.darkBlue} size={24} />}
        style={{ ...style, ...styles.inputContainer }}
        textStyle={styles.inputText}
        onChangeText={onSearch}
      ></Input>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
  },
  inputContainer: {
    border: "1px solid rgb(149, 149, 149)",
    height: "auto",
  },
  inputText: {
    fontSize: 16,
  },
};

export default SearchBar;
