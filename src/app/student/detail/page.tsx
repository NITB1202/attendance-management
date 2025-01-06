"use client";

import React, { useEffect, useState } from "react";
import Table from "../../../../component/Table";
import CommentBox from "../../../../component/CommentBox";
import TabSwitcher from "../../../../component/Tabs";
import IconButton from "../../../../component/IconButton";
import { IoIosMore } from "react-icons/io";
import classApi from "../../../../api/classApi";
import { useRouter, useSearchParams } from 'next/navigation';
import { extractDate, formatDate, getStatusName } from "../../../../util/util";
import attendanceApi from "../../../../api/attendanceApi";
import ReplyBox from "../../../../component/ReplyBox";
import { CiCirclePlus } from "react-icons/ci";
import { Colors } from "../../../../constant/Colors";
import questionApi from "../../../../api/questionApi";

const DetailStudent = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const searchParams = useSearchParams(); 
    const id = searchParams.get('id');
    const [openComment, setOpenComment] = useState(false);
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
    const [activeTab, setActiveTab] = useState('General');
    const studentTableHeaders = ['ORDER', 'STUDENT CODE', 'STUDENT NAME', 'ROLE', ''];
    const sessionTableHeaders = ['No', 'Date'];
    const attendanceTableHeaders = ['ORDER', 'STUDENT CODE', 'STUDENT NAME', 'ATTENDANCE STATUS'];
    const [sessionData, setSessionData] = useState<any[][]>([]);
    const [sessionId, setSessionId] = useState(0);
    const [attendances, setAttendances] = useState<any[][]>([]);
    const [rollCaller, setRollcaller] = useState({
        code: "",
        name: ""
    });
    const [questions, setQuestions] = useState<any[]>([]);
    const [update, setUpdate] = useState(false);
    const router = useRouter();

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
                    item.studentCode === monitorCode ? "CLASS MONITOR": "MEMBER"
                ]
            );

            const sessions = response.data.sessions;
            const formattedSession: string[][] =
            sessions.map((item: any) => {
                if(item.no === 1) {
                    setSessionId(item.id);
                    setRollcaller({
                        name: item.representative_id.name,
                        code: item.representative_id.studentCode,
                    });
                }
                return (
                    [
                        item.id,
                        item.representative_id.name,
                        item.representative_id.studentCode,
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
        if(sessionId === 0) return;
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

            const quesionResponse = await questionApi.getBySessionId(sessionId);
            setUpdate(false);

            setAttendances(formattedData);
            setQuestions(quesionResponse.data);
          }
          catch(error){
            console.log(error);
          }
        };
    
        fetchSession();
    }, [sessionId, update]);

    const handleSelectUser = (index: number, id: number) => {
        if(index === 0){
            const url = "/general/profile?id="+id;
            router.push(url);
        }
    }

    const selectSession = (row: any[])=>{
        const foundItem = sessionData.find(item => {
            return item.slice(3).every((value, index) => value === row[index]);
        });
        if(foundItem){
            setSessionId(foundItem.at(0));
            setRollcaller({
                name: foundItem.at(1),
                code: foundItem.at(2)
            });
        }
    }

    const viewButton = (id: number)=> {
        return(
            <IconButton
                id={id}
                icon={<IoIosMore  size={24}/>}
                options={options}
                onSelectWithId={handleSelectUser}>
            </IconButton>
        );
    }

    const sessionTableData = sessionData.map((row)=> row.slice(3)).sort((a,b)=> a[0]-b[0]);
    const attendanceTableData = attendances.map((row)=> row.slice(1));

    const tableDataWithButtons = students.map((row) => [
        ...row.slice(1),
        viewButton(row.at(0)),
    ]);

    const isMobile = screenWidth < 700;
    const flexDirection = isMobile ? "column" : "row";
    
    return (
        <div style={styles.container}>
            <div style={styles.tabContainer}>
                <TabSwitcher
                    tabs={["General", "Session"]}
                    onTabChange={setActiveTab}>
                </TabSwitcher>
            </div>
            <div style={{ marginTop: '20px' }}>
                {activeTab === 'General' && (
                    <div style={styles.generalPage}>
                        <div style={styles.classInfo}>
                            <label style={styles.header}>Class Information</label>
                            <div style={{ display: 'flex', flexDirection: flexDirection}}>
                                <div style={styles.textColumn}>
                                    <div style={styles.leftColumn}>
                                        <label style={styles.boldText}>Class Name:</label>
                                        <label style={styles.boldText}>Course Name:</label>
                                        <label style={styles.boldText}>Teacher Name:</label>
                                        <label style={styles.boldText}>Teacher Code:</label>
                                        <label style={styles.boldText}>Class monitor's name:</label>
                                        <label style={styles.boldText}>Class monitor's code:</label>
                                    </div>
                                    <div style={styles.leftColumn}>
                                        <label style={styles.normalText}>{classData.className}</label>
                                        <label style={styles.normalText}>{classData.courseName}</label>
                                        <label style={styles.normalText}>{classData.teacherName}</label>
                                        <label style={styles.normalText}>{classData.teacherCode}</label>
                                        <label style={styles.normalText}>{classData.monitorName}</label>
                                        <label style={styles.normalText}>{classData.monitorCode}</label>
                                    </div>
                                </div>
                                <div style={styles.textColumn}>
                                    <div style={styles.leftColumn}>
                                        <label style={styles.boldText}>Start Date:</label>
                                        <label style={styles.boldText}>End Date:</label>
                                        <label style={styles.boldText}>Start Time:</label>
                                        <label style={styles.boldText}>End Time:</label>
                                    </div>
                                    <div style={styles.leftColumn}>
                                        <label style={styles.normalText}>{classData.startDate}</label>
                                        <label style={styles.normalText}>{classData.endDate}</label>
                                        <label style={styles.normalText}>{classData.startTime}</label>
                                        <label style={styles.normalText}>{classData.endTime}</label>
                                    </div>
                                </div>
                                <div style={styles.textColumn}>
                                    <div style={styles.leftColumn}>
                                        <label style={styles.boldText}>Maximum allowable late occurrences:</label>
                                        <label style={styles.boldText}>Maximum allowable absence occurrences:</label>
                                    </div>
                                    <div style={styles.leftColumn}>
                                        <label style={styles.normalText}>{classData.maxLate}</label>
                                        <label style={{...styles.normalText, marginTop: isMobile? 35 : 0 }}>{classData.maxAb}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0px 10px' }}>
                            <label style={styles.header}>Student List</label>
                            <Table 
                                tableHeader={studentTableHeaders} 
                                tableData={tableDataWithButtons} />
                        </div>
                    </div>
                )}
                 {activeTab === 'Session' && (
                    <div style={styles.sessionPage}>
                        <div style={styles.sessionTableContainer}>
                            <Table 
                                tableHeader={sessionTableHeaders} 
                                tableData={sessionTableData}
                                onRowClick={selectSession} />
                        </div>
                        <div style={styles.sessionDetailsContainer}>
                            <div style={styles.rollCallerContainer}>
                                <div style={styles.smallColumn}>
                                    <p style={{ fontWeight: 700}}>Roll caller name:</p>
                                    <p style={{ fontWeight: 700}}>Student code:</p>
                                </div>
                                <div style={styles.smallColumn}>
                                    <p>{rollCaller.name}</p>
                                    <p>{rollCaller.code}</p>
                                </div>
                            </div>

                            <div style={styles.atttedanceTableContainer}>
                                <label style={styles.header}>Student attendance status</label>
                                <Table
                                    tableHeader={attendanceTableHeaders}
                                    tableData={attendanceTableData}
                                />
                            </div>

                                <div style={styles.dicussionContainer}>
                                    <label style={styles.header}>Discussion</label>
                                    <div style={styles.commentSection}>
                                        {
                                            questions.map((item)=>{
                                                return (
                                                    <CommentBox
                                                        key={item.id}
                                                        id= {item.id}
                                                        sessionId={sessionId}
                                                        user={item.user}
                                                        content={item.content}
                                                        timestamp={extractDate(item.askedTime)}
                                                        replies={item.replies}
                                                        setUpdate={() => setUpdate(true)}>
                                                    </CommentBox>
                                                );
                                            })
                                        }
                                    </div>
                                </div>

                                <div style={styles.addCommentContainer}>
                                    <button
                                        style={styles.addButton}
                                        onClick={() => setOpenComment(!openComment)}>
                                        <CiCirclePlus size={24} width={3}/>
                                        Add new
                                    </button>
                                    {
                                        openComment &&
                                        <ReplyBox
                                            sessionId={sessionId}
                                            onCancel={()=> setOpenComment(false)}
                                            onPost={()=>{
                                                setUpdate(true);
                                                setOpenComment(false);
                                            }}>
                                        </ReplyBox>
                                    }
                                </div>
                            </div>
                        </div>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container:{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100hw",
    },
    tabContainer:{ 
        display: 'flex', 
        padding: "10px", 
        marginTop: "20px"
    },
    boldText:{
        fontWeight: 'bold', 
        marginBottom: '10px', 
        display: 'block'
    },
    normalText:{ 
        marginBottom: '10px', 
        display: 'block' 
    },
    header:{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        display: 'block' 
    },
    textColumn:{ 
        padding: '10px', 
        display: 'flex', 
        flexDirection: 'row', 
        gap: 30
    },
    leftColumn:{ 
        padding: '10px',
        width: "fit-content",
        minWidth: 200,
    },
    generalPage:{ 
        display: 'flex', 
        width: '100%', 
        flexDirection: 'column'
    },
    classInfo:{ 
        display: "flex", 
        flexDirection: "column", 
        padding: '0px 10px'
    },
    sessionPage:{ 
        display: 'flex',
        width: "100%",
        height: "100%"
    },
    sessionTableContainer:{ 
        padding: '0px 10px' 
    },
    atttedanceTableContainer:{
        padding: '10px', 
        height: 400
    },
    sessionDetailsContainer:{
        padding: '10px',
        width: "100%"
    },
    rollCallerContainer:{ 
        display: 'flex', 
        flexDirection: 'row', 
        marginBottom: '10px', 
        gap: 50
    },
    smallColumn:{ 
        display: 'flex', 
        flexDirection: 'column',
        padding: "0px 10px"
    },
    dicussionContainer:{ 
        padding: '10px', 
        display: 'flex', 
        flexDirection: 'column',
        gap: 20,
    },
    commentSection:{ 
        display: "flex",
        flexDirection: "column",
        border: '1px solid #ccc', 
        borderRadius: 10,
        height: 500,
        padding: 20,
        minWidth: "fit-content",
        overflow: "auto",
        gap: 20,
    },
    addButton:{
        display: "flex",
        backgroundColor: Colors.green,
        border: 'none',
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: '6px',
        marginRight: '10px',
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    addCommentContainer:{ 
        display: 'flex', 
        alignItems: 'flex-start',
        justifyContent: "flex-start",
        marginTop: 20,
        paddingLeft: 10,
        height: 200,
    }
}


export default DetailStudent;