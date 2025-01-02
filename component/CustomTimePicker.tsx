import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Colors } from "../constant/Colors";

interface CustomTimePickerProps{
    title: string;
    setSelectedTime: (newValue: Date | null) => void;
}


export default function CustomTimePicker({title, setSelectedTime}: CustomTimePickerProps){
    const handleTimeChange = (newTime: Date | null) => {
        setSelectedTime(newTime);
    };
    
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>{title}</h1>
            <TimePicker
            onChange={handleTimeChange}
            slotProps={{
            textField: {
            sx: {
              "& .MuiInputBase-root": {
                height: "44px",
                fontSize: "16px",
                borderRadius: "5px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(149, 149, 149)",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: Colors.primary,
              },
            },},}}
            />
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
}