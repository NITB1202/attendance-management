"use client";

import { Colors } from "../constant/Colors";

interface CustomSelectProps{
    title?: string;
    textStyle? : React.CSSProperties;
    style?: React.CSSProperties;
    options: string[];
    onSelect: (index: number) => void;
}

export default function CustomSelect({title, textStyle, style, options, onSelect}: CustomSelectProps){
    return(
        <div style={styles.container}>
            {title && <h1 style={{...styles.title, ...textStyle}}>{title}</h1>}
            <select 
                defaultValue={options.length > 0? options[0] : ""}
                onChange={(e) => onSelect(Number(e.target.value))}
                style={{...styles.select, ...style}}>
            {
                options.map((option, index)=>{
                    return(
                        <option 
                            key={index}
                            value={index}>
                            {option}
                        </option>
                    );
                })
            }
            </select>
        </div>  
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 20,
        fontWeight: 600,
    },
    select:{
        height: 44,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: "5px 10px"
    },
    option:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 16,
        color: "black",
    }

}