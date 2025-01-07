"use client";

import React, { useState, useEffect, useRef } from "react";
import Table from "../../../../component/Table";
import RoundedButton from "../../../../component/RoundedButton";
import SearchBar from "../../../../component/SearchBar";
import Input from "../../../../component/Input";
import { Properties } from "csstype";
import CustomSelect from "../../../../component/CustomSelect";
import { FileUp } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";
import { Colors } from "../../../../constant/Colors";
import { IoMdClose } from "react-icons/io";
import SmallInput from "../../../../component/SmallInput";
import { LuUpload } from "react-icons/lu";

const CourseManager = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newClassName] = useState("");
  const [modal2Visible, setModal2Visible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [openFileInput,setOpenFileInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const tableHeader = ["ID", "COURSE NAME", "COURSE CODE"];

  const tableData = [
    [
      "1",
      "MATH BASIC TO ADVANCE",
      "M100",
    ],
  ];

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

  const handleCloseFileInput = () =>{
    setFileName("");
    setOpenFileInput(false);
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFileName(file.name);
      }
  };

  return (
    <div style={screenWidth < 500 ? styles.containerMobile : styles.container}>
      {/* Search and Filter Section */}
      <div style={styles.headerContainer}>
        <SearchBar 
          placeholder="Type to search..." 
          style={styles.searchBar}
          onSearch={handleSearch} />
        <CustomSelect
          options={["Name","Code"]}
          onSelect={()=>{}}>
        </CustomSelect>
      </div>
      <div style={styles.buttonContainer}>
        <RoundedButton
            title="Upload excel file"
            onClick={()=> setOpenFileInput(true)}
            icon={<FileUp size={24} color="white" />}
            style={{ backgroundColor: "#999999", padding: "10px 30px" }}
            textStyle={{ fontSize: "20px", color: "white" }}
          />
          <RoundedButton
            title="Add new"
            onClick={()=> setModalVisible(true)}
            icon={<FiPlusCircle size={24} color="white" />}
            style={{ backgroundColor: Colors.green, padding: "10px 30px" }}
            textStyle={{ fontSize: "20px", color: "white" }}
          />
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
        <div style={styles.modalOverlay}>
          <div style={styles.form}>
            <button
              style={styles.closeButton}
              onClick={() => setModalVisible(false)}
            >
              <IoMdClose size={30}/>
            </button>
            <h1 style={styles.formHeader}>
              Create a new course
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <SmallInput
                title="Course name"
                placeHolder="Enter course name"
                style={{ width: 360}}>
              </SmallInput>
              <SmallInput
                title="Course code"
                placeHolder="Enter course code"
                style={{ width: 360}}>
              </SmallInput>

              <div style={{ flex: 1, marginTop: 10 }}>
                <RoundedButton
                  title="CONFIRM"
                  onClick={handleSave}
                  style={{
                    width: "100%",
                    height: 46,
                  }}
                  textStyle={{ fontSize: 24, fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {modal2Visible && (
        <div style={styles.modalOverlay}>
          <div style={styles.form}>
          <button
            style={styles.closeButton}
            onClick={() => setModalVisible(false)}
          >
            <IoMdClose size={30}/>
          </button>
            <h1 style={styles.formHeader}>
              Update course
            </h1>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <SmallInput
                title="Course name"
                placeHolder="Enter course name"
                style={{ width: 360}}>
              </SmallInput>
              <SmallInput
                title="Course code"
                placeHolder="Enter course code"
                style={{ width: 360}}>
              </SmallInput>

              <div style={{ flex: 1, marginTop: 10 }}>
                <RoundedButton
                  title="CONFIRM"
                  onClick={handleSave}
                  style={{
                    width: "100%",
                    height: 46,
                  }}
                  textStyle={{ fontSize: 24, fontWeight: "bold" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {
        openFileInput &&
        <div style={styles.modalOverlay}>
          <div style={styles.uploadForm}>
            <button 
              style={styles.closeButton}
              onClick={handleCloseFileInput}>
              <IoMdClose size={35} />
            </button>
           <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap:20}}>
            <SmallInput
              title="Select an Excel file"
              style={{width: 400}}
              defaultValue={fileName}
              disable={true}>
            </SmallInput>
            <input
              ref={fileInputRef}
              type="file"
              id="file-input"
              style={{ display: "none" }}
              accept=".xls,.xlsx"
              onChange={handleFileChange}
            />
            <button
              style={styles.iconButton}
              type="button"
              onClick={handleButtonClick}>
              <LuUpload size={32}  color="white"/>
            </button>
            </div>
            <RoundedButton
              title="CONFIRM"
              style={{ padding: "10px 30px", marginTop: 30 }}
              textStyle={{ fontSize: "20px", color: "white" }}
              onClick={handleCloseFileInput}>
            </RoundedButton>
          </div>
        </div>
      }
      
    </div>
  );
};


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
    marginRight: "10px",
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
  searchBar:{
    display: "flex",
    maxWidth: 350,
  },
  headerContainer:{ 
    display: "flex", 
    justifyContent: "flex-start", 
    alignItems: "center", 
    gap: 20
  },
  buttonContainer:{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  modalOverlay:{
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
  },
  form:{
    width: 400,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  closeButton:{
    alignSelf: "flex-end",
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
  uploadForm:{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  },
  formHeader:{
    fontSize: "30px",
    fontWeight: "700",
    marginBottom: "20px",
  },
  iconButton:{
    backgroundColor: Colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 42,
    height: 42,
  }
};

export default CourseManager;
