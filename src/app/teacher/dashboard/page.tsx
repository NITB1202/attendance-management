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

  return (
    <div style={isMobile ? styles.mobileContainer : styles.container}>
      {/* Dropdown */}
      <div style={styles.dropdown}>
        <div style={styles.dropdownContainer}>
          <label style={styles.dropdownLabel}>Class</label>
          <select style={styles.dropdownInput}>
            <option value="SE103.022">SE103.022</option>
            <option value="SE104.023">SE104.023</option>
            <option value="SE105.024">SE105.024</option>
          </select>
        </div>

        <div style={styles.dropdownContainer}>
          <label style={styles.dropdownLabel}>Session</label>
          <select style={styles.dropdownInput}>
            <option value="0">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
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
      <div style={isMobile ? styles.mobileChart : styles.chart}>
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
  dropdown: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    gap: 50,
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "1.5rem",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#fff",
    maxWidth: "100%",
    borderColor: "#959595",
  },
  dropdownLabel: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  dropdownInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1.5px solid #959595",
  },

  report: {
    display: "flex",
    alignItems: "center",
    gap: "50px",
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
    width: "auto",
    backgroundColor: "#6A9AB0",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 5,
  },
  box_efficacy: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    backgroundColor: "rgba(0, 176, 26, 0.7)",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 5,
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
