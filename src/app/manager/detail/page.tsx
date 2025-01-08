"use client";

import React, { useState, useEffect } from "react";
import Table from "../../../../component/Table";
import CommentBox from "../../../../component/CommentBox";
import { Colors } from "../../../../constant/Colors";
import { extractDate, getStatusName } from "../../../../util/util";
import TabSwitcher from "../../../../component/Tabs";
import IconButton from "../../../../component/IconButton";
import { IoIosMore } from "react-icons/io";
import questionApi from "../../../../api/questionApi";
import attendanceApi from "../../../../api/attendanceApi";
import classApi from "../../../../api/classApi";
import { useRouter, useSearchParams } from 'next/navigation';
import SmallInput from "../../../../component/SmallInput";
import CustomSelect from "../../../../component/CustomSelect";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import CustomTimePicker from "../../../../component/CustomTimePicker";
import RoundedButton from "../../../../component/RoundedButton";
import { FaRegEdit } from "react-icons/fa";
import QuestionMessage from "../../../../component/QuestionMessage";
import SuccessfulMessage from "../../../../component/SuccessfulMesage";
import ErrorMessage from "../../../../component/ErrorMessage";
import { FiPlusCircle } from "react-icons/fi";
import userApi from "../../../../api/userApi";
import courseApi from "../../../../api/courseApi";
import { format } from "date-fns-tz";

