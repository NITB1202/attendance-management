"use client";
import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { AlarmClock, CircleAlert, UserMinus, UserX } from "lucide-react";
import Table from "../../../../component/Table";

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
  return (
    <div style={isMobile ? styles.mobileContainer : styles.container}>
      {/* Dropdown */}
      <div style={styles.dropdownContainer}>
        <label style={styles.dropdownLabel}>Class</label>
        <select style={styles.dropdownInput}>
          <option value="SE103.022">SE103.022</option>
          <option value="SE104.023">SE104.023</option>
          <option value="SE105.024">SE105.024</option>
        </select>
      </div>
      <div style={isMobile ? styles.mobileChart : styles.chart}>
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1.5rem",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#fff",
    maxWidth: "100%",
  },

  dropdownContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "16.4375rem",
  },
  dropdownLabel: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  dropdownInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  statisticsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignContent: "center",
    // alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: "20px",
  },
  chart: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", // Cho phép các item xuống dòng khi vượt quá chiều rộng
    gap: "10px", // Khoảng cách giữa các item
    width: "100%", // Đảm bảo container chiếm toàn bộ chiều rộng
    justifyContent: "space-between", // Canh đều khoảng cách giữa các item
    alignItems: "center", // (Tùy chọn) Căn giữa các item theo trục dọc
  },

  statBox1: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: "10.5rem",
  },
  statBox2: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: "17rem",
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
    // width: "100%",
    // maxWidth: "600px",
  },
  chartTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};
