"use client";

import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { AlarmClock, CircleAlert, UserMinus, UserX } from "lucide-react";
import Table from "../../../../component/Table";
import studentApi from "../../../../api/studentApi";
import Dropdown from "../../../../component/Dropdown";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

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

  const tableHeader = ["NO", "DATE", "ARRIVAL TIME", "ATTENDANCE STATUS"];
  const tableData = [
    ["1", "12/09/2024", "09:00:00 AM", "Late"],
    ["2", "13/09/2024", "08:00:00 AM", "On-time"],
  ];

  const handleRowClick = (rowData: string[]) => {
    console.log("Row clicked:", rowData);
  };

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected option:", value);
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "column",
      alignItems: isMobile ? "center" : "flex-start",
      padding: "1.5rem",
      fontFamily: "Roboto, sans-serif",
      backgroundColor: "#fff",
      maxWidth: "100%",
    },
    statisticsContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "1rem",
      alignContent: "center",
      justifyContent: "space-between",
      paddingBottom: "20px",
      width: isMobile ? "100%" : "40%",
    },
    chart: {
      paddingTop: 10,
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      flexWrap: "wrap",
      width: isMobile ? "100%" : "80%",
      justifyContent: isMobile ? "center" : "space-between",
      alignItems: "center",
      margin: "0 auto",
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
      width: "100%",
      height: "auto",
    },
    cardTitle: {
      fontSize: "16px",
      marginBottom: "10px",
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
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Dropdown */}
      <Dropdown
        title="Class:"
        options={["SE100.P10", "SE100.P11", "SE100.P13"]}
        style={{ borderColor: "blue" }}
        onChange={handleDropdownChange}
      />
      <div style={styles.chart}>
        {/* Statistics Section */}
        <div style={styles.statisticsContainer}>
          <div style={styles.statBox1}>
            <div style={{ ...styles.statCard, backgroundColor: "#6A9AB0" }}>
              <p style={styles.cardTitle}>Number of lateness</p>
              <div style={styles.Value}>
                <AlarmClock width="50px" height="50px" />
                <p style={styles.cardValue}>3</p>
              </div>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: "#00B01A" }}>
              <p style={styles.cardTitle}>Number of absence</p>
              <div style={styles.Value}>
                <UserMinus width="50px" height="50px" />
                <p style={styles.cardValue}>2</p>
              </div>
            </div>
          </div>
          <div style={styles.statBox2}>
            <div style={{ ...styles.statCard, backgroundColor: "#FFC038" }}>
              <p style={styles.cardTitle}>Maximum allowed lateness</p>
              <div style={styles.Value}>
                <CircleAlert width="50px" height="50px" />
                <p style={styles.cardValue}>6</p>
              </div>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: "#EF1F1F" }}>
              <p style={styles.cardTitle}>Maximum allowed absence</p>
              <div style={styles.Value}>
                <UserX width="50px" height="50px" />
                <p style={styles.cardValue}>4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div style={styles.pieChartContainer}>
          <p style={styles.chartTitle}>Attendance status</p>
          <PieChart
            colors={["#EF1F1F", "#FFC038", "#6A9AB0"]}
            series={[
              {
                data: [
                  { id: 0, value: 3, label: "On-time" },
                  { id: 1, value: 2, label: "Late" },
                  { id: 2, value: 2, label: "Absence" },
                ],
              },
            ]}
            width={isMobile ? 350 : 500}
            height={isMobile ? 200 : 300}
          />
        </div>
      </div>
      {/* Table Section */}
      <p style={styles.chartTitle}>Attendance record</p>
      <Table
        tableHeader={tableHeader}
        tableData={tableData}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