const DetailManager = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const searchParams = useSearchParams(); 
  const id = searchParams.get('id');
  const options = ["Remove", "Profile"];
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
      maxLate: -1,
      maxAb: -1,
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
  const [monitor, setMonitor] = useState({
      id: 0,
      name: "",
      code: "",
  });
  const [teachers, setTeachers] = useState<any[][]> ([]);
  const [courses, setCourses] = useState<any[][]> ([]);
  const [teacherCode, setTeacherCode] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({
      type: "",
      title: "",
      description: "",
  })

  const [allStudent, setAllStudent] = useState<any[][]>([]);
  const [selectStudent, setSelectStudent] = useState({
    id: 1,
    code: "",
  })
  const [updateRequest, setUpdateRequest] = useState({
      name: "",
      beginDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      allowedLateTime: 0,
      teacherId: 0,
      courseId: 0
  })
  const [openModal, setOpenModal] = useState(false);
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
              startDate: classInfo.beginDate,
              endDate: classInfo.endDate,
              startTime: classInfo.startTime,
              endTime: classInfo.endTime,
              maxLate: classInfo.allowedLateTime,
              maxAb: classInfo.allowedAbsent,
          }

          const request = {
              name: info.className,
              beginDate: info.startDate,
              endDate: info.endDate,
              startTime: info.startTime,
              endTime: info.endTime,
              allowedLateTime: info.maxLate,
              teacherId: classInfo.teacher.id,
              courseId: classInfo.course.id,
          }

          const students = response.data.students;
          const monitorCode = info.monitorCode;
          const formattedData: string[][] = sortStudents(students, monitorCode, setMonitor);

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

          const teacherResponse = await userApi.getTeachers();
          const formattedTeachers = teacherResponse.data.map((item: any)=>
            [
              item.id,
              item.name,
              item.teacherCode
            ]
          );
  
          const courseResponse = await courseApi.getAll();
          const formattedCourses = courseResponse.data.map((item: any)=>
            [
              item.id,
              item.name,
            ]
          );

          const allStudentResponse = await userApi.getStudents();
          const formattedAllStudent = allStudentResponse.data.map((item: any)=>[
            item.id,
            item.name,
            item.studentCode,
          ]);

          setClassData(info);
          setStudents(formattedData);
          setSessionData(formattedSession);
          setUpdateRequest(request);
          setTeachers(formattedTeachers);
          setCourses(formattedCourses);
          setTeacherCode(info.teacherCode);
          setAllStudent(formattedAllStudent);
          setSelectStudent({
            id: formattedAllStudent.at(0).at(0),
            code: formattedAllStudent.at(0).at(2),
          })
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
  }, [update]);

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
          const formattedData: string[][] = response.data.map((item: any, index: number) => {
              if (index === 0) {
                  setRollcaller({
                      code: item.session.representative_id.studentCode,
                      name: item.session.representative_id.name,
                  });
              }
              
              return [
                  item.student.id,
                  (index + 1).toString(),
                  item.student.studentCode,
                  item.student.name,
                  getStatusName(item.status)
              ];
          });

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
  }, [sessionId]);

  const handleSelectUser = async (index: number, userId: number) => {
      if(index === 1){
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

  const handleConfirm = async ()=>{
    const formatRequest = {
      name: updateRequest.name,
      beginDate: updateRequest.beginDate,
      endDate: updateRequest.endDate,
      startTime: updateRequest.startTime.slice(0, 5),
      endTime: updateRequest.endTime.slice(0, 5),
      allowedLateTime: updateRequest.allowedLateTime,
      teacherId: updateRequest.teacherId,
      courseId: updateRequest.courseId,
    }

    if(Object.values(formatRequest).some(value => value === ""))
      {
        setShowMessage(true);
        setMessage({
          type: "error",
          title: "Error",
          description: "All fields must be filled."
        });
        return;
      }
    
      if(!isDateBeforeOrEqual(formatRequest.beginDate, formatRequest.endDate))
      {
        setShowMessage(true);
        setMessage({
          type: "error",
          title: "Error",
          description: "Start date must be before or equal to end date."
        })
        return;
      }
    
      if(!isTimeBefore(formatRequest.startTime, formatRequest.endTime))
      {
        setShowMessage(true);
        setMessage({
          type: "error",
          title: "Error",
          description: "Start time must be before end time."
        })
        return;
      }
    
      console.log(formatRequest);
      
      try{
          await classApi.updateClassMonitor(id, monitor.id);
          await classApi.update(id, formatRequest);
          setShowMessage(true);
          setMessage({
          type: "success",
          title: "Success",
          description: "The classroom's information has been updated.",
          })
      }
      catch(error){
          console.log(error);
      }
  }

  const updateField = (field: string, value: any) => {
      setUpdateRequest(prevState => ({
          ...prevState,
          [field]: value
      }));
  };

  const viewButton = (id: number)=> {
      return(
          <IconButton
              id={id}
              icon={<IoIosMore size={24}/>}
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

  const handleSelectCourse= (index: number) =>{
    const selectCourse = courses.at(index);
    updateField("courseId",selectCourse?.at(0));
  }

  const handleSelectTeacher = (index: number)=>{
    const selectTeacher = teachers.at(index);
    updateField("teacherId",selectTeacher?.at(0));
    setTeacherCode(selectTeacher?.at(2));
  }

  const handleSelectAddStudent = (index: number)=>{
    const selected = allStudent.at(index);
    setSelectStudent({
      id: selected?.at(0),
      code: selected?.at(2),
    })
  }

  const handleAddStudent = async ()=>{
    console.log(selectStudent);
    try{
      setUpdate(true);
      await classApi.addStudent(id,selectStudent.id);
      setOpenModal(false);
    }
    catch(error)
    {
      setShowMessage(true);
      setMessage({
        type: "error",
        title: "Error",
        description: "This student is already in this class"
      });
    }
    finally{
      setUpdate(false);
    }
  }

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
                          
                          <div style={styles.row}>
                              <SmallInput
                                  title="Class name"
                                  defaultValue={classData.className}>
                              </SmallInput>
                              <CustomSelect
                                title="Course name"
                                options={courses.map(item => item.at(1))}
                                onSelect={handleSelectCourse}>
                              </CustomSelect>
                          </div>

                          <div style={{...styles.row, flexDirection: flexDirection}}> 
                              <div style={styles.row}>
                                  <CustomSelect
                                    title="Teacher name"
                                    options={teachers.map(item => item.at(1))}
                                    onSelect={handleSelectTeacher}>

                                  </CustomSelect>
                                  <SmallInput
                                      title="Teacher code"
                                      defaultValue={teacherCode}
                                      disable={true}>
                                  </SmallInput>
                              </div>

                              <div style={styles.row}>
                                  <SmallInput
                                    title="Class monitor's name"
                                    defaultValue={classData.monitorName}
                                    disable={true}>
                                  </SmallInput>
                                  <SmallInput
                                      title="Class monitor's code"
                                      defaultValue={classData.monitorCode}
                                      disable={true}>
                                  </SmallInput>
                              </div>
                          </div>


                          <div style={{...styles.row, flexDirection: flexDirection}}> 
                              <div style={styles.row}>
                                  <CustomDatePicker
                                      title="Start date"
                                      defaultValue={updateRequest.beginDate}
                                      setSelectedDate={(date)=>{
                                        if(date) updateField("beginDate",format(date, "yyyy-MM-dd"))
                                      }}>
                                  </CustomDatePicker>
                                  <CustomDatePicker
                                      title="End date"
                                      defaultValue={updateRequest.endDate}
                                      setSelectedDate={(date)=>{
                                        if(date) updateField("endDate",format(date, "yyyy-MM-dd"))
                                      }}>
                                  </CustomDatePicker>
                              </div>

                              <div style={styles.row}>
                                  <CustomTimePicker
                                      title="Start time"
                                      defaultValue={updateRequest.startTime}
                                      setSelectedTime={(date)=>{
                                        if(date) updateField("startTime", convertToTime(date))
                                      }}>
                                  </CustomTimePicker>
                                  <CustomTimePicker
                                      title="End time"
                                      defaultValue={updateRequest.endTime}
                                      setSelectedTime={(date)=>{
                                        if(date) updateField("endTime", convertToTime(date))
                                      }}>
                                  </CustomTimePicker> 
                              </div>
                          </div>

                          {
                              classData.maxAb > -1 &&
                              <div style={styles.row}>
                                  <SmallInput
                                      title="Maximum allowable late occurences"
                                      defaultValue={classData.maxLate.toString()}
                                      onChangeText={(text)=> updateField("allowedLateTime", Number(text)? Number(text): -1)}
                                      disable={true}>
                                  </SmallInput>
                                  <SmallInput
                                      title="Maximum allowable absence occurences"
                                      defaultValue={classData.maxAb !== null? classData.maxAb.toString() : "3"}
                                      disable={true}>
                                  </SmallInput>
                              </div>
                          }
                      </div>
                      <div style={styles.buttonContainer}>
                          <RoundedButton
                              title="SAVE CHANGES"
                              style={styles.saveButton}
                              textStyle={styles.buttonText}
                              icon={<FaRegEdit size={24} color="white" />}
                              onClick={()=> {
                                  setShowMessage(true);
                                  setMessage({
                                      type: "question",
                                      title: "Confirmation",
                                      description: "Are you sure you want to update class's information?"
                                  })
                              }}>
                          </RoundedButton>
                          <RoundedButton
                            title="ADD STUDENT"
                            style={styles.addStudentButton}
                            textStyle={styles.buttonText}
                            icon={<FiPlusCircle size={24} color="white" />}
                            onClick={()=>setOpenModal(true)}>
                          </RoundedButton>
                      </div>
                      <div style={{ padding: 10 }}>
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
                              <div style={{ display: "flex", gap: 30}}>
                                  <div style={styles.smallColumn}>
                                      <p style={{ fontSize: 20,fontWeight: 700}}>Roll caller name:</p>
                                      <p style={{ fontSize: 20, fontWeight: 700}}>Student code:</p>
                                  </div>
                                  <div style={styles.smallColumn}>
                                      <p style={{fontSize: 20}}>{rollCaller.name}</p>
                                      <p style={{fontSize: 20}}>{rollCaller.code}</p>
                                  </div>
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
                                                      disableReply={true}
                                                      setUpdate={() => setUpdate(true)}>
                                                  </CommentBox>
                                              );
                                          })
                                      }
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
                  {
                    openModal &&
                    <div style={styles.shadow}>
                        <div style={styles.messageContainer}>
                          <button style={styles.closeButton} onClick={() => setOpenModal(false)}>
                            <img src="/icon/close.png" alt="Close" />
                          </button>
                          <h1 style={styles.formHeader}>Select a student</h1>
                          <div style={styles.body}>
                            <CustomSelect
                              title="Student name"
                              options={allStudent.map(item => item.at(1))}
                              style={{ width: 350}}
                              textStyle={{fontWeight: 500}}
                              onSelect={handleSelectAddStudent}>
                            </CustomSelect>
                            <div style={styles.titleInputContainer}>
                              <label style={styles.title}>Student code</label>
                              <div style={styles.inputContainer}>
                                <h1 style={styles.inputText}>{selectStudent.code}</h1>
                              </div>
                            </div>
                          </div>
                          <RoundedButton
                            textStyle={styles.buttonText}
                            style={styles.addConfirmButton}
                            title="CONFIRM"
                            onClick={handleAddStudent}>
                          </RoundedButton>
                        </div>
                    </div>
                  }
                  {
                      showMessage && message.type === "question" &&
                      <QuestionMessage
                          title={message.title}
                          description={message.description}
                          setOpen={setShowMessage}
                          onAgree={handleConfirm}>
                      </QuestionMessage>
                  }
                  {
                      showMessage && message.type === "success" &&
                      <SuccessfulMessage
                          title={message.title}
                          description={message.description}
                          setOpen={setShowMessage}>
                      </SuccessfulMessage>
                  }
                  {
                      showMessage && message.type === "error" &&
                      <ErrorMessage
                          title={message.title}
                          description={message.description}
                          setOpen={setShowMessage}>
                      </ErrorMessage>
                  }
          </div>
      </div>
  );
};

function convertToTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function sortStudents(students: any, monitorCode: number, setMonitor: any){
  const result = students.map((item: any) => {
      const isMonitor = item.studentCode === monitorCode;
      
      if (isMonitor) {
          setMonitor({
              id: item.id,
              name: item.name,
              code: item.studentCode,
          });
      }

      return {
          id: item.id,
          studentCode: item.studentCode,
          name: item.name,
          role: isMonitor ? "CLASS MONITOR" : "MEMBER"
      };
  });

  const sortedStudents = result.sort((a: any, b: any) => {
      if (a.role === "CLASS MONITOR" && b.role !== "CLASS MONITOR") {
          return -1;
      } else if (a.role !== "CLASS MONITOR" && b.role === "CLASS MONITOR") {
          return 1;
      } else {
          return a.name.localeCompare(b.name);
      }
  });

  const finalResult = sortedStudents.map((item: any, index: number) => [
      item.id,
      index + 1,
      item.studentCode,
      item.name,
      item.role
  ]);

  return finalResult;
}

function isDateBeforeOrEqual(dateA: string, dateB: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateA) || !/^\d{4}-\d{2}-\d{2}$/.test(dateB)) {
    throw new Error('Input must be in yyyy-mm-dd format');
  }

  const dateObjectA = new Date(dateA);
  const dateObjectB = new Date(dateB);

  return dateObjectA <= dateObjectB;
}

function isTimeBefore(timeA: string, timeB: string) {
  if (!/^\d{2}:\d{2}$/.test(timeA) || !/^\d{2}:\d{2}$/.test(timeB)) {
    throw new Error('Input must be in hh:mm format');
  }

  const [hoursA, minutesA] = timeA.split(':').map(Number);
  const [hoursB, minutesB] = timeB.split(':').map(Number);

  const totalMinutesA = hoursA * 60 + minutesA;
  const totalMinutesB = hoursB * 60 + minutesB;

  return totalMinutesA < totalMinutesB;
}


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
      padding: '0px 10px',
      gap: 30,
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
      width: "100%", 
      flexDirection: 'row', 
      marginBottom: '10px', 
      gap: 30,
      alignItems: "flex-end",
      padding: "0px 10px",
      justifyContent: "space-between",
  },
  smallColumn:{ 
      display: 'flex', 
      flexDirection: 'column',
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
  addCommentContainer:{ 
      display: 'flex', 
      alignItems: 'flex-start',
      justifyContent: "flex-start",
      marginTop: 20,
      paddingLeft: 10,
      height: 200,
  },
  row:{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 40,
  },
  saveButton:{
      padding: "10px 30px",
      height: "fit-content",
      background: Colors.green,
  },
  buttonContainer:{
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: 10,
      marginTop: 20,
      gap: 20,
  },
  buttonText:{
      fontSize: 18,
  },
  input:{
      background: Colors.red,
  },
  addStudentButton:{
    padding: "10px 30px",
    height: "fit-content",
  },
  shadow: {
    position: "fixed",
    top: 0,
    left: 0,
    width: '100vw',
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  messageContainer: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
    padding: "10px",
    width: "375px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-end",
  },
  formHeader:{
    width: "100%",
    textAlign: "left",
    fontSize: 26,
    fontWeight: 600,
  },
  addConfirmButton:{
    width: "100%",
    backgroundColor: Colors.green,
  },
  body:{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 20,
  },
  title:{
    fontFamily: "Roboto, sans-serif",
    fontSize: 20,
  },
  inputContainer: {
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: Colors.gray,
    height: 44,
    width: 345,
    background: Colors.disable,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px",
  },
  inputText:{
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
  },
  titleInputContainer:{
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
}

export default DetailManager;
