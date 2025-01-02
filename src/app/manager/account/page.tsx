"use client";
import { Modal, StyledEngineProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import Dropdown from "../../../../component/Dropdown";
import SearchBar from "../../../../component/SearchBar";
import TabSwitcher from "../../../../component/Tabs";
import RoundedButton from "../../../../component/RoundedButton";
import { FileUp } from "lucide-react";

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

  const tableHeader = [
    "ID",
    "ROLE",
    "USERNAME",
    "EMAIL",
    "FULL NAME",
    "PHONE",
    "DATE OF BIRTH",
    "ROLE CODE",
  ];
  const tableData = [
    [
      "1",
      "STUDENT",
      "harry.potter",
      "harry.potter@hogwarts.edu",
      "Harry Potter",
      "123-456-7890",
      "31/07/1980",
      "SV111",
    ],
    [
      "2",
      "STUDENT",
      "hermione.granger",
      "hermione.granger@hogwarts.edu",
      "Hermione Granger",
      "123-456-7891",
      "19/09/1979",
      "SV112",
    ],
  ];

  const handleRowClick = (rowData: string[]) => {
    console.log("Row clicked:", rowData);
  };

  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected option:", value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term: string) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const [isModalVisible, setIsModalVisible] = useState(false); // State để kiểm soát modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      gap: "20px",
      width: "100%",
      margin: "0 auto",
    },
    top: {
      display: "flex",
      flexDirection: "row",
      gap: "20px", // Khoảng cách giữa các phần tử trong hàng
      width: "100%",
    },
    searchContainer: {
      marginTop: 10,
      width: "auto",
    },
    dropdownContainer: {
      width: "10%",
    },
    tab: {
      width: "25%",
    },
    button: {
      display: "flex",
      justifyContent: "flex-end",
      borderRadius: "5px",
    },
    mid: {
      display: "flex",
      justifyContent: isMobile ? "center" : "space-between",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "center" : "flex-start",
      width: "auto",
    },

    upload: {
      display: "flex",
      gap: 20,
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
      <div style={styles.top}>
        <div style={styles.searchContainer}>
          <SearchBar
            placeholder="Search by..."
            onSearch={handleSearch}
            style={{ width: 415 }}
          />
        </div>
        <div style={styles.dropdownContainer}>
          <Dropdown
            options={["Name", "Role code", "Email", "Phone"]}
            onChange={handleDropdownChange}
            title={""}
          />
        </div>
      </div>
      <div style={styles.mid}>
        <div style={styles.tab}>
          <TabSwitcher tabs={["All", "Student", "Teacher", "Manager"]} />
        </div>
        <div style={styles.upload}>
          <RoundedButton
            title="Upload excel file"
            onClick={handleClick}
            icon={<FileUp size={24} color="white" />}
            style={{ backgroundColor: "#999999" }}
            textStyle={{ fontSize: "20px", color: "white" }}
          />

          <RoundedButton
            title="Add new"
            onClick={toggleModal}
            icon={<FileUp size={24} color="white" />}
            style={{ backgroundColor: "green" }}
            textStyle={{ fontSize: "20px", color: "white" }}
          />
        </div>
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

      {/* Modal Section */}
      {isModalVisible && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: isMobile ? "center" : "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <button
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={toggleModal}
            >
              X
            </button>
            <h2 style={{ marginBottom: "16px" }}>Create a new account</h2>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="anna123@gmail.com"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Role</label>
                  <select
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="student">Student</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Full name</label>
                <input
                  type="text"
                  placeholder="Anna Maderlaise"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <label>Date of birth</label>
                  <input
                    type="date"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="09367891072"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              </div>
              <div>
                <label>Role code</label>
                <input
                  type="text"
                  placeholder="If role is 'Manager', you can leave this empty"
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: "#3A6D8C",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                CONFIRM
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
