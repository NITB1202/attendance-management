import { CircularProgress } from "@mui/material";
import { Colors } from "../constant/Colors";

export default function Loading(){
    return(
        <div style={styles.container}>
            <CircularProgress style={styles.circle}>
            </CircularProgress>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.15)"
    },
    circle:{
        width: 200,
        height: 200,
        color: Colors.primary,
    }
}