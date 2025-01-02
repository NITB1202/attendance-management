"use client";
import { StyledEngineProvider } from "@mui/material";
import { UserCheck, UserMinus, UserRoundCheck, UserX } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Table from "../../../../component/Table";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // Gọi ngay để xác định trạng thái ban đầu
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const tableHeader = ["NO", "CLASS NAME", "TEACHER", "START TIME", "NUM"];
  const tableData = [
    ["1", "SE102.P12", "Adam Levine", "7:30 AM", "12"],
    ["2", "SE102.P11", "Eva Levine", "7:30 AM", "2"],
  ];

  const handleRowClick = (rowData: string[]) => {
    console.log("Row clicked:", rowData);
  };

  return (
    <div style={styles.container}>
      {/* dropdown */}
      <div style={styles.dropdown}>
        <div style={styles.dropdownContainer}>
          <label style={styles.dropdownLabel}>Filter by</label>
          <select style={styles.dropdownInput}>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Year</option>
          </select>
        </div>
      </div>

      {/* summary */}
      <div
        style={{
          ...styles.summary,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {[
          {
            icon: <UserCheck color="#FFFFFF" size={60} />,
            value: 39,
            label: "Absence with permission",
            bgColor: "#6A9AB0",
          },
          {
            icon: <UserMinus color="#FFFFFF" size={60} />,
            value: 8,
            label: "Late for class",
            bgColor: "#FFC038",
          },
          {
            icon: <UserX color="#FFFFFF" size={60} />,
            value: 18,
            label: "Absence without permission",
            bgColor: "#EF1F1F",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              ...styles.summaryItem,
              backgroundColor: item.bgColor,
              width: isMobile ? "90%" : "30%",
            }}
          >
            {item.icon}
            <div style={styles.content}>
              <div
                style={{ fontSize: "36px", fontWeight: "bold", color: "#fff" }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000000",
                  textAlign: "center",
                }}
              >
                {item.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      <div style={styles.pieChartContainer}>
        <p style={styles.chartTitle}>Attendance status</p>
        <PieChart
          colors={["#6A9AB0", "#FFC038", "#EF1F1F"]}
          series={[
            {
              data: [
                { id: 0, value: 3, label: "Permission" },
                { id: 1, value: 2, label: "Late" },
                { id: 2, value: 2, label: "Without permission" },
              ],
            },
          ]}
          width={isMobile ? 650 : 700}
          height={300}
        />
      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <p style={styles.tableTitle}>
          Top classes with the most absent student
        </p>
        <Table
          tableHeader={tableHeader}
          tableData={tableData}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1rem",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f9f9f9",
    gap: 20,
  },
  dropdown: {
    width: "20%",
  },
  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    height: 40,
    gap: 20,
    paddingLeft: 20,
  },
  dropdownLabel: {
    fontSize: 20,
    fontWeight: 700,
  },
  dropdownInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1.5px solid #959595",
  },
  summary: {
    display: "flex",
    gap: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem",
    borderRadius: 10,
    gap: 13,
  },
  content: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  pieChartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
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
