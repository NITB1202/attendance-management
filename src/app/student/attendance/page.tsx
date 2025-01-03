"use client"

import CustomSelect from "../../../../component/CustomSelect"
import RoundedButton from "../../../../component/RoundedButton"
import SmallInput from "../../../../component/SmallInput"
import { IoSearchOutline } from "react-icons/io5";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import { format } from "date-fns-tz";
import ErrorMessage from "../../../../component/ErrorMessage";
import attendanceApi from "../../../../api/attendanceApi";
import { extractDate, extractTime, getStatusName } from "../../../../util/util";
import { Colors } from "../../../../constant/Colors";

export default function AttendancePage(){
    const attendanceStatus = ["All", "On-time", "Late", "Absence with permission", "Absence without permission"];
    const tableHeaders = ["STUDENT CODE", "STUDENT NAME", "DATE", "CLASS START TIME", "ARIVAL TIME", "STATUS"];
    const [screenWidth, setScreenWidth] = useState(500);
    const [data, setData] = useState<any[][]>(
        [["","","","","",""]]
    );

    const [showError, setShowError] = useState(false);
    const [error, setError] = useState<{ title: string; description: string }>({
        title: "",
        description: "",
    });
    const [searchData, setSearchData] = useState<{code: string, startDate: string, endDate: string, filter: number}>(
        {
            code:"",
            startDate: "",
            endDate: "",
            filter: 0,
        }
    );
    
    useEffect(() => {
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

    const updateCode = (value: string) =>{
        setSearchData((prevData) => ({
            ...prevData,
            code: value,
        }));
    }

    const udpateStartDate = (date: Date | null) => {
        if(date){
            const formattedDate = format(date, 'yyyy-MM-dd');
            setSearchData((prevData) => ({
                ...prevData,
                startDate: formattedDate,
            }));
        }
    }

    const udpateEndDate = (date: Date | null) => {
       if(date){
            const formattedDate = format(date, 'yyyy-MM-dd');
            setSearchData((prevData) => ({
            ...prevData,
            endDate: formattedDate,
            }));
       }
    }

    const updateFilter = (index: number) => {
        setSearchData((prevData) => ({
            ...prevData,
            filter: index,
        }));
    }

    const handleSearch = async () =>{
        if(searchData.code === "" || searchData.startDate === "" || searchData.endDate === "")
        {
            setShowError(true);
            setError({
                title: "Error",
                description: "Some required values are missing."
            });
            return;
        }

        if(new Date(searchData.startDate) > new Date(searchData.endDate)){
            setShowError(true);
            setError({
                title: "Invalid date",
                description: "The end date must be the same as or later than the start date."
            })
            return;
        }

        try{
            const response = await attendanceApi.search(searchData.code, searchData.startDate, searchData.endDate);
            const history = response.data.history;
            const formattedData: string[][] = history
            .filter((item: any)=>{
                return searchData.filter === 0 || 
                getStatusName(item.status) === attendanceStatus.at(searchData.filter);
            })
            .map((item: any) => [
                response.data.studentCode,
                response.data.studentName,
                extractDate(item.startTime),
                extractTime(item.startTime),
                extractTime(item.onClassTime),
                getStatusName(item.status),
            ]);
            setData(formattedData);
        }
        catch(error)
        {
            setShowError(true);
            setError({
                title: "Invalid student code",
                description: "Student not found."
            })
        }

    }
    
    return (
        <div style={styles.page} aria-hidden="false">
            <div style={{...styles.headerContainer, flexDirection}}>
                <div style={styles.row}>
                    <SmallInput
                        title="Student Code"
                        placeHolder="Ex: 22520992"
                        onChangeText={updateCode}>
                    </SmallInput>
                </div>
                <div style={styles.row}>
                    <CustomDatePicker
                        title="Start date"
                        setSelectedDate={udpateStartDate}>
                    </CustomDatePicker>
                    <CustomDatePicker
                        title="End date"
                        setSelectedDate={udpateEndDate}>
                    </CustomDatePicker>
                </div>
                <CustomSelect
                    title="Attendance status"
                    style={styles.select}
                    options={attendanceStatus}
                    onSelect={updateFilter}>
                </CustomSelect>
            </div>
            <div style={styles.sortContainer}>
                <RoundedButton
                    title="Search"
                    style={styles.button}
                    textStyle={styles.buttonText}
                    icon={<IoSearchOutline color="white" size={24}/>}
                    onClick={handleSearch}>
                </RoundedButton>
            </div>
           <div style={styles.tableContainer}>
                <h1 style={styles.title}>Result</h1>
                <Table
                    tableHeader={tableHeaders}
                    tableData={data}>
                </Table>
           </div>
           {
            showError &&
            <ErrorMessage
                title={error.title}
                description={error.description}
                setOpen={setShowError}>
            </ErrorMessage>
           }
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
        padding: "10px 30px",
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
    },
    select:{
        maxWidth: 250,
    }
}