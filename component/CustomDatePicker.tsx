import { DatePicker } from "@mui/x-date-pickers";

interface CustomDatePickerProps{
    title: string;
    setSelectedDate: (newValue: Date | null) => void;
    defaultValue?: string;
    disable?: boolean;
    bold?: boolean;
}

export default function CustomDatePicker({title, setSelectedDate, defaultValue, disable = false, bold = true}: CustomDatePickerProps){
    const handleDateChange = (newDate: Date | null) => {
        setSelectedDate(newDate);
    };

    const initialDate = defaultValue ? new Date(defaultValue) : null;

    return(
        <div style={styles.container}>
            <h1 style={{...styles.title, fontWeight: bold? 600: 500}}>{title}</h1>
            <DatePicker
            value={initialDate}
            disabled={disable}
            format="dd/MM/yyyy"
            onChange={handleDateChange}
            slotProps={{
            textField: {
            sx: {
              "& .MuiInputBase-root": {
                height: "44px",
                fontSize: "16px",
                borderRadius: "5px",
                minWidth: "165px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(149, 149, 149)",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#3A6D8C",
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
    },
}