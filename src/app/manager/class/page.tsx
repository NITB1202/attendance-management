"use client";
import React, { useState, useEffect, useRef } from "react";
import Table from "../../../../component/Table";
import RoundedButton from "../../../../component/RoundedButton";
import SearchBar from "../../../../component/SearchBar";
import { Colors } from "../../../../constant/Colors";
import CustomDatePicker from "../../../../component/CustomDatePicker";
import CustomTimePicker from "../../../../component/CustomTimePicker";
import { Properties } from "csstype";
import { useRouter } from "next/navigation";
import { formatDate } from "../../../../util/util";
import classApi from "../../../../api/classApi";
import CustomSelect from "../../../../component/CustomSelect";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import userApi from "../../../../api/userApi";
import courseApi from "../../../../api/courseApi";
import { format } from "date-fns-tz";
import SmallInput from "../../../../component/SmallInput";
import { MdOutlineFileUpload } from "react-icons/md";
import ErrorMessage from "../../../../component/ErrorMessage";

const ClassManager = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [data, setData] = useState<any[][]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [cousrses, setCourses] = useState<any[][]>([]);
  const [teachers, setTeachers]  = useState<any[][]>([]);
  const [createRequest, setCreateRequest] = useState({
    name: "",
    beginDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    allowedLateTime: 3,
    teacherId: 0,
    courseId: 0,
  })
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File| null>(null);
  const [selectTeacherCode, setSelectTeacherCode] = useState("");
  const [showError, setShowError] = useState(false);
  const [message,setMessage] = useState({
    title: "",
    description: "",
  })
  const [update, setUpdate] = useState(false);

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
    const fetchData = async () => {
      try {
        const response = await classApi.getAll();
        const formattedData = 
        response.data.map((item: any)=>
            [
                item.id,
                item.name,
                item.course.name,
                formatDate(item.beginDate),
                formatDate(item.endDate),
                item.startTime,
                item.endTime,
                item.teacher.name
            ]
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

        setData(formattedData);
        setTeachers(formattedTeachers);
        setCourses(formattedCourses);
        setSelectTeacherCode(formattedTeachers.at(0).at(2));
        updateCreateFormField("teacherId", formattedTeachers.at(0).at(0));
        updateCreateFormField("courseId", formattedCourses.at(0).at(0));
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
}, [update]);

const tableHeader = [
    "CLASS NAME",
    "COURSE NAME",
    "START DATE",
    "END DATE",
    "START TIME",
    "END TIME",
    "TEACHER NAME",
];

const searchTerms = ["Class name", "Course name", "Teacher name"];
const router = useRouter();

const handleClickRow = (row: any[]) =>{
    const foundItem = data.find(item => {
        return item.slice(1).every((value, index) => value === row[index]);
    });
    if(foundItem){
        const id = foundItem.at(0);
        router.push(`/manager/detail?id=${id}`);
    }
}

const updateCreateFormField = (field: string, value: any) => {
  setCreateRequest(prevState => ({
      ...prevState,
      [field]: value
  }));
};

const handleSelectCourse = (index: number)=>{
  const selectCourse = cousrses.at(index);
  updateCreateFormField("courseId", selectCourse?.at(0));
}

const handleSelectTeacher = (index: number) =>{
  const selectTeacher = teachers.at(index);
  updateCreateFormField("teacherId", selectTeacher?.at(0));
  setSelectTeacherCode(selectTeacher?.at(2));
}

const handleCloseModal = () => {
  setModalVisible(false);
  setFile(null);
  setFileName("");
  setCreateRequest({
    name: "",
    beginDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    allowedLateTime: 3,
    teacherId: 1 ,
    courseId: 1,
  })
}

const handleUploadFile = ()=>{
  if (fileInputRef.current) {
    fileInputRef.current.click();
  }
}

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
};

