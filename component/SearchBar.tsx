import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; 

const SearchBar = ({ placeholder = "Search...", style = {}, onSearch }: { placeholder?: string; style?: React.CSSProperties; onSearch?: (searchTerm: string) => void }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (onSearch) onSearch(searchTerm); // Gọi hàm callback khi nhấn Enter
    };

    return (
        <div style={{ ...styles.container, ...style }}>
            <div style={styles.inputContainer}>
                <FaSearch style={styles.icon} />
                <input
                    type="text"
                    style={styles.input}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSearch(); // Nhấn Enter để tìm kiếm
                    }}
                />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '5px',
        padding: '5px 10px',
    },
    icon: {
        color: 'gray',
        marginRight: '10px',
    },
    input: {
        border: 'none',
        outline: 'none',
        flex: 1,
    },
};

export default SearchBar;