"use client";
import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  // Lắng nghe kích thước màn hình
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600); // Màn hình < 600px là mobile
    };

    handleResize(); // Cập nhật ngay khi load trang
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div style={styles.chart}>
        {/* Statistics Section */}
        <div style={styles.statisticsContainer}>
          <div style={styles.statBox1}>
            <div style={{ ...styles.statCard, backgroundColor: "#6A9AB0" }}>
              <p style={styles.cardTitle}>Number of lateness</p>
              <p style={styles.cardValue}>3</p>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: "#00B01A" }}>
              <p style={styles.cardTitle}>Number of absence</p>
              <p style={styles.cardValue}>2</p>
            </div>
          </div>
          <div style={styles.statBox2}>
            <div style={{ ...styles.statCard, backgroundColor: "#FFC038" }}>
              <p style={styles.cardTitle}>Maximum allowed lateness</p>
              <p style={styles.cardValue}>6</p>
            </div>
            <div style={{ ...styles.statCard, backgroundColor: "#EF1F1F" }}>
              <p style={styles.cardTitle}>Maximum allowed absence</p>
              <p style={styles.cardValue}>4</p>
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
            width={isMobile ? 250 : 400}
            height={isMobile ? 250 : 250}
          />
        </div>
      </div>
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
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.5rem",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#fff",
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
    justifyContent: "space-between",
    // flexWrap: "wrap",
    width: "100%",
    maxWidth: "27.125rem",
    gap: "2.5rem",
    marginBottom: "20px",
  },
  chart: {
    display: "flex",
    flexDirection: "row",
    gap: "3.125rem",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "73.5rem",
  },

  statBox1: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: "1 1 calc(40% - 0.625rem)",
    maxWidth: "10.3125rem",
  },
  statBox2: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: "1 1 calc(60% - 0.625rem)", // Chiếm 50% chiều rộng (desktop)
    minWidth: "17rem",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    padding: "20px",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    minHeight: "100px",
  },
  cardTitle: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "24px",
  },
  pieChartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
  },
  chartTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};