const handleSave = async ()=>{
  if(Object.values(createRequest).some(value => value === ""))
  {
    setShowError(true);
    setMessage({
      title: "Error",
      description: "All fields must be filled."
    });
    return;
  }

  if(!isDateBeforeOrEqual(createRequest.beginDate, createRequest.endDate))
  {
    setShowError(true);
    setMessage({
      title: "Error",
      description: "Start date must be before or equal to end date."
    })
    return;
  }

  if(!isTimeBefore(createRequest.startTime, createRequest.endTime))
  {
    setShowError(true);
    setMessage({
      title: "Error",
      description: "Start time must be before end time."
    })
    return;
  }

  if(file === null)
  {
    setShowError(true);
    setMessage({
      title: "Error",
      description: "Please select an Excel file for the students."
    })
    return;
  }

  const info = JSON.stringify(createRequest, null, 2);

  try{
    setUpdate(true);
    const classResponse = await classApi.create(info, file);

    const firstStudentId = classResponse.data.students.at(0).id;
    const classroomId = classResponse.data.id;
    console.log(classroomId);
    await classApi.updateClassMonitor(classroomId, firstStudentId);

    const numberSessions = daysBetweenDates(createRequest.beginDate, createRequest.endDate);
    const sessionResponse = await classApi.addSession(numberSessions, classroomId);
    const sessionIds = sessionResponse.data.sessions.map((item:any)=>item.id);
    await classApi.assignRollCaller(firstStudentId, sessionIds);

    handleCloseModal();
  }
  catch(error){
    console.log(error);
  }
  finally{
    setUpdate(false);
  }
}

