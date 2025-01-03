"use client";

import React, { useState, useEffect } from "react";
import Dropdown from "../../../../component/Dropdown";
import Table from "../../../../component/Table";
import CommentBox from "../../../../component/CommentBox";
import RoundedButton from "../../../../component/RoundedButton";
import Input from "../../../../component/Input";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import CustomTimePicker from "../../../../component/CustomTimePicker";
import './styles.css';


const DetailManager = () => {
  const [activeTab, setActiveTab] = useState('General');
  const [newClassName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [, setSelectedDate] = useState<Date | null>(null);
  const [, setSelectedTime] = useState<Date | null>(null);
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

  const tableHeader = ['Order', 'Student Code', 'Student Name', 'Username'];
  const tableData = [
    ['1', 'S001', 'John Doe', 'johndoe'],
    ['2', 'S002', 'Jane Smith', 'janesmith'],
  ];

  const tableHeader2 = ['No', 'Date'];
  const tableData2 = [    
    ['1', '2023-01-01'],
    ['2', '2023-01-02'],
  ];

  const handleAddNew = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    console.log("New Class Name:", newClassName); 
    setModalVisible(false);
  };

  return (
    <div style={screenWidth < 500 ? styles.containerMobile : styles.container} >
      <div style={screenWidth < 500 ? styles.tabContainerMobile : styles.tabContainer}>
        <button
          onClick={() => setActiveTab('General')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'General' ? styles.tabButtonActive : styles.tabButtonInactive),
          }}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('Session')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'Session' ? styles.tabButtonActive : styles.tabButtonInactive),
          }}
        >
          Session
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        {activeTab === 'General' && (
          <div style={{ display: 'flex', width: '100%', height: '10%', flexDirection: 'column' }}>
            <div style={{ flex: 6, padding: '5px', marginBottom: '10px' }}>
              <label style={{ fontWeight: 'bold', fontSize: 24}}>Class Information</label>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div className="class-course-container">
                  <div className="input-group-course">
                    <label>Class Name</label>
                    <div className="input-box">
                      M501.P22
                    </div>
                  </div>
                  <div className="input-group-course">
                    <label>Course Name</label>
                    <Dropdown
                      title=""
                      options={['Math', 'Literature', 'Science']}
                      
                    />
                  </div>
                </div>
                <div className="teacher-info-container">
                  <div className="input-group-info">
                    <label>Teacher Name</label>
                    <Dropdown
                      title=""
                      options={['Math', 'Literature', 'Science']}
                      style={{ height: 40, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                  <div className="input-group-info">
                    <label>Teacher Code</label>
                    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Teacher Code
                    </div>
                  </div>
                  <div className="input-group-info">
                    <label>Class Monitor&apos;s Name</label>
                    <Dropdown
                      title=""
                      options={['Math', 'Literature', 'Science']}
                      style={{ height: 40, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                  <div className="input-group-info">
                    <label>Student Code</label>
                    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Student Code
                    </div>
                  </div>
                </div>
                <div className="date-time-container">
                  <div className="input-group-datetime">
                    <label>Start Date</label>
                    <CustomDatePicker title="" setSelectedDate={(newValue: Date | null) => setSelectedDate(newValue)} />
                  </div>
                  <div className="input-group-datetime">
                    <label>End Date</label>
                    <CustomDatePicker title="" setSelectedDate={(newValue: Date | null) => setSelectedDate(newValue)} />
                  </div>
                  <div className="input-group-datetime">
                    <label>Start Time</label>
                    <CustomTimePicker title="" setSelectedTime={(newValue: Date | null) => setSelectedTime(newValue)} />
                  </div>
                  <div className="input-group-datetime">
                    <label>End Time</label>
                    <CustomTimePicker title="" setSelectedTime={(newValue: Date | null) => setSelectedTime(newValue)} />
                  </div>
                </div>
                <div className="input-container">
                  <div className="input-group">
                    <label>Maximum allowable late occurrences</label>
                    <input type="text" placeholder="Input 1" />
                  </div>
                  <div className="input-group">
                    <label>Maximum allowable absence occurrences</label>
                    <input type="text" placeholder="Input 2" />
                  </div>
                  <div className="input-group2">
                    <label>Allowed late time (minute)</label>
                    <input type="text" placeholder="Input 3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="student-list-container">
              <div className="student-list-header">
                <label className="student-list-title">Student List</label>
                <div className="button-group">
                  <button className="upload-button">
                    Upload Excel File
                  </button>
                  <button className="add-button" onClick={handleAddNew}>
                    Add New
                  </button>
                </div>
              </div>
              <div className="table-container">
                <div className="table">
                  <Table tableHeader={tableHeader} tableData={tableData} />
                </div>
              </div>
            </div>
          </div>
        )}
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
                width: screenWidth < 500 ? 'auto' : 297,
                height: screenWidth < 500 ? 'auto' : 341,
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
              <h1 style={{ marginBottom: 15, marginTop: 30, fontSize: 24, fontWeight: "bold" }}>Select a student</h1>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <div style={{ height: 90 }}>
                  <label>Student name</label>
                  <Dropdown
                    title=""
                    options={['Martin Blue', 'Martin Gray', 'Martin Green']}
                    style={{ marginBottom: '10px' }}
                  />
                  <input type="text" style={{ width: '100%', marginBottom: '10px' }} />
                </div>
                <div style={{ height: 90 }}>
                  <label>Student code</label>
                  <Input
                    title=""
                    placeHolder="SV12345"
                    style={{ marginBottom: '10px' }}
                  />
                  <input type="text" style={{ width: '100%', marginBottom: '10px' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <RoundedButton
                    title="CONFIRM"
                    onClick={handleSave}
                    style={{
                      width: "100%",
                      height: 46,
                      marginTop: "auto"
                    }}
                    textStyle={{ fontSize: 24, fontWeight: "bold" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'Session' && (
          <div style={{ display: 'flex', width: '100%', height: '620px' }}>
            <div style={{ flex: 1, padding: '10px' }}>
              <div style={{ marginTop: 20, ...styles.tableContainer }}>
                <div style={styles.table}>
                  <Table tableHeader={tableHeader2} tableData={tableData2} />
                </div>
              </div>
            </div>
            <div style={{ flex: 6, padding: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: 16, marginRight: '10px', fontWeight: 'bold' }}>Roll Caller Name:</label>
                <label style={{ fontSize: 16 }}>John Doe</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: 16, marginRight: '10px', fontWeight: 'bold' }}>Student Code:</label>
                <label style={{ fontSize: 16 }}>S001</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '10px' }}>
                <div style={{ flex: 4, marginBottom: '10px' }}>
                  <label style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Student Attendance Status</label>
                  <Table
                    tableHeader={['Order', 'Student Code', 'Student Name', 'Attendance Status']}
                    tableData={[
                      ['1', 'S001', 'John Doe', 'Present'],
                      ['2', 'S002', 'Jane Smith', 'Absent'],
                    ]}
                  />
                </div>
                <div style={{ flex: 6, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                  <label style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Discussion</label>
                  <div style={{ flex:1, border: '1px solid #ccc', padding: '10px', borderRadius: '4px'}}>
                    <CommentBox 
                      avatar="path/to/avatar.jpg"
                      name="John Doe"
                      content="This is a comment."
                      timestamp="2023-01-01"
                      onReply={() => console.log('Reply clicked')}
                    />
                    <button
                      style={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#6A9AB0',
                        border: 'none',
                        color: '#3A6D8C',
                        cursor: 'pointer',
                        padding: '8px 16px',
                        marginTop: '10px',
                        borderRadius: '4px'
                      }}
                      onClick={() => console.log('4 Replies clicked')}
                    >
                      4 Replies
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

import { Properties } from 'csstype';
const styles: { [key: string]: Properties<string | number> } = {
  container: {
    padding: '20px',
  },
  containerMobile: {
    padding: '10px',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    minWidth: '120px',
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#3A6D8C',
    padding: '10px',
    width: '14%',
    marginLeft: '10px',
    marginTop: '10px',
    borderRadius: "5px",
  },
  tabContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#3A6D8C',
    padding: '10px',
    width: '100%',
    marginLeft: '0px',
    marginTop: '10px',
    borderRadius: "5px",
  },
  tabButton: {
    borderRadius: "5px",
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    outline: 'none',
  },
  tabButtonActive: {
    backgroundColor: '#00B01A',
    fontWeight: 'bold',
  },
  tabButtonInactive: {
    backgroundColor: '#3A6D8C',
    fontWeight: 'normal',
  },
  
};

export default DetailManager;