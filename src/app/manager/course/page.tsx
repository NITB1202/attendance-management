"use client";

import React, { useState, useEffect } from "react";
import Table from "../../../../component/Table";
import RoundedButton from "../../../../component/RoundedButton";
import SearchBar from "../../../../component/SearchBar";
import Input from "../../../../component/Input";
// import { EllipsisOutlined } from '@ant-design/icons';
// import { Button } from 'antd';

const CourseManager = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newClassName] = useState("");
  const [modal2Visible, setModal2Visible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = () => {
    console.log("Từ khóa tìm kiếm:");
  };

  const handleAddNew = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    console.log("New Class Name:", newClassName);
    setModalVisible(false);
  };

  const tableHeader = ["ID", "COURSE NAME", "COURSE CODE", ""];

  const tableData = [
    [
      "1",
      "MATH BASIC TO ADVANCE",
      "M100",
      // <Button key="ellipsis-button" icon={<EllipsisOutlined />} onClick={() => setModal2Visible(true)} />
    ],
  ];

  return (
    <div style={screenWidth < 500 ? styles.containerMobile : styles.container}>
      {/* Search and Filter Section */}
      <div style={{ display: "flex", marginBottom: 20, height: 40 }}>
        <SearchBar placeholder="Type to search..." onSearch={handleSearch} />
        <div
          style={{
            marginLeft: 20,
            height: 37,
            ...(screenWidth < 500 && styles.dropdownMobile),
          }}
        >
          <select
            style={{
              height: 42,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#ccc",
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#fff",
            }}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="SE103.022">Name</option>
            <option value="SE104.023">Code</option>
          </select>
        </div>
        <button
          style={{
            backgroundColor: "#999999",
            padding: "10px 20px",
            borderRadius: 5,
            marginLeft: "auto",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Upload excel file
        </button>
        <button
          style={{
            backgroundColor: "green",
            marginLeft: 20,
            padding: "10px 20px",
            borderRadius: 5,
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
          onClick={handleAddNew}
        >
          Add New
        </button>
      </div>

      {/* Table Section */}
      <div style={{ marginTop: 20, ...styles.tableContainer }}>
        <div style={styles.table}>
          <Table
            tableHeader={tableHeader}
            tableData={tableData}
            itemsPerPage={5}
          />
        </div>
      </div>

      {modalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 297,
              height: 341,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              position: "relative",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 24,
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => setModalVisible(false)}
            >
              ✕
            </button>
            <h1
              style={{
                marginBottom: 15,
                marginTop: 30,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Create a new course
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 90 }}>
                <label>Class name</label>
                <Input
                  title=""
                  placeHolder="Enter class name"
                  style={{ marginBottom: "10px" }}
                />
                <input
                  type="text"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
              <div style={{ height: 90 }}>
                <label>Course name</label>
                <Input
                  title=""
                  placeHolder="Enter class name"
                  style={{ marginBottom: "10px" }}
                />
                <input
                  type="text"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <RoundedButton
                  title="CONFIRM"
                  onClick={handleSave}
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: "auto",
                  }}
                  textStyle={{ fontSize: 24, fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {modal2Visible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 297,
              height: 341,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              position: "relative",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 24,
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={() => setModal2Visible(false)}
            >
              ✕
            </button>
            <h1
              style={{
                marginBottom: 15,
                marginTop: 30,
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              Update course
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 90 }}>
                <label>Class name</label>
                <Input
                  title=""
                  placeHolder="Enter class name"
                  style={{ marginBottom: "10px" }}
                />
                <input
                  type="text"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>
              <div style={{ height: 90 }}>
                <label>Course name</label>
                <Input
                  title=""
                  placeHolder="Enter class name"
                  style={{ marginBottom: "10px" }}
                />
                <input
                  type="text"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <RoundedButton
                  title="CONFIRM"
                  onClick={handleSave}
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: "auto",
                  }}
                  textStyle={{ fontSize: 24, fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { Properties } from "csstype";
const styles: { [key: string]: Properties<string | number> } = {
  container: {
    padding: "20px",
  },
  containerMobile: {
    padding: "10px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    minWidth: "500px",
  },
  dropdownMobile: {
    marginRight: "10px", // Dịch sang bên trái một chút
  },
  modalContent: {
    width: "90%",
    maxWidth: "500px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
  },
  modalContentMobile: {
    width: "90%",
    maxWidth: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
  },
};

export default CourseManager;
