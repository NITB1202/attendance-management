"use client"

import CustomSelect from "../../../../component/CustomSelect"
import RoundedButton from "../../../../component/RoundedButton"
import SmallInput from "../../../../component/SmallInput"
import { IoSearchOutline } from "react-icons/io5";
import CustomDatePicker from "../../../../component/CustomDatePicker";

export default function AttendancePage(){
    const time = ["Morning", "Evening", "Night"]

    return (
        <div style={styles.page}>
            <div style={styles.headerContainer}>
                <div style={styles.row}>
                    <SmallInput
                        title="Student Code"
                        placeHolder="22520992">
                    </SmallInput>
                    <CustomDatePicker
                        title="Start date"
                        setSelectedDate={()=>{}}>
                    </CustomDatePicker>
                </div>
                <div style={styles.row}>
                <CustomDatePicker
                    title="End date"
                    setSelectedDate={()=>{}}>
                </CustomDatePicker>
                <CustomSelect
                    title="Time"
                    options={time}
                    onSelect={()=>{}}>
                </CustomSelect>
                </div>
            </div>
            <div>
                <RoundedButton
                    title="Search"
                    icon={<IoSearchOutline/>}
                    onClick={()=>{}}>
                </RoundedButton>
            </div>
            <div>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    page :{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "20px 10px",
        gap: 35,
    },
    headerContainer:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        gap: 20,
    },
    row:{
        display: "flex",
        gap: 40,
        marginRight: 20,
    }

}