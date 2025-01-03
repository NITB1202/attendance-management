"use client";
import { StyledEngineProvider } from "@mui/material";
import { Edit3, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../../component/Dropdown";
import RoundedButton from "../../../../component/RoundedButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";
import { useRouter } from "next/router";
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

  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected option:", value);
  };

  const columns: GridColDef[] = [
    { field: "studentName", headerName: "STUDENT NAME", flex: 1 },
    { field: "studentCode", headerName: "STUDENT CODE", flex: 1 },
    { field: "violations", headerName: "NUMBER OF VIOLATIONS", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      studentName: "Jacob Wilton",
      studentCode: "SV230841",
      violations: 7,
    },
    {
      id: 2,
      studentName: "Jane Smith",
      studentCode: "SV123456",
      violations: 3,
    },
    {
      id: 3,
      studentName: "Mark Taylor",
      studentCode: "SV654321",
      violations: 5,
    },
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
    buttonRow: {
      display: "flex",
      flexDirection: "row",
      gap: "20px", // Khoảng cách giữa các nút trong cùng một hàng
    },
    tableContainer: {
      display: "flex",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      {/* Dropdown */}
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

      <div style={styles.buttonRow}>
        <RoundedButton
          title="Send warning to all selected"
          onClick={() => console.log("Send warning clicked")}
          icon={<Send size={24} color="white" />}
          style={{
            backgroundColor: "#D32F2F",
            padding: "7px 10px", // Tùy chỉnh padding
          }}
          textStyle={{
            fontSize: "20px", // Chữ nhỏ hơn
            fontWeight: "bold", // Font chữ không đậm (nếu cần)
          }}
        />
        <RoundedButton
          title="Update warning content"
          onClick={() => console.log("Update warning clicked")}
          icon={<Edit3 size={24} color="white" />}
          style={{
            backgroundColor: "#3A6D8C",
            padding: "7px 10px",
          }}
          textStyle={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        />
      </div>

      {/* DataGrid Section */}
      <div style={styles.tableContainer}>
        <div style={{ height: "auto", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#6A9AB0", // Màu nền header
                color: "#FFFFFF",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontSize: "16px",
                color: "#000000",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
