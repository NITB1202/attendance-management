"use client";

import React, { useState } from "react";
import CommentBox from "../../../../component/CommentBox";
import Table from "../../../../component/Table";
import RoundedButton from "../../../../component/RoundedButton";

const ClassManagerDetail = () => {
    const [activeTab, setActiveTab] = useState('General');
    const [modalVisible, setModalVisible] = useState(false);
    const [newClassName, setNewClassName] = useState('');

    const tableHeaderStudent = [
        "ORDER",
        "STUDENT CODE",
        "STUDENT NAME",
        "USERNAME",
    ];

    return (
        <div style={styles.container}>
            
                <div style={styles.tabContainer}>
                    <button onClick={() => setActiveTab('General')} style={activeTab === 'General' ? styles.activeTab : styles.tab}>General</button>
                    <button onClick={() => setActiveTab('Students')} style={activeTab === 'Students' ? styles.activeTab : styles.tab}>Students</button>
                </div>
                {activeTab === 'General' && (
                    <div>
                        <CommentBox 
                            avatar="path/to/avatar.jpg" 
                            name="John Doe" 
                            content="This is a comment." 
                            timestamp="2023-10-01T12:00:00Z" 
                            onReply={() => console.log('Reply clicked')} 
                        />
                        <RoundedButton title="Add New Class" onClick={() => setModalVisible(true)} />
                    </div>
                )}
                {activeTab === 'Students' && (
                    <Table tableHeader={tableHeaderStudent} tableData={[]} />
                )}
                {modalVisible && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalContainer}>
                            <input
                                placeholder="Enter class name"
                                value={newClassName}
                                onChange={(e) => setNewClassName(e.target.value)}
                                style={styles.input}
                            />
                            <button onClick={() => setModalVisible(false)} style={styles.button}>Save</button>
                            <button onClick={() => setModalVisible(false)} style={styles.button}>Cancel</button>
                        </div>
                    </div>
                )}
            
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "white",
    },
    tabContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: "20px",
    },
    tab: {
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "5px",
        margin: "0 5px",
    },
    activeTab: {
        padding: "10px 20px",
        cursor: "pointer",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        margin: "0 5px",
    },
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
    },
    button: {
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
    },
};

export default ClassManagerDetail;