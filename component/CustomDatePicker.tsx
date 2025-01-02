import { DatePicker } from "@mui/x-date-pickers";
import { Colors } from "../constant/Colors";

interface CustomDatePickerProps{
    title: string;
    setSelectedDate: (newValue: Date | null) => void;
}

export default function CustomDatePicker({title, setSelectedDate}: CustomDatePickerProps){
    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
    };
    
    return(
        <div style={styles.container}>
            <h1 style={styles.title}>{title}</h1>
            <DatePicker
            onChange={handleDateChange}
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