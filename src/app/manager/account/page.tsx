"use client";
import { Modal, StyledEngineProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import Dropdown from "../../../../component/Dropdown";
import SearchBar from "../../../../component/SearchBar";
import TabSwitcher from "../../../../component/Tabs";
import RoundedButton from "../../../../component/RoundedButton";
import { Calendar, FileUp } from "lucide-react";

export default function Account() {
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
  const [isModalVisible1, setIsModalVisible1] = useState(false); // State để kiểm soát modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setIsModalVisible1(!isModalVisible);
  };

  const [selectedRow, setSelectedRow] = useState<Record<string, string> | null>(
    null
  );

  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleRowClick = (rowData: (string | React.ReactNode)[]) => {
    const convertedData: Record<string, string> = tableHeader.reduce(
      (acc, header, index) => {
        acc[header] =
          typeof rowData[index] === "string"
            ? (rowData[index] as string)
            : String(rowData[index]);
        return acc;
      },
      {} as Record<string, string>
    );

    setFormData(convertedData); // Lưu dữ liệu đã chuyển đổi
    setIsModalVisible1(true); // Hiển thị modal
  };

  const closeModal = () => {
    setIsModalVisible1(false);
    setSelectedRow(null);
    setFormData({});
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Updated Data:", formData); // Bạn có thể gọi API để cập nhật dữ liệu ở đây
    closeModal();
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

      {/* Modal */}
      {isModalVisible1 && (
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
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "600px",
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
              onClick={closeModal}
            >
              X
            </button>
            <label
              style={{
                fontSize: "24px",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Update account
            </label>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1.6 }}>
                  <label style={{ fontSize: "16px", fontWeight: "500" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.EMAIL || ""}
                    onChange={(e) => handleInputChange("EMAIL", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div style={{ flex: 0.4 }}>
                  <label style={{ fontSize: "16px", fontWeight: "500" }}>
                    Role
                  </label>
                  <select
                    value={formData.ROLE || ""}
                    onChange={(e) => handleInputChange("ROLE", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="MANAGER">Manager</option>
                    <option value="TEACHER">Teacher</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>
                  Full name
                </label>
                <input
                  type="text"
                  value={formData["FULL NAME"] || ""}
                  onChange={(e) =>
                    handleInputChange("FULL NAME", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 0.8 }}>
                  <label style={{ fontSize: "16px", fontWeight: "500" }}>
                    Date of birth
                  </label>
                  <input
                    type="text"
                    value={formData["DATE OF BIRTH"] || ""}
                    onChange={(e) =>
                      handleInputChange("DATE OF BIRTH", e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div style={{ flex: 1.2 }}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.PHONE || ""}
                    onChange={(e) => handleInputChange("PHONE", e.target.value)}
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
                <label style={{ fontSize: "16px", fontWeight: "500" }}>
                  Role code
                </label>
                <input
                  type="text"
                  value={formData["ROLE CODE"] || ""}
                  onChange={(e) =>
                    handleInputChange("ROLE CODE", e.target.value)
                  }
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
                  padding: "10px",
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

      {/* Modal Section create */}
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
              maxWidth: "600px",
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
            <label
              style={{
                fontSize: "24px",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Create a new accoount
            </label>
            <form
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1.6 }}>
                  <label style={{ fontSize: "16px", fontWeight: "500" }}>
                    Email
                  </label>
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
                <div style={{ flex: 0.4 }}>
                  <label style={{ fontSize: "16px", fontWeight: "500" }}>
                    Role
                  </label>
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
                    <option value="admin">Teacher</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "16px", fontWeight: "500" }}>
                  Full name
                </label>
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
                <div style={{ flex: 0.8 }}>
                  <label style={{ fontSize: "16px", fontWeight: "500" }}>
                    Date of birth
                  </label>
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
                <div style={{ flex: 1.2 }}>
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
                <label style={{ fontSize: "16px", fontWeight: "500" }}>
                  Role code
                </label>
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
                  padding: "10px",
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
