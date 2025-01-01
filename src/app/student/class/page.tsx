"use client";

import React, { useState } from "react";
import Table from "../../../../component/Table";
import RoundedButton from "../../../../component/RoundedButton";
import SearchBar from "../../../../component/SearchBar";

const ClassStudent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newClassName, setNewClassName] = useState("");

    const handleSearch = () => {
        console.log("Từ khóa tìm kiếm:");
    };

    const handleSave = () => {
        console.log("New Class Name:", newClassName);
        setModalVisible(false);
    };

    const tableHeader = [
        "CLASS NAME",
        "COURSE NAME",
        "START DATE",
        "END DATE",
        "START TIME",
        "END TIME",
        "TEACHER NAME",
    ];

    const tableData = [
        [
            "M120.P22",
            "MATH BASIC",
            "01/06/2024",
            "01/09/2024",
            "07:00 AM",
            "10:30 AM",
            "Luwid Mathra",
        ],
    ];

    return (

        <div style={{ padding: 10 }}>
            {/* Search and Filter Section */}
            <div style={{ display: "flex", marginBottom: 20, height: 40 }}>
                <SearchBar
                    placeholder="Type to search..."
                    onSearch={handleSearch}
                />
                <div style={{ marginLeft: 20, height: 37 }}>
                    <select
                        style={{
                            height: 40,
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            paddingLeft: 10,
                            paddingRight: 10,
                            backgroundColor: "#fff",
                        }}
                        onChange={(e) => console.log(e.target.value)}
                    >
                        <option value="SE103.022">Class name</option>
                        <option value="SE104.023">Course name</option>
                        <option value="SE105.024">Teacher name</option>
                    </select>
                </div>
                
            </div>

            {/* Table Section */}
            <div style={{ marginTop: 20 }}>
                <Table tableHeader={tableHeader} tableData={tableData} />
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
                            width: 523,
                            height: 670,
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
                        <h3 style={{ marginBottom: 15 }}>Create New Class</h3>
                        <div>
                            <label>Class Name</label>
                            <input
                                style={{
                                    width: "70%",
                                    height: 40,
                                    border: "1px solid #ccc",
                                    borderRadius: 5,
                                    padding: "0 10px",
                                    marginBottom: 15,
                                }}
                                placeholder="Enter class name"
                                value={newClassName}
                                onChange={(e) => setNewClassName(e.target.value)}
                            />
                        </div>
                        <RoundedButton
                            title="CONFIRM"
                            onClick={handleSave}
                            style={{
                                width: "100%",
                                height: 40,
                                marginTop: 25,
                            }}
                            textStyle={{ fontSize: 20, fontWeight: "bold" }}
                        />
                    </div>
                </div>
            )}
        </div>

    );
};

export default ClassStudent;