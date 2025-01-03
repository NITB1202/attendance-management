"use client";

import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { AlarmClock, CircleAlert, UserMinus, UserX } from "lucide-react";
import Table from "../../../../component/Table";
import CustomSelect from "../../../../component/CustomSelect";;
import { extractDate, extractTime, getStatusName } from "../../../../util/util";
import statisticApi from "../../../../api/statisticApi";
import { Colors } from "../../../../constant/Colors";

export default function Dashboard() {
  const tableHeader = ["NO", "DATE", "ARRIVAL TIME", "ATTENDANCE STATUS"];
  const [isMobile, setIsMobile] = useState(false);
  const [classInfo, setClassInfo] = useState<{name: string, maxLate: number, maxAb: number, numLate: number, numAb: number}[]>([]);
  const [chartData, setChartData] = useState<{ontime: number, ab: number, late: number}[]>([]);
  const [tableData, setTableData] = useState<any[][][]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await statisticApi.student();
        const fullClasses = response.data;
  
        const newTableData: any[][][] = [];
        const newClassInfo: { name: string; maxLate: number; maxAb: number; numLate: number; numAb: number }[] = [];
        const newChartData: { ontime: number; ab: number; late: number }[] = [];
  
        fullClasses.forEach((item: any) => {
          let numAb = 0;
          let numLate = 0;
          let ontime = 0;
  
          const attendances = item.attendances;
  
          const formatted: string[][] = attendances.map((item: any) => {
            if (item.status.startsWith("Vang")) numAb++;
            if (item.status.startsWith("Tre")) numLate++;
            if (item.status.startsWith("Dung")) ontime++;
  
            return [
              item.session.no,
              extractDate(item.session.startTime),
              extractTime(item.onClassTime),
              getStatusName(item.status),
            ];
          });
  
          const info = {
            name: item.name,
            maxLate: item.allowedLateTime,
            maxAb: item.allowedAbsent,
            numLate: numLate,
            numAb: numAb,
          };
  
          const data = {
            ontime: ontime,
            ab: numAb,
            late: numLate,
          };
  
          newTableData.push(formatted);
          newClassInfo.push(info);
          newChartData.push(data);
        });
  
        setTableData(newTableData);
        setClassInfo(newClassInfo);
        setChartData(newChartData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchAttendances();
  }, []);

  // Styles
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "column",
      alignItems: isMobile ? "center" : "flex-start",
      padding: "1.5rem",
      fontFamily: "Roboto, sans-serif",
      maxWidth: "100%",
    },
    statisticsContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "1rem",
      alignContent: "center",
      justifyContent: "space-between",
      paddingBottom: "20px",
    },
    chart: {
      display: "flex",
      width: "100%",
      flexDirection: isMobile ? "column" : "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px 0px",
      gap: 100,
    },
    statBox1: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
      height: "auto",
    },
    statBox2: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: "100%",
      height: "auto",
    },
    statCard: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      padding: "10px",
      width: "250px",
      height: "auto",
    },
    cardTitle: {
      fontSize: "16px",
      marginBottom: "5px",
      color: "#000000",
    },
    Value: {
      display: "flex",
      flexDirection: "row",
      gap: "10px",
      alignItems: "center",
    },
    cardValue: {
      fontSize: "45px",
    },
    pieChartContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    chartTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    tableTitle:{
      fontSize: "26px",
      fontWeight: "bold",
      marginTop: 30,
    }
  };

  return (
    <div style={styles.container}>
      {/* Dropdown */}
      <CustomSelect
        title="Class"
        options={classInfo.map((item)=> item.name)}
        onSelect={setSelectedIndex}>
      </CustomSelect>
      <div style={styles.chart}>
        {/* Statistics Section */}
        <div style={styles.statisticsContainer}>
          <div style={styles.statBox1}>
            {/* Card 1 */}
            <div style={{ ...styles.statCard, backgroundColor: Colors.green }}>
              <p style={styles.cardTitle}>Number of lateness</p>
              <div style={styles.Value}>
                <AlarmClock width="50px" height="50px" />
                <p style={styles.cardValue}>{classInfo.at(selectedIndex)?.numLate}</p>
              </div>
            </div>
            {/* Card 2 */}
            <div style={{ ...styles.statCard, backgroundColor: Colors.secondary }}>
              <p style={styles.cardTitle}>Number of absence</p>
              <div style={styles.Value}>
                <UserMinus width="50px" height="50px" />
                <p style={styles.cardValue}>{classInfo.at(selectedIndex)?.numAb}</p>
              </div>
            </div>
          </div>
          <div style={styles.statBox2}>
            {/* Card 3 */}
            <div style={{ ...styles.statCard, backgroundColor: Colors.yellow }}>
              <p style={styles.cardTitle}>Maximum allowed lateness</p>
              <div style={styles.Value}>
                <CircleAlert width="50px" height="50px" />
                <p style={styles.cardValue}>{classInfo.at(selectedIndex)?.maxLate}</p>
              </div>
            </div>
            {/* Card 4 */}
            <div style={{ ...styles.statCard, backgroundColor: Colors.red }}>
              <p style={styles.cardTitle}>Maximum allowed absence</p>
              <div style={styles.Value}>
                <UserX width="50px" height="50px" />
                <p style={styles.cardValue}>{classInfo.at(selectedIndex)?.maxAb}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div style={styles.pieChartContainer}>
          <p style={styles.chartTitle}>Attendance status</p>
          <PieChart
            colors={[Colors.green, Colors.yellow, Colors.red]}
            series={[
              {
                data: [
                  { id: 0, value: chartData.at(selectedIndex)?.ontime ?? 0, label: "On-time" },
                  { id: 1, value: chartData.at(selectedIndex)?.late ?? 0, label: "Late" },
                  { id: 2, value: chartData.at(selectedIndex)?.ab ?? 0, label: "Absence" },
                ],
              },
            ]}
            width={isMobile ? 350 : 500}
            height={isMobile ? 200 : 300}
          />
        </div>
      </div>
      <p style={styles.tableTitle}>Attendance record</p>
      <Table
        tableHeader={tableHeader}
        tableData={tableData.at(selectedIndex) ?? [["","","",""]]}
      />
    </div>
  );
}
