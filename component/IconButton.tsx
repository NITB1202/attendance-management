import { useEffect, useRef, useState } from "react";
import { Colors } from "../constant/Colors";

interface IconButtonProps{
    id?: number;
    icon?: React.ReactNode;
    options?: string[];
    style?: React.CSSProperties;
    onSelectOption?: (index: number) => void;
    onSelectWithId?: (index: number, id: number) => void;
}

export default function IconButton({ id, icon, options, style, onSelectOption, onSelectWithId }: IconButtonProps) {
    const [clicked, setClicked] = useState(false);
    const [hoveredOption, setHoveredOption] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setClicked(true);
    };

    const onSelect = (index: number) => {
        if (onSelectOption) 
            onSelectOption(index);

        if(onSelectWithId && id)
            onSelectWithId(index, id);

        setClicked(false);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setClicked(false);
        }
    };

    useEffect(() => {
        if (clicked) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [clicked]);

    return (
        <div ref={containerRef} style={styles.container}>
            <button
                style={{ ...styles.button, ...style }}
                onClick={handleClick}
            >
                {icon}
            </button>
            {clicked && (
                <div style={styles.optionContainer}>
                    {options?.map((item, index) => {
                        const isHovered = hoveredOption === index;
                        return (
                            <button
                                key={index}
                                style={{
                                    ...styles.option,
                                    backgroundColor: isHovered ? Colors.hint : "white",
                                }}
                                onMouseEnter={() => setHoveredOption(index)}
                                onMouseLeave={() => setHoveredOption(null)}
                                onClick={() => onSelect(index)}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        position: "relative",
        width: "fit-content",
        height: "fit-content"
    },
    button:{
        width: 30,
        height: 30,
    },
    option:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 16,
        padding: 5,
        width: "100%",
        borderRadius: 5,
        textAlign: "left",
        zIndex: 10,
    },
    optionContainer:{
        position: "absolute",
        top: 30,
        left: 0,
        borderRadius: 5,
        border: "1px solid #959595",
        backgroundColor: "white",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
        width: 120,
        zIndex: 10,
    }
}