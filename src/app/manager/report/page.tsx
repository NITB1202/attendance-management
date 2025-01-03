"use client";
import { StyledEngineProvider } from "@mui/material";
import { UserCheck, UserMinus, UserRoundCheck, UserX } from "lucide-react";
import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import Dropdown from "../../../../component/Dropdown";

export default function Report() {
  const [isMobile, setIsMobile] = useState(false);
  const [maxViolations, setMaxViolations] = useState<number>(6); // Giá trị cố định
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
    ["3", "", "", "", ""],
  ];
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
      padding: "1rem",
      fontFamily: "Roboto, sans-serif",
      gap: 20,
      marginLeft: 40,
      marginRight: 20,
    },
    dropdown: {
      width: isMobile ? "50%" : "50%", // Responsive width
      display: "flex",
      flexDirection: "row",
      gap: 20,
    },

    maxViolationsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 13,
    },
    maxViolationsInput: {
      width: "60px",
      height: "52%",
      padding: "5px",
      textAlign: "center",
      border: "1px solid #959595",
      borderRadius: "4px",
      backgroundColor: "#f0f0f0",
      color: "#000",
      pointerEvents: "none", // Không cho phép chỉnh sửa
    },
    label: {
      fontWeight: 600,
      fontSize: "16px",
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
      {/* dropdown */}
      <div style={styles.dropdown}>
        <Dropdown
          title="Class name"
          options={["SE100.P10", "SE100.P12", "SE102.P12"]}
          style={{ borderColor: "#959595" }}
          onChange={handleDropdownChange}
        />
        <Dropdown
          title="Type"
          options={["Late", "Absence", "On-time"]}
          style={{ borderColor: "#959595" }}
          onChange={handleDropdownChange}
        />
        <div style={styles.maxViolationsContainer}>
          <label style={styles.label}>Maximum number of violations</label>
          <input
            type="number"
            value={maxViolations}
            readOnly // Thuộc tính readonly
            style={styles.maxViolationsInput}
          />
        </div>
      </div>

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <p style={styles.tableTitle}>
          Top classes with the most absent student
        </p>
        <Table tableHeader={tableHeader} tableData={tableData} />
      </div>
    </div>
  );
}
