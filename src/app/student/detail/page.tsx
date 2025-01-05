"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../../../../component/Dropdown";
import Table from "../../../../component/Table";
import CommentBox from "../../../../component/CommentBox";
import ReplyBox from "../../../../component/ReplyBox";
import TabSwitcher from "../../../../component/Tabs";
import IconButton from "../../../../component/IconButton";
import { IoIosMore } from "react-icons/io";
import classApi from "../../../../api/classApi";
import { useSearchParams } from 'next/navigation';
import { extractDate, formatDate, getStatusName } from "../../../../util/util";
import attendanceApi from "../../../../api/attendanceApi";

const DetailStudent = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const searchParams = useSearchParams(); 
    const id = searchParams.get('id');

    const options = ["View profile"];
    const [classData, setClassData] = useState({
        className: "",
        courseName: "",
        teacherName: "",
        teacherCode: "",
        monitorName: "",
        monitorCode: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        maxLate: 0,
        maxAb: 0,
    })

    const [students, setStudents] = useState<any[][]>([]);

    const handleToggle = () => {
        setIsAnonymous(!isAnonymous);
        console.log('Anonymous toggled:', !isAnonymous);
    };

    const [activeTab, setActiveTab] = useState('General');
    const studentTableHeaders = ['ORDER', 'STUDENT CODE', 'STUDENT NAME', 'ROLE', ''];
    const sessionTableHeaders = ['No', 'Date'];
    const [sessionData, setSessionData] = useState<any[][]>([]);
    const [sessionId, setSessionId] = useState(0);
    const [attendances, setAttendances] = useState<any[][]>([]);

    useEffect(() => {
        const fetchData = async () => {
        if(!id)
        {
            console.log("Can't find id");
            return;
        } 
          try {
            const response = await classApi.getById(Number(id));
            const classInfo = response.data;
            const info ={
                className: classInfo.name,
                courseName: classInfo.course.name,
                teacherName: classInfo.teacher.name,
                teacherCode: classInfo.teacher.teacherCode,
                monitorName: classInfo.classMonitor.name,
                monitorCode: classInfo.classMonitor.studentCode,
                startDate: formatDate(classInfo.beginDate),
                endDate: formatDate(classInfo.endDate),
                startTime: classInfo.startTime,
                endTime: classInfo.endTime,
                maxLate: classInfo.allowedLateTime,
                maxAb: classInfo.allowedAbsent,
            }

            const students = response.data.students;
            const monitorCode = info.monitorCode;

            const formattedData: string[][] = 
            students.map((item: any, index: number)=>
                [
                    item.id,
                    index + 1,
                    item.studentCode,
                    item.name,
                    item.studentCode === monitorCode ? "MEMBER": "CLASS MONITOR"
                ]
            );

            const sessions = response.data.sessions;
            const formattedSession: string[][] =
            sessions.map((item: any) => {
                if(item.no === 1) setSessionId(item.id);

                return (
                    [
                        item.id,
                        item.no,
                        extractDate(item.startTime)
                    ]
                );
            }
            ); 

            setClassData(info);
            setStudents(formattedData);
            setSessionData(formattedSession);

          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
    }, []);

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

    useEffect(() => {
        const fetchSession = async () => {
          try{
            const response = await attendanceApi.getById(sessionId);
            const formattedData: string[][] = response.data.map((item:any, index: number)=>
            [
                item.student.id,
                index + 1,
                item.student.studentCode,
                item.student.name,
                getStatusName(item.status)
            ]);

            setAttendances(formattedData);
          }
          catch(error){
            console.log(error);
          }
        };
    
        fetchSession();
    }, [sessionId]);

    const handleSelectUser = (index: number) => {
        // go to profile 
    }

    const selectSession = (row: any[])=>{
        const foundItem = sessionData.find(item => {
            return item.slice(1).every((value, index) => value === row[index]);
        });
        if(foundItem)
            setSessionId(foundItem.at(0));
    }

    const viewButton = (id: number)=> {
        return(
            <IconButton
                id={id}
                icon={<IoIosMore  size={24}/>}
                options={options}
                onSelectOption={handleSelectUser}>
            </IconButton>
        );
    }

    const studentTableData = students.map((row)=> row.slice(1));
    const sessionTableData = sessionData.map((row)=> row.slice(1)).sort((a,b)=> a[0]-b[0]);
    const attendanceTableData = attendances.map((row)=> row.slice(1));

    const tableDataWithButtons = studentTableData.map((row, index) => [
        ...row,
        viewButton(index),
    ]);

    const flexDirection = screenWidth < 700 ? "column" : "row";;
    
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
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Class monitor's code:</label>
                                    </div>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.className}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.courseName}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.teacherName}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.teacherCode}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.monitorName}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.monitorCode}</label>
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
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.startDate}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.endDate}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.startTime}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.endTime}</label>
                                    </div>
                                </div>
                                <div style={{ flex: 2, padding: '10px', display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Maximum allowable late occurrences:</label>
                                        <label style={{ fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Maximum allowable absence occurrences:</label>
                                    </div>
                                    <div style={{ flex: 1, padding: '10px' }}>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.maxLate}</label>
                                        <label style={{ marginBottom: '10px', display: 'block' }}>{classData.maxAb}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 4, padding: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <label style={{ fontSize: 24, fontWeight: 'bold', display: 'block' }}>Student List</label>
                            </div>
                            <Table 
                                tableHeader={studentTableHeaders} 
                                tableData={tableDataWithButtons} />
                        </div>
                    </div>
                )}

                {activeTab === 'Session' && (
                    <div style={{ display: 'flex', width: '100%', height: '600px' }}>
                        <div style={{ flex: 1, padding: '0px 10px' }}>
                            <Table 
                                tableHeader={sessionTableHeaders} 
                                tableData={sessionTableData}
                                onRowClick={selectSession} />
                        </div>
                        <div style={{ flex: 6, padding: '10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', gap: 50 }}>
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                    <p style={{ fontWeight: 700}}>Roll caller name:</p>
                                    <p style={{ fontWeight: 700}}>Student code:</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                    <p>Jack Tarco</p>
                                    <p>22527812</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '10px' }}>
                                <div style={{ flex: 4, marginBottom: '10px' }}>
                                    <label style={{ fontSize: 20, fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Student Attendance Status</label>
                                    <Table
                                        tableHeader={['ORDER', 'STUDENT CODE', 'STUDENT NAME', 'ATTENDANCE STATUS']}
                                        tableData={attendanceTableData}
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
                                            onReply={() => console.log('Reply clicked')} className={""}                                        />
                                        <div style={{ marginLeft: '20px' }}>
                                            <ReplyBox
                                                avatar="path/to/avatar.jpg"
                                                name="John Doe"
                                                content="This is a reply."
                                                timestamp="2023-01-01"
                                                onPost={() => console.log('Post clicked')}
                                                onCancel={() => console.log('Cancel clicked')} className={""}                                            />
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