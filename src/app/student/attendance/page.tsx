"use client"

import CustomSelect from "../../../../component/CustomSelect"
import RoundedButton from "../../../../component/RoundedButton"
import SmallInput from "../../../../component/SmallInput"
import { IoSearchOutline } from "react-icons/io5";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import { useEffect, useState } from "react";
import Table from "../../../../component/Table";

export default function AttendancePage(){
    const time = ["Morning", "Evening", "Night"];
    const attendanceStatus = ["All", "On-time", "Late", "Absence with permission", "Absence without permission"];
    const tableHeaders = ["STUDENT CODE", "STUDENT NAME", "DATE", "CLASS START TIME", "ARIVAL TIME"];
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [data, setData] = useState<any[][]>(
        [["","","","",""]]
    );
    
    useEffect(() => {
        console.log(screenWidth);
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
        handleResize();
    
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    const flexDirection = screenWidth > 720 ? "row" : "column";
    
    return (
        <div style={styles.page}>
            <div style={{...styles.headerContainer, flexDirection}}>
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
                <CustomSelect
                    title="Attendance status"
                    options={attendanceStatus}
                    onSelect={()=>{}}>
                </CustomSelect>
            </div>
            <div style={styles.sortContainer}>
                <RoundedButton
                    title="Search"
                    style={styles.button}
                    textStyle={styles.buttonText}
                    icon={<IoSearchOutline color="white" size={24}/>}
                    onClick={()=>{}}>
                </RoundedButton>
            </div>
           <div style={styles.tableContainer}>
                <h1 style={styles.title}>Result</h1>
                <Table
                    tableHeader={tableHeaders}
                    tableData={data}>
                </Table>
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
    },
    buttonText:{
        fontSize: 20,
    },
    button:{
        padding: "10px 30px"
    },
    sortContainer:{
        display: "flex",
        gap:10,
    },
    title:{
        fontFamily: "Roboto, sans-serif",
        fontSize: 26,
        fontWeight: 700,
    },
    tableContainer:{
        display: "flex",
        flexDirection: "column",
        width: "100%",
    }
}