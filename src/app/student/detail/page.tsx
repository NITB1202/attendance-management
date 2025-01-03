"use client";

import React, { useState, useEffect } from "react";
import Table from "../../../../component/Table";
import CommentBox from "../../../../component/CommentBox";
import ReplyBox from "../../../../component/ReplyBox";
import './styles.css';

const DetailStudent = () => {
    const [activeTab, setActiveTab] = useState('General');
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

    const tableHeader3 = ['Order', 'Student Code', 'Student Name', 'Attendance Status'];
    const tableData3 = [
        ['1', 'S001', 'John Doe', 'Present'],
        ['2', 'S002', 'Jane Smith', 'Absent'],
    ];

    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleToggle = () => {
        setIsAnonymous(!isAnonymous);
    };

    return (
        <div style={screenWidth < 500 ? styles.containerMobile : styles.container}>
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
                    <div className="general-tab">
                        <div className="class-info">
                            <label className="class-info-title">Class Information</label>
                            <div className="class-info-content">
                                <div className="class-info-column">
                                    <div className="class-info-item">
                                        <label className="class-info-label">Class Name:</label>
                                        <label className="class-info-value">M501.P22</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Course Name:</label>
                                        <label className="class-info-value">Math</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Teacher Name:</label>
                                        <label className="class-info-value">Brian Anna</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Teacher Code:</label>
                                        <label className="class-info-value">T2102</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Class Mother&apos;s Name:</label>
                                        <label className="class-info-value">Martin Cobe</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Student Code:</label>
                                        <label className="class-info-value">SV4921412</label>
                                    </div>
                                </div>
                                <div className="class-info-column">
                                    <div className="class-info-item">
                                        <label className="class-info-label">Start Date:</label>
                                        <label className="class-info-value">12/09/2024</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">End Date:</label>
                                        <label className="class-info-value">02/04/2025</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Start Time:</label>
                                        <label className="class-info-value">07:00 AM</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">End Time:</label>
                                        <label className="class-info-value">09:30 AM</label>
                                    </div>
                                </div>
                                <div className="class-info-column">
                                    <div className="class-info-item">
                                        <label className="class-info-label">Maximum allowable late occurrences:</label>
                                        <label className="class-info-value">6</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Maximum allowable absence occurrences:</label>
                                        <label className="class-info-value">4</label>
                                    </div>
                                    <div className="class-info-item">
                                        <label className="class-info-label">Allowed late time (minute):</label>
                                        <label className="class-info-value">05:00</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="student-list">
                            <label className="student-list-title">Student List</label>
                            <Table tableHeader={tableHeader} tableData={tableData} />
                        </div>
                    </div>
                )}

                {activeTab === 'Session' && (
                    <div className="session-container">
                        <div className="table-wrapper">
                            <div className="table-container">
                                <div className="table2">
                                    <Table tableHeader={tableHeader2} tableData={tableData2} />
                                </div>
                            </div>
                        </div>
                        <div className="session-details">
                            <div className="roll-caller-info">
                                <label className="info-label">Roll Caller Name:</label>
                                <label className="info-value">Jack Tarco</label>
                            </div>
                            <div className="student-code-info">
                                <label className="info-label">Student Code:</label>
                                <label className="info-value">SV4921412</label>
                            </div>
                            <div className="attendance-status">
                                <label className="status-label">Student Attendance Status</label>
                                <div className="table-container">
                                    <div className="table3">
                                        <Table tableHeader={tableHeader3} tableData={tableData3} />
                                    </div>
                                </div>
                            </div>
                            <div className="discussion-section">
                                <label className="discussion-label">Discussion</label>
                                <div className="comment-box">
                                    <CommentBox
                                        className="custom-comment-box"
                                        avatar="path/to/avatar.jpg"
                                        name="John Doe"
                                        content="This is a comment."
                                        timestamp="2023-01-01"
                                        onReply={() => console.log('Reply clicked')}
                                    />
                                    <ReplyBox
                                        className="custom-reply-box"
                                        avatar="path/to/avatar.jpg"
                                        name="John Doe"
                                        content="This is another reply."
                                        timestamp="2023-01-01"
                                        onPost={() => console.log('Post clicked')}
                                        onCancel={() => console.log('Cancel clicked')}
                                    />
                                    <button className="reply-button" onClick={() => console.log('4 Replies clicked')}>
                                        4 Replies
                                    </button>
                                </div>
                            </div>
                            <div className="reply-container">
                                <button
                                    className="add-new-button"
                                    onClick={() => console.log('4 Replies clicked')}
                                >
                                    Add new
                                </button>
                                <ReplyBox
                                    className="custom-reply-box"
                                    avatar="path/to/avatar.jpg"
                                    name="John Doe"
                                    content="This is another reply."
                                    timestamp="2023-01-01"
                                    onPost={() => console.log('Post clicked')}
                                    onCancel={() => console.log('Cancel clicked')}
                                />
                                <div className="toggle-container">
                                    <label className="toggle-label">Anonymous</label>
                                    <div className={`toggle-switch ${isAnonymous ? 'active' : ''}`} onClick={handleToggle}>
                                        <div className="toggle-knob" />
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

export default DetailStudent;