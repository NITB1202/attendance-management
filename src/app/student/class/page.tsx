"use client";

import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import SearchBar from "../../../../component/SearchBar";
import CustomSelect from "../../../../component/CustomSelect";
import { useRouter } from "next/navigation";
import classApi from "../../../../api/classApi";

const ClassStudent = () => {
    const [data, setData] = useState<any[][]>(
        [["","","","","","",""]]
    );
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await classApi.getByUser();
            const formattedData: string[][] = 
            response.data.map((item: any)=>
                [
                    item.name,
                    item.course.name,
                    item.beginDate,
                    item.endDate,
                    item.startTime,
                    item.endTime,
                    item.teacher.name
                ]
            );
            console.log(response);
            setData(formattedData);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
    }, []);

    const tableHeader = [
        "CLASS NAME",
        "COURSE NAME",
        "START DATE",
        "END DATE",
        "START TIME",
        "END TIME",
        "TEACHER NAME",
    ];

    const id = 1
    const searchTerms = ["Class name", "Course name", "Teacher name"];
    const router = useRouter();

    const onRowClick = (row: any[]) =>{
        router.push(`/student/detail?id=${id}`);
    }

    return (
        <div style={{ padding: "20px 10px"}}>
            <div style={styles.headerContainer}>
                <SearchBar
                    placeholder="Type to search..."
                    style={styles.searchBar}
                    onSearch={setSearchData}
                />
                <CustomSelect
                    options={searchTerms}
                    onSelect={setSelectedIndex}>
                </CustomSelect>
            </div>
            <div style={{ marginTop: 20 }}>
                <Table 
                    tableHeader={tableHeader} 
                    tableData={data.filter((item:any)=> {
                        if(searchData === "")
                            return true;

                        const formatSearch = searchData.toLocaleLowerCase().trim();
                        let checkData = "";

                        if(selectedIndex === 0){
                            checkData = item.at(0).toLocaleLowerCase();
                        }

                        if(selectedIndex === 1){
                            checkData = item.at(1).toLocaleLowerCase();
                        }

                        if(selectedIndex === 2){
                            checkData = item.at(6).toLocaleLowerCase();
                        }

                        return checkData.indexOf(formatSearch) !== -1;
                    })}
                    onRowClick={onRowClick} />
            </div>
        </div>

    );
};

const styles: { [key: string]: React.CSSProperties } = {
    headerContainer:{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
    },
    searchBar:{
        display: "flex",
        maxWidth: 350,
    }
}

export default ClassStudent;