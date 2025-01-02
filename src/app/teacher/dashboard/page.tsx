"use client";
import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  AlarmClock,
  CircleAlert,
  Rows4,
  TrendingUp,
  UserMinus,
  UserX,
} from "lucide-react";
import Table from "../../../../component/Table";
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
  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected option:", value);
  };

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
    dropdown: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Responsive layout
      width: "100%",
      gap: isMobile ? 20 : 50,
      paddingLeft: 20,
    },

    dropdownLabel: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 15,
    },

    report: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Responsive layout
      alignItems: "center",
      gap: isMobile ? "20px" : "50px",
      padding: "1.5rem",
      width: "100%",
      flexWrap: "wrap",
    },
    label: {
      fontSize: 20,
      fontWeight: "600",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
      color: "#FFFDFD",
      fontSize: 64,
      fontWeight: 600,
    },

    box_respond: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: isMobile ? "100%" : "auto", // Adjust width for mobile
      backgroundColor: "#6A9AB0",
      borderRadius: 10,
      padding: 20,
      gap: 5,
    },
    box_efficacy: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: isMobile ? "100%" : "auto", // Adjust width for mobile
      backgroundColor: "rgba(0, 176, 26, 0.7)",
      borderRadius: 10,
      padding: 20,
      gap: 5,
    },

    pieChartContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Responsive layout
      gap: "80px",
      flexWrap: "wrap",
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      margin: isMobile ? "0 auto" : "0",
    },
    pieChart: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 50,
      padding: 20,
    },
  };

  return (
    <div style={styles.container}>
      {/* Dropdown */}
      <div style={styles.dropdown}>
        {/* Dropdown */}
        <Dropdown
          title="Class:"
          options={["SE100.P10", "SE100.P11", "SE100.P13"]}
          style={{ borderColor: "#959595" }}
          onChange={handleDropdownChange}
        />

        <Dropdown
          title="Session:"
          options={["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
          style={{ borderColor: "#959595" }}
          onChange={handleDropdownChange}
        />
      </div>

      {/* Report */}
      <div style={styles.report}>
        <div style={styles.box_respond}>
          <div style={styles.label}>Respond received</div>
          <div style={styles.row}>
            <Rows4 color="#FFFFFF" size={80} />
            <div style={styles.value}>48</div>
          </div>
        </div>
        <div style={styles.box_efficacy}>
          <div style={styles.label}> The efficacy of the lesson</div>
          <div style={styles.row}>
            <TrendingUp color="#FFFFFF" size={80} />
            <div style={styles.value}>72</div>
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div style={styles.pieChartContainer}>
        <div style={styles.pieChart}>
          <label style={styles.dropdownLabel}>
            Students’ understanding level
          </label>
          <PieChart
            colors={["#EF1F1F", "#FFC038", "#6A9AB0", "#00B01A"]}
            series={[
              {
                data: [
                  { id: 0, value: 1, label: "Well" },
                  { id: 1, value: 1, label: "Normal" },
                  { id: 2, value: 1, label: "Not well" },
                  { id: 3, value: 2, label: "Bad" },
                ],
              },
            ]}
            width={isMobile ? 350 : 500}
            height={isMobile ? 200 : 300}
          />
        </div>
        <div style={styles.pieChart}>
          <label style={styles.dropdownLabel}>Presence rate </label>
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
    </div>
  );
}
