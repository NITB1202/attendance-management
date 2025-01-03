"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../../../../component/Dropdown";
import Table from "../../../../component/Table";
import CommentBox from "../../../../component/CommentBox";
import ReplyBox from "../../../../component/ReplyBox";
import TabSwitcher from "../../../../component/Tabs";

const DetailStudent = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleToggle = () => {
        setIsAnonymous(!isAnonymous);
        console.log('Anonymous toggled:', !isAnonymous);
    };

    const [activeTab, setActiveTab] = useState('General');
    const tableHeaders = ['ORDER', 'STUDENT CODE', 'STUDENT NAME', 'USERNAME'];
    const tableData = [
        ['1', 'S001', 'John Doe', 'johndoe'],
        ['2', 'S002', 'Jane Smith', 'janesmith'],
    ];

    const tableHeaders2 = ['No', 'Date'];
    const tableData2 = [
        ['1', '2023-01-01'],
        ['2', '2023-01-02'],
    ];

     useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const flexDirection = screenWidth < 700 ? "column" : "row";
    
    return (
        <div>
            <div style={{ display: 'flex', padding: "10px", marginTop: "20px"}}>
                <TabSwitcher
                    tabs={["General", "Session"]}
                    onTabChange={setActiveTab}>
                </TabSwitcher>
            </div>
            <div style={{ marginTop: '20px' }}>
                {activeTab === 'General' && (
                    <div style={{ display: 'flex', width: '100%', height: '10%', flexDirection: 'column' }}>
                        <div style={{ display: "flex", flexDirection: "column", padding: '10px'}}>
                            <label style={{ fontWeight: 'bold', fontSize: 24 }}>Class Information</label>
                            <div style={{ display: 'flex', flexDirection: flexDirection}}>
                                <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'row', gap: 20 }}>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Class Name:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Course Name:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Teacher Name:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Teacher Code:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Class monitor's name:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Student Code:</label>
                                    </div>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>M501.P22</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>Math</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>Brian Anna</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>T2102</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>Martin Cobe</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>SV4921412</label>
                                    </div>
                                </div>
                                <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Start Date:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>End Date:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Start Time:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>End Time:</label>
                                    </div>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>12/09/2024</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>02/04/2025</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>07:00 AM</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>09:30 AM</label>
                                    </div>
                                </div>
                                <div style={{ flex: 2, padding: '10px', display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Maximum allowable late occurrences:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Maximum allowable absence occurrences:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Allowed late time:</label>
                                    </div>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>6</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>4</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>05:00</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 4, padding: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <label style={{ fontSize: 24, fontWeight: 'bold', display: 'block' }}>Student List</label>
                            </div>
                            <Table tableHeader={tableHeaders} tableData={tableData} />
                        </div>
                    </div>
                )}
                {activeTab === 'Session' && (
                    <div style={{ display: 'flex', width: '100%', height: '620px' }}>
                        <div style={{ flex: 1, padding: '10px' }}>
                            <Table tableHeader={tableHeaders2} tableData={tableData2} />
                        </div>
                        <div style={{ flex: 6, padding: '10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ fontSize: 16, marginRight: '10px', fontWeight: 'bold' }}>Roll Caller Name:</label>
                                    <Dropdown
                                        title=""
                                        options={['John Doe', 'Jane Smith', 'Alice Johnson']}
                                        style={{ width: '150%', fontSize: 16, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '100px' }}>
                                    <label style={{ marginBottom: '7px', fontSize: 16, marginRight: '10px', fontWeight: 'bold' }}>Student Code:</label>
                                    <input
                                        type="text"
                                        value="S001"
                                        style={{ fontSize: 16, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', width: '150px' }}
                                    />
                                </div>
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
                                    <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
                                        <CommentBox
                                            avatar="path/to/avatar.jpg"
                                            name="John Doe"
                                            content="This is a comment."
                                            timestamp="2023-01-01"
                                            onReply={() => console.log('Reply clicked')}
                                        />
                                        <div style={{ marginLeft: '20px' }}>
                                            <ReplyBox
                                                avatar="path/to/avatar.jpg"
                                                name="John Doe"
                                                content="This is a reply."
                                                timestamp="2023-01-01"
                                                onPost={() => console.log('Post clicked')}
                                                onCancel={() => console.log('Cancel clicked')}
                                            />
                                        </div>
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <button
                                        style={{
                                            alignSelf: 'flex-start',
                                            backgroundColor: '#008e15',
                                            border: 'none',
                                            color: '#FFFFFF',
                                            cursor: 'pointer',
                                            padding: '8px 16px',
                                            marginTop: '10px',
                                            borderRadius: '6px',
                                            marginRight: '10px',
                                            width: '120px',
                                        }}
                                        onClick={() => console.log('4 Replies clicked')}
                                    >
                                        Add new
                                    </button>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <ReplyBox
                                            avatar="path/to/avatar.jpg"
                                            name="John Doe"
                                            content="This is another reply."
                                            timestamp="2023-01-01"
                                            onPost={() => console.log('Post clicked')}
                                            onCancel={() => console.log('Cancel clicked')}
                                        />
                                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                            <label style={{ marginRight: '10px' }}>Anonymous</label>
                                            <div
                                                onClick={handleToggle}
                                                style={{
                                                    width: '40px',
                                                    height: '20px',
                                                    backgroundColor: isAnonymous ? '#6a9ab0' : '#ccc',
                                                    borderRadius: '20px',
                                                    position: 'relative',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '18px',
                                                        height: '18px',
                                                        backgroundColor: 'white',
                                                        borderRadius: '50%',
                                                        position: 'absolute',
                                                        top: '1px',
                                                        left: isAnonymous ? '20px' : '1px',
                                                        transition: 'left 0.2s'
                                                    }}
                                                />
                                            </div>
                                        </div>
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

export default DetailStudent;