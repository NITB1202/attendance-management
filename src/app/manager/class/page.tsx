"use client";


import React, { useState } from "react";
import Table from "../../../../component/Table";
import RoundedButton from "../../../../component/RoundedButton";
import SearchBar from "../../../../component/SearchBar";
import Input from "../../../../component/Input";
import Dropdown from "../../../../component/Dropdown";


const ClassManager = () => {
    const [modalVisible, setModalVisible] = useState(false);
    
    const [newClassName] = useState("");


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
                <button
                    style={{
                        backgroundColor: "green",
                        padding: "10px 20px",
                        borderRadius: 5,
                        marginLeft: "auto",
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
                            height: 745,
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
                        <h1 style={{ marginBottom: 15, marginTop: 30, fontSize: 24, fontWeight: "bold" }}>Create a new class</h1>

                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1, margin: '0 5px' }}>
                                <label>Class name</label>
                                <Input
                                    title=""
                                    placeHolder="Enter class name"
                                    style={{ marginBottom: '10px' }}
                                />
                                <input type="text" style={{ width: '100%', marginBottom: '10px' }} />
                                <label>Course name</label>
                                <Dropdown
                                    title=""
                                    options={['Course 1', 'Course 2', 'Course 3']}
                                    style={{ marginBottom: '10px' }}
                                />
                                <input type="text" style={{ width: '100%' }} />
                            </div>
                            <div style={{ flex: 1,  margin: '0 5px' }}>Part 2</div>
                            <div style={{ flex: 1,  margin: '0 5px' }}>Part 3</div>
                        </div>

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
            )}
        </div>


    );
};


export default ClassManager;