"use client";
import React, { useState } from "react";
import Dropdown from "../../../../component/Dropdown";
import Table from "../../../../component/Table";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState('General');
  const tableHeaders = ['Order', 'Student Code', 'Student Name', 'Username'];
  const tableData = [
    ['1', 'S001', 'John Doe', 'johndoe'],
    ['2', 'S002', 'Jane Smith', 'janesmith'],
    // Thêm dữ liệu khác nếu cần
  ];

  return (
    <div>
      <div style={{ display: 'flex', backgroundColor: '#3A6D8C', padding: '10px', width: '14%', marginLeft: '10px', marginTop: '10px', borderRadius: "5px" }}>
        <button
          onClick={() => setActiveTab('General')}
          style={{
            borderRadius: "5px",
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'General' ? '#00B01A' : '#3A6D8C',
            color: 'white',
            border: 'none',
            outline: 'none',
            fontWeight: activeTab === 'General' ? 'bold' : 'normal'
          }}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab('Session')}
          style={{
            borderRadius: "5px",
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: activeTab === 'Session' ? '#00B01A' : '#3A6D8C',
            color: 'white',
            border: 'none',
            outline: 'none',
            fontWeight: activeTab === 'Session' ? 'bold' : 'normal'
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
                <div style={{ flex: 1, marginBottom: '10px', padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '60%', gap: 20 }}>
                  <div style={{ flex: 1, marginRight: '10px' }}>
                    <label style={{ fontSize: 16, marginBottom: '5px', display: 'block' }}>Class Name</label>
                    <div style={{ fontSize: 16, height: 40, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Class Name Text
                    </div>
                  </div>
                  <div style={{ flex: 1, marginRight: '10px' }}>
                    <label style={{ marginBottom: '-5px', display: 'block' }}>Course Name</label>
                    <Dropdown
                      title=""
                      options={['Math', 'Literature', 'Science']}
                      style={{ fontSize: 16, height: 40, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                </div>
                <div style={{ flex: 1, marginBottom: '10px', padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', width: '90%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '-5px', display: 'block' }}>Teacher Name</label>
                    <Dropdown
                      title=""
                      options={['Math', 'Literature', 'Science']}
                      style={{ height: 40, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Teacher Code</label>
                    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Teacher Code
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '-5px', display: 'block' }}>Class Monitor&apos;s Name</label>
                    <Dropdown
                      title=""
                      options={['Math', 'Literature', 'Science']}
                      style={{ height: 40, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Student Code</label>
                    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Student Code
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, marginBottom: '10px', padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', width: '75%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Start Date</label>
                    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Teacher Code
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>End Date</label>
                    <div style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                      Teacher Code
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block' }}>Start Time</label>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <input
                        type="text"
                        placeholder="Enter start time"
                        style={{ width: '30%', flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
                      />
                      <Dropdown
                        title=""
                        options={['AM', 'PM']}
                        style={{width: '100%', flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ display: 'block' }}>End Time</label>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <input
                        type="text"
                        placeholder="Enter start time"
                        style={{ width: '30%', flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
                      />
                      <Dropdown
                        title=""
                        options={['AM', 'PM']}
                        style={{width: '100%', flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', width: '30%' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Maximum allowable late occurrences</label>
                    <input
                      type="text"
                      placeholder="Input 1"
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Maximum allowable absence occurrences</label>
                    <input
                      type="text"
                      placeholder="Input 2"
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: '5px', display: 'block' }}>Allowed late time
                      (minute)
                    </label>
                    
                    <input
                      type="text"
                      placeholder="Input 3"
                      style={{ marginTop: '24px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: 4, padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label style={{ fontSize: 24, fontWeight: 'bold', display: 'block' }}>Student List</label>
                <div>
                  <button
                    style={{
                      padding: '8px 16px',
                      marginRight: '10px',
                      backgroundColor: 'gray',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Upload Excel File
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Add New
                  </button>
                </div>
              </div>
              <Table tableHeader={tableHeaders} tableData={tableData} />
            </div>
          </div>
        )}
        {activeTab === 'Session' && <div>Content for Session tab</div>}
      </div>
    </div>
  );
};

export default TabComponent;