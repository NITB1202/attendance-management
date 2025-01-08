"use client";

import React, { useState, useEffect } from "react";
import Table from "../../../../component/Table";
import SearchBar from "../../../../component/SearchBar";
import CustomSelect from "../../../../component/CustomSelect";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../../util/util";
import classApi from "../../../../api/classApi";

const ClassTeacher = () => {
    const [data, setData] = useState<any[][]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await classApi.getByTeacherId();
            const formattedData: string[][] = 
            response.data.map((item: any)=>
                [
                    item.id,
                    item.name,
                    item.course.name,
                    formatDate(item.beginDate),
                    formatDate(item.endDate),
                    item.startTime,
                    item.endTime,
                    item.teacher.name
                ]
            );
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

    const searchTerms = ["Class name", "Course name"];
    const router = useRouter();

    const handleClickRow = (row: any[]) =>{
        const foundItem = data.find(item => {
            return item.slice(1).every((value, index) => value === row[index]);
        });
        if(foundItem){
            const id = foundItem.at(0);
            router.push(`/teacher/detail?id=${id}`);
        }
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
                    tableData={data
                        .filter((item:any)=> {
                        if(searchData === "")
                            return true;

                        const formatSearch = searchData.toLocaleLowerCase().trim();
                        let checkData = "";

                        if(selectedIndex === 0){
                            checkData = item.at(1).toLocaleLowerCase();
                        }

                        if(selectedIndex === 1){
                            checkData = item.at(2).toLocaleLowerCase();
                        }

                        return checkData.indexOf(formatSearch) !== -1;
                    })
                    .map((row) => row.slice(1))
                }
                    onRowClick={handleClickRow} />
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

export default ClassTeacher;