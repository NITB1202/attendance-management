"use client";
import { UserCheck, UserMinus, UserX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Table from "../../../../component/Table";
import CustomSelect from "../../../../component/CustomSelect";
import statisticApi from "../../../../api/statisticApi";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);
  const [option, setOption] = useState("Week");
  const [data, setData] = useState({
    absentWithPermission: 0,
    absentWithoutPermission: 0,
    onTime: 0,
    topClassWithMostAbsentStudent: [],
    lateForClass: 0
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSelect = (index: number) => {
    switch(index){
      case 0:
        setOption("Week");
        break;
      case 1:
        setOption("Month");
        break;
      case 2:
        setOption("Year");
        break;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await statisticApi.manager(option);
        setData({
          absentWithPermission: response.data.absentWithPermission,
          absentWithoutPermission: response.data.absentWithoutPermission,
          onTime: response.data.onTime,
          topClassWithMostAbsentStudent: response.data.topClassWithMostAbsentStudent,
          lateForClass: response.data.lateForClass,
        });
      }
      catch(error){
        console.log(error);
      }
    };

    fetchData();
  }, [option]);

  const tableHeader = ["NO", "CLASS NAME", "TEACHER", "START TIME", "NUM"];
  const tableData = [
    ["1", "SE102.P12", "Adam Levine", "7:30 AM", "12"],
    ["2", "SE102.P11", "Eva Levine", "7:30 AM", "2"],
  ];

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "1rem",
      fontFamily: "Roboto, sans-serif",
      gap: 20,
      marginLeft: 40,
      marginRight: 20,
    },
    dropdown: {
      width: isMobile ? "50%" : "10%",
    },
    summary: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      gap: 30,
    },
    summaryItem: {
      display: "flex",
      flexDirection: isMobile ? "row" : "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "1rem",
      borderRadius: 10,
      width: 320,
      backgroundColor: "#f0f0f0",
      gap: 20,
    },
    content: {
      textAlign: "left",
      width: "100%",
      fontSize: 14,
      fontWeight: "bold",
      color: "#000",
    },
    pieChartContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      backgroundColor: "#EFEFEF",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: 10,
      padding: 20,
    },
    chartTitle: {
      paddingTop: 20,
      fontSize: "20px",
      fontWeight: "bold",
    },
    tableContainer: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    tableTitle: {
      paddingTop: 20,
      fontSize: 20,
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <CustomSelect
        title="Filter"
        options={["Week", "Month", "Year"]}
        onSelect={handleSelect}>
      </CustomSelect>

      <div style={styles.summary}>
        {[
          {
            icon: <UserCheck color="#FFFFFF" size={60} />,
            value: data.absentWithPermission === 0 ? 3: data.absentWithPermission,
            label: "Absence with permission",
            bgColor: "#6A9AB0",
          },
          {
            icon: <UserMinus color="#FFFFFF" size={60} />,
            value: data.lateForClass === 0 ? 10: data.lateForClass,
            label: "Late for class",
            bgColor: "#FFC038",
          },
          {
            icon: <UserX color="#FFFFFF" size={60} />,
            value: data.absentWithoutPermission === 0? 2:  data.absentWithoutPermission,
            label: "Absence without permission",
            bgColor: "#EF1F1F",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.summaryItem,
              backgroundColor: item.bgColor,
            }}
          >
            {item.icon}
            <div style={styles.content}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000000",
                  textAlign: "left",
                }}
              >
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.pieChartContainer}>
        <p style={styles.chartTitle}>Attendance status</p>
        <PieChart
          colors={["#6A9AB0", "#FFC038", "#EF1F1F"]}
          series={[
            {
              data: [
                { id: 0, value: data.absentWithPermission === 0 ? 3: data.absentWithPermission, label: "Permission" },
                { id: 1, value: data.lateForClass === 0? 10: data.lateForClass, label: "Late" },
                { id: 2, value: data.absentWithoutPermission === 0? 2:  data.absentWithoutPermission, label: "Without permission" },
              ],
            },
          ]}
          width={isMobile ? 400 : 700}
          height={isMobile ? 100 : 300}
        />
      </div>

      <div style={styles.tableContainer}>
        <p style={styles.tableTitle}>
          Top classes with the most absent student
        </p>
        <Table
          tableHeader={tableHeader}
          tableData={tableData}
          itemsPerPage={2}
        />
      </div>
    </div>
  );
}
