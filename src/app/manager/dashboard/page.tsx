"use client";
import { StyledEngineProvider } from "@mui/material";
import { UserCheck, UserMinus, UserRoundCheck } from "lucide-react";
import React, { useEffect, useState } from "react";

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

  return (
    <div style={isMobile ? styles.mobileContainer : styles.container}>
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
          flexDirection: isMobile ? "column" : "row", // Thay đổi layout khi màn hình nhỏ
          width: isMobile ? "80%" : "70%", // Điều chỉnh độ rộng
        }}
      >
        <div style={styles.summaryItem1}>
          <UserCheck color="#FFFFFF" size={60} />
          <div style={styles.content}>
            <div
              style={{ fontSize: "36px", fontWeight: "bold", color: "#fff" }}
            >
              39
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#000000" }}
            >
              Absence with permission
            </div>
          </div>
        </div>

        <div style={styles.summaryItem2}>
          <UserMinus color="#FFFFFF" size={60} />
          <div style={styles.content}>
            <div
              style={{ fontSize: "36px", fontWeight: "bold", color: "#fff" }}
            >
              8
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#000000" }}
            >
              Late for class
            </div>
          </div>
        </div>

        <div style={styles.summaryItem3}>
          <UserMinus color="#FFFFFF" size={60} />
          <div style={styles.content}>
            <div
              style={{ fontSize: "36px", fontWeight: "bold", color: "#fff" }}
            >
              18
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: "bold", color: "#000000" }}
            >
              Absence without permission
            </div>
          </div>
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
    maxWidth: "100%",
    gap: 30,
  },
  mobileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f9f9f9",
    gap: 20,
  },
  dropdown: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  dropdownContainer: {
    display: "flex", // Thêm display flex
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingLeft: 20,
    gap: 20,
  },
  dropdownLabel: {
    fontSize: 20,
    fontWeight: "700", // SemiBold
  },
  dropdownInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1.5px solid #959595",
  },

  //   summary
  summary: {
    display: "flex",
    // flexDirection: "column",
    gap: 20,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  summaryItem1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem",
    backgroundColor: "#6A9AB0",
    borderRadius: 10,
    width: "100%",
    gap: 13,
  },
  summaryItem2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem",
    backgroundColor: "#FFC038",
    borderRadius: 10,
    width: "100%",
    gap: 13,
  },

  summaryItem3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1rem",
    backgroundColor: "#EF1F1F",
    borderRadius: 10,
    width: "100%",
    gap: 13,
  },
  content: {
    textAlign: "center", // Căn giữa nội dung văn bản
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  pieChartContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "80px",
    flexWrap: "wrap",
  },
  pieChart: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 50,
  },
};
