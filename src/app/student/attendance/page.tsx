"use client"

import CustomSelect from "../../../../component/CustomSelect"
import RoundedButton from "../../../../component/RoundedButton"
import SmallInput from "../../../../component/SmallInput"
import { IoSearchOutline } from "react-icons/io5";

export default function AttendancePage(){
    const time = ["Morning", "Evening", "Night"]

    return (
        <div style={styles.page}>
            <div style={styles.headerContainer}>
                <SmallInput
                    title="Student Code"
                    placeHolder="22520992">
                </SmallInput>
                <SmallInput
                    title="Start date"
                    placeHolder="12/02/2005">
                </SmallInput>
                <SmallInput
                    title="End date"
                    placeHolder="14/02/2025">
                </SmallInput>
                <CustomSelect
                    title="Time"
                    options={time}
                    onSelect={()=>{}}>
                </CustomSelect>
                
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
        alignItems: "center",
        gap: 40,
    }

}