"use client";
import React, { useEffect, useState } from "react";
import { Edit3, Send } from "lucide-react";
import Dropdown from "../../../../component/Dropdown";
import RoundedButton from "../../../../component/RoundedButton";
import Table from "../../../../component/Table"; // Import Table component có pagination và checkbox

export default function Report() {
  const [isMobile, setIsMobile] = useState(false);
  const [maxViolations, setMaxViolations] = useState<number>(6); // Giá trị cố định
  const [selectedRows, setSelectedRows] = useState<any[][]>([]); // Hàng được chọn

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

  const tableHeaders = ["STUDENT NAME", "STUDENT CODE", "NUMBER OF VIOLATIONS"];
  const tableData = [
    ["Jacob Wilton", "SV230841", 7],
    ["Jane Smith", "SV123456", 3],
    ["Mark Taylor", "SV654321", 5],
    ["Emily Davis", "SV789012", 2],
    ["John Doe", "SV345678", 4],
  ];

  const handleSelectedRowsChange = (rows: any[][]) => {
    setSelectedRows(rows);
    console.log("Selected rows:", rows);
  };

  const handleSendWarning = () => {
    console.log("Send warning to:", selectedRows);
    // Thêm logic gửi cảnh báo ở đây
  };

  const handleUpdateWarning = () => {
    console.log("Update warning content");
    // Thêm logic cập nhật nội dung cảnh báo ở đây
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
          onClick={handleSendWarning}
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
          onClick={handleUpdateWarning}
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

      {/* Table Section */}
      <div style={styles.tableContainer}>
        <Table
          tableHeader={tableHeaders}
          tableData={tableData}
          itemsPerPage={3} // Hiển thị 3 hàng trên mỗi trang
          showHeaderCheckbox={true} // Hiển thị checkbox ở header
          onSelectedRowsChange={handleSelectedRowsChange}
        />
      </div>
    </div>
  );
}