const justifyContent = screenWidth > 700? "flex-end": "flex-start";  

  return (
    <div style={screenWidth < 700 ? styles.containerMobile : styles.container}>
      <div style={{ padding: "20px 10px"}}>
            <div style={styles.headerContainer}>
                <SearchBar
                    placeholder="Type to search..."
                    style={styles.searchBar}
                    onSearch={setSearchData}
                />
                <CustomSelect
                    options={searchTerms}
                    onSelect={setSelectedIndex}>
                </CustomSelect>
            </div>
            <div style={{...styles.buttonContainer, justifyContent}}>
              <RoundedButton
                title="Add new"
                onClick={()=> setModalVisible(true)}
                icon={<FiPlusCircle size={24} color="white" />}
                style={{ backgroundColor: Colors.green, padding: "10px 30px" }}
                textStyle={{ fontSize: "20px", color: "white" }}
              />
            </div>
            <div>
                <Table 
                    tableHeader={tableHeader} 
                    tableData={data
                        .filter((item:any)=> {
                        if(searchData === "")
                            return true;

                        const formatSearch = searchData.toLocaleLowerCase().trim();
                        let checkData = "";

                        if(selectedIndex === 0){
                            checkData = item.at(1).toLocaleLowerCase();
                        }

                        if(selectedIndex === 1){
                            checkData = item.at(2).toLocaleLowerCase();
                        }

                        if(selectedIndex === 2){
                          checkData = item.at(7).toLocaleLowerCase();
                        }

                        return checkData.indexOf(formatSearch) !== -1;
                    })
                    .map((row) => row.slice(1))
                }
                    onRowClick={handleClickRow} />
            </div>
        </div>

      {modalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.form}>
            <button 
              style={styles.closeButton}
              onClick={handleCloseModal}
            >
              <IoMdClose size={35} />
            </button>
            <h1 style={styles.formHeader}>
              Create a new class
            </h1>
            <div style={styles.formContent}>
              <SmallInput
                title="Class name"
                placeHolder="Enter class name"
                style={{width: 500}}
                bold={false}
                onChangeText={(text) => updateCreateFormField("name",text)}>
              </SmallInput>
              <CustomSelect
                title="Course name"
                textStyle={{fontWeight: 500}}
                style={{width: 500}}
                options={cousrses.map(item => item.at(1))}
                onSelect={handleSelectCourse}>
              </CustomSelect>
              <div style={styles.row}>
                <CustomDatePicker
                    title="Start date"
                    bold={false}
                    setSelectedDate={(newValue: Date | null) => {
                        if(newValue) updateCreateFormField("beginDate", format(newValue,"yyyy-MM-dd"))
                    }}
                />
                <CustomDatePicker
                    title="End date"
                    bold={false}
                    setSelectedDate={(newValue: Date | null) =>
                    {
                      if(newValue) updateCreateFormField("endDate", format(newValue,"yyyy-MM-dd"))
                    }}
                  />
              </div>
              <div style={styles.row}>
                <CustomTimePicker
                    title="Start time"  
                    bold={false}
                    setSelectedTime={(newValue: Date | null) =>
                    {
                      if(newValue) updateCreateFormField("startTime", convertToTime(newValue))
                    }
                  }
                  />
                <CustomTimePicker
                    title="End time"
                    bold={false}
                    setSelectedTime={(newValue: Date | null) =>{
                      if(newValue) updateCreateFormField("endTime", convertToTime(newValue))
                    }
                  }
                  />
              </div>
              <div style={styles.row}>
                <CustomSelect
                  title="Teacher name"
                  textStyle={{fontWeight: 500}}
                  options={teachers.map(item => item.at(1))}
                  onSelect={handleSelectTeacher}>
                </CustomSelect>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  <div style={styles.titleInputContainer}>
                    <label style={styles.title}>Teacher code</label>
                    <div style={styles.inputContainer}>
                      <h1 style={styles.inputText}>{selectTeacherCode}</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div style={styles.row}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                  />
                  <SmallInput
                    title="Student list"
                    style={{width: 295}}
                    bold={false}
                    disable={true}
                    defaultValue={fileName}>
                  </SmallInput>
                  <RoundedButton
                    title="Upload Excel File"
                    onClick={handleUploadFile}
                    style={styles.uploadButton}
                    icon={<MdOutlineFileUpload size={24} color="white"/>}
                    textStyle={{ fontSize: 16, fontWeight: "bold" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ flex: 1, marginTop: 30 }}>
                <RoundedButton
                  title="CONFIRM"
                  onClick={handleSave}
                  style={{
                    width: "100%",
                    height: 46,
                    marginTop: "auto",
                  }}
                  textStyle={{ fontSize: 24, fontWeight: "bold" }}
                />
            </div>
          </div>
        </div>
      )}
      {
        showError &&
        <ErrorMessage
          title={message.title}
          description={message.description}
          setOpen={setShowError}>
        </ErrorMessage>
      }
    </div>
  );
};

function convertToTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
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

function daysBetweenDates(date1: string, date2: string) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  const timeDifference = Math.abs(d2.getTime() - d1.getTime());
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  return daysDifference;
}

const styles: { [key: string]: Properties<string | number> } = {
  container: {
    padding: "20px",
  },
  containerMobile: {
    padding: "10px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    minWidth: "500px",
  },
  dropdownMobile: {
    marginRight: "10px",
  },
  modalContent: {
    width: "90%",
    maxWidth: "500px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
  },
  modalContentMobile: {
    width: "90%",
    maxWidth: "300px",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
  },
  headerContainer:{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },
  searchBar:{
    display: "flex",
    maxWidth: 350,
  },
  buttonContainer:{
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  modalOverlay:{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form:{
    width: 540,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  closeButton:{
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 24,
    backgroundColor: "transparent",
    border: "none",
  },
  formHeader:{
    marginBottom: 15,
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  row:{
    flex: 1,
    display: "flex",
    gap: 20,
    alignItems: "flex-end"
  },
  uploadButton:{
    height: 46,
    marginTop: 34,
    width: "fit-content",
  },
  formContent:{
    display: "flex",
    flexDirection: "column",
    gap: 10,
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
    width: 325,
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
};

export default ClassManager;